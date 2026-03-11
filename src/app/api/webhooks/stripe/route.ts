import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminFirestore, getAdminAuth } from '@/lib/firebaseAdmin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import type Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const MEMBERSHIP_TYPE_MAP: Record<string, string> = {
  pionier: 'single',
  botschafter: 'partner',
  patron: 'patron',
};

const MEMBERSHIP_PRICES: Record<string, number> = {
  pionier: 6000,
  botschafter: 9000,
  patron: 35000,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('[Stripe Webhook] Signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment failed: ${pi.id}`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const customerEmail = session.customer_email || metadata.customer_email;
  const customerName = metadata.customer_name || '';
  const membershipType = metadata.membership_type || 'pionier';
  const jassname = metadata.jassname || '';

  if (!customerEmail) {
    console.error('[Stripe Webhook] No customer email in session:', session.id);
    return;
  }

  console.log('[Stripe Webhook] Processing checkout:', {
    email: customerEmail,
    name: customerName,
    membership: membershipType,
    amount: session.amount_total,
  });

  const db = getAdminFirestore();
  const adminAuth = getAdminAuth();

  // 1. Firebase Auth User finden oder erstellen
  let uid: string;
  let isNewUser = false;

  try {
    const userRecord = await adminAuth.getUserByEmail(customerEmail);
    uid = userRecord.uid;
    console.log(`[Stripe Webhook] Existing user found: ${uid}`);
  } catch {
    const nameParts = customerName.split(' ');
    const displayName = jassname || customerName || customerEmail.split('@')[0];

    const newUser = await adminAuth.createUser({
      email: customerEmail,
      emailVerified: true,
      displayName,
    });
    uid = newUser.uid;
    isNewUser = true;
    console.log(`[Stripe Webhook] New user created: ${uid}`);

    await db.collection('users').doc(uid).set({
      displayName,
      email: customerEmail,
      createdAt: FieldValue.serverTimestamp(),
      lastLogin: FieldValue.serverTimestamp(),
      lastUpdated: FieldValue.serverTimestamp(),
    });
  }

  // 2. JVS Member erstellen oder aktualisieren
  const now = Timestamp.now();
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const validUntil = Timestamp.fromDate(nextYear);

  const existingMemberQuery = await db
    .collection('jvs_members')
    .where('uid', '==', uid)
    .limit(1)
    .get();

  let memberId: string;

  if (!existingMemberQuery.empty) {
    memberId = existingMemberQuery.docs[0].id;
    await db.collection('jvs_members').doc(memberId).update({
      status: 'active',
      membershipType: MEMBERSHIP_TYPE_MAP[membershipType] || membershipType,
      validUntil,
      updatedAt: FieldValue.serverTimestamp(),
    });
    console.log(`[Stripe Webhook] Existing member reactivated: ${memberId}`);
  } else {
    const nameParts = customerName.split(' ');
    memberId = db.collection('jvs_members').doc().id;

    await db
      .collection('jvs_members')
      .doc(memberId)
      .set({
        id: memberId,
        uid,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: customerEmail,
        jassname: jassname || null,
        membershipType: MEMBERSHIP_TYPE_MAP[membershipType] || membershipType,
        memberSince: now,
        validUntil,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });
    console.log(`[Stripe Webhook] New member created: ${memberId}`);
  }

  // 3. Subscription-Eintrag erstellen
  const subscriptionId = db.collection('jvs_subscriptions').doc().id;
  await db
    .collection('jvs_subscriptions')
    .doc(subscriptionId)
    .set({
      id: subscriptionId,
      memberId,
      provider: 'stripe',
      status: 'active',
      stripeSessionId: session.id,
      stripeCustomerId: session.customer || null,
      stripePaymentIntentId: session.payment_intent || null,
      currentPeriodStart: now,
      currentPeriodEnd: validUntil,
      amount: session.amount_total || MEMBERSHIP_PRICES[membershipType] || 0,
      currency: 'CHF',
      createdAt: now,
      updatedAt: now,
    });

  // 4. Player-Linking (automatisch falls Jasstafel-Player existiert)
  const playerQuery = await db
    .collection('players')
    .where('userId', '==', uid)
    .limit(1)
    .get();

  if (!playerQuery.empty) {
    const playerId = playerQuery.docs[0].id;
    await db.collection('jvs_members').doc(memberId).update({
      playerId,
      updatedAt: FieldValue.serverTimestamp(),
    });
    console.log(`[Stripe Webhook] Linked member ${memberId} to player ${playerId}`);
  }

  // 5. Password-Reset-Link senden für neue User
  if (isNewUser) {
    try {
      const resetLink = await adminAuth.generatePasswordResetLink(customerEmail);
      console.log(`[Stripe Webhook] Password reset link generated for ${customerEmail}`);

      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Jassverband Schweiz <noreply@jassverband.ch>',
          to: customerEmail,
          subject: 'Willkommen beim Jassverband Schweiz!',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #000;">Willkommen beim Jassverband Schweiz!</h1>
              <p>Hallo ${customerName || 'Jasser'},</p>
              <p>Deine Mitgliedschaft wurde erfolgreich aktiviert. Du bist jetzt offizieller Verbandsjasser!</p>
              <p>Um dein Konto auf <a href="https://jasstafel.app">jasstafel.app</a> zu nutzen, setze bitte dein Passwort:</p>
              <p style="text-align: center; margin: 32px 0;">
                <a href="${resetLink}" 
                   style="background-color: #ff0000; color: #fff; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold;">
                  Passwort setzen
                </a>
              </p>
              <p style="color: #6b6b6b; font-size: 14px;">
                Bei Fragen erreichst du uns unter <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">Jassverband Schweiz | Hirslanderstrasse 34, 8032 Zürich</p>
            </div>
          `,
        });
        console.log(`[Stripe Webhook] Welcome email sent to ${customerEmail}`);
      }
    } catch (emailError) {
      console.error('[Stripe Webhook] Email sending failed (non-critical):', emailError);
    }
  }

  console.log(`[Stripe Webhook] Checkout processing complete for ${customerEmail}`);
}
