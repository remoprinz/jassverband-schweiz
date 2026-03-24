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
  jugend: 'jugend',
  goenner: 'goenner',
};

const MEMBERSHIP_PRICES: Record<string, number> = {
  pionier: 6000,
  botschafter: 9000,
  patron: 35000,
  jugend: 2000,
  goenner: 5000,
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
        // Bei TWINT: nur verarbeiten wenn Zahlung wirklich abgeschlossen
        if (session.payment_status === 'paid') {
          await handleCheckoutCompleted(session);
        } else {
          console.log(`[Stripe Webhook] Session completed but payment_status=${session.payment_status}, waiting for async confirmation`);
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        // TWINT: Zahlung asynchron bestätigt → Member aktivieren
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Stripe Webhook] Async payment succeeded: ${session.id}`);
        await handleCheckoutCompleted(session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        // TWINT: Zahlung asynchron fehlgeschlagen
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Stripe Webhook] Async payment failed: ${session.id}, email: ${session.customer_email}`);
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
  const firstName = metadata.customer_firstName || '';
  const lastName = metadata.customer_lastName || '';
  const membershipType = metadata.membership_type || 'pionier';
  const jassname = metadata.jassname || '';
  const fullName = `${firstName} ${lastName}`.trim();

  if (!customerEmail) {
    console.error('[Stripe Webhook] No customer email in session:', session.id);
    return;
  }

  console.log('[Stripe Webhook] Processing checkout:', {
    email: customerEmail,
    firstName,
    lastName,
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
    const displayName = jassname || fullName || customerEmail.split('@')[0];

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
    memberId = db.collection('jvs_members').doc().id;

    // Mitgliedsnummer atomisch vergeben
    const counterRef = db.collection('jvs_counters').doc('members');
    let memberNumber = 1;
    await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      if (counterDoc.exists) {
        memberNumber = (counterDoc.data()?.nextNumber || 1);
        transaction.update(counterRef, { nextNumber: memberNumber + 1 });
      } else {
        memberNumber = 1;
        transaction.set(counterRef, { nextNumber: 2 });
      }
    });

    await db
      .collection('jvs_members')
      .doc(memberId)
      .set({
        id: memberId,
        uid,
        firstName,
        lastName,
        email: customerEmail,
        jassname: jassname || null,
        membershipType: MEMBERSHIP_TYPE_MAP[membershipType] || membershipType,
        memberNumber,
        season: 1,
        memberSince: now,
        validUntil,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });
    console.log(`[Stripe Webhook] New member #${memberNumber} created: ${memberId}`);
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

  // 5. E-Mail senden
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      const greeting = firstName || 'Jasser';

      if (isNewUser) {
        // Neuer User: Welcome + Passwort-Setup
        const resetLink = await adminAuth.generatePasswordResetLink(customerEmail);
        console.log(`[Stripe Webhook] Password reset link generated for ${customerEmail}`);

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Jassverband Schweiz <noreply@jassverband.ch>',
          to: customerEmail,
          subject: 'Willkommen beim Jassverband Schweiz!',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #000;">Willkommen beim Jassverband Schweiz!</h1>
              <p>Hallo ${greeting},</p>
              <p>Deine Mitgliedschaft wurde erfolgreich aktiviert. Du bist jetzt offizielles Mitglied des Jassverbands Schweiz!</p>
              <p>Um JassGuru Pro zu nutzen, setze bitte dein Passwort:</p>
              <p style="text-align: center; margin: 32px 0;">
                <a href="${resetLink}"
                   style="background-color: #ff0000; color: #fff; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold;">
                  Passwort setzen
                </a>
              </p>
              <p>Danach kannst du dich auf <a href="https://jassguru.ch">jassguru.ch</a> einloggen und deine eigene Jassgruppe erstellen.</p>
              <p style="color: #6b6b6b; font-size: 14px;">
                Bei Fragen erreichst du uns unter <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">Jassverband Schweiz | jassverband.ch</p>
            </div>
          `,
        });
        console.log(`[Stripe Webhook] Welcome email sent to ${customerEmail}`);
      } else {
        // Bestehender User: Info-Email (kein Passwort-Reset)
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Jassverband Schweiz <noreply@jassverband.ch>',
          to: customerEmail,
          subject: 'Deine JVS-Mitgliedschaft ist aktiv!',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #000;">Deine Mitgliedschaft ist aktiv!</h1>
              <p>Hallo ${greeting},</p>
              <p>Deine Mitgliedschaft beim Jassverband Schweiz wurde erfolgreich aktiviert.</p>
              <p>Logge dich wie gewohnt auf <a href="https://jassguru.ch">jassguru.ch</a> ein — deine Pro-Features sind freigeschaltet.</p>
              <p style="text-align: center; margin: 32px 0;">
                <a href="https://jassguru.ch"
                   style="background-color: #ff0000; color: #fff; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold;">
                  Zu JassGuru
                </a>
              </p>
              <p style="color: #6b6b6b; font-size: 14px;">
                Bei Fragen erreichst du uns unter <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">Jassverband Schweiz | jassverband.ch</p>
            </div>
          `,
        });
        console.log(`[Stripe Webhook] Activation email sent to ${customerEmail}`);
      }
    }
  } catch (emailError) {
    console.error('[Stripe Webhook] Email sending failed (non-critical):', emailError);
  }

  console.log(`[Stripe Webhook] Checkout processing complete for ${customerEmail}`);
}
