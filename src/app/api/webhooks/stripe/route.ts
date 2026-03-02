/**
 * Stripe Webhook Handler
 * 
 * Verarbeitet Stripe Events (Zahlungsbestätigung)
 * Aktiviert JVS-Mitgliedschaft via Firebase Cloud Function
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Webhook Secret aus Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      console.error('[Stripe Webhook] Missing signature or webhook secret');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verifiziere Webhook Signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('[Stripe Webhook] Signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    console.log(`[Stripe Webhook] Event received: ${event.type}`);

    // Event Handler
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);
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

/**
 * Verarbeitet erfolgreiche Checkout Sessions
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('[Stripe Webhook] Checkout completed:', session.id);
  
  const metadata = session.metadata || {};
  const customerEmail = session.customer_email || metadata.customer_email;
  const customerName = metadata.customer_name;
  const membershipType = metadata.membership_type;
  const jassname = metadata.jassname;
  
  console.log('[Stripe Webhook] Member data:', {
    email: customerEmail,
    name: customerName,
    membership: membershipType,
    jassname: jassname,
    amount: session.amount_total,
  });
  
  // Rufe Firebase Cloud Function auf um Mitgliedschaft zu aktivieren
  // Option A: Direct Firebase Admin SDK (wenn auf Firebase gehostet)
  // Option B: HTTP Request zu Cloud Function
  
  const firebaseFunctionUrl = process.env.FIREBASE_FUNCTIONS_URL;
  
  if (firebaseFunctionUrl) {
    try {
      const response = await fetch(`${firebaseFunctionUrl}/activateMembership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Service-to-Service Auth
          'Authorization': `Bearer ${process.env.FIREBASE_SERVICE_TOKEN}`,
        },
        body: JSON.stringify({
          email: customerEmail,
          name: customerName,
          membershipType: membershipType,
          jassname: jassname,
          stripeSessionId: session.id,
          stripeCustomerId: session.customer,
          paymentProvider: 'stripe',
          amount: session.amount_total,
        }),
      });
      
      if (!response.ok) {
        console.error('[Stripe Webhook] Firebase function failed:', await response.text());
      } else {
        console.log('[Stripe Webhook] Membership activated successfully');
      }
    } catch (error) {
      console.error('[Stripe Webhook] Failed to call Firebase function:', error);
    }
  } else {
    // Fallback: Speichere in lokaler Queue für manuelle Verarbeitung
    console.log('[Stripe Webhook] No Firebase URL configured, logging for manual processing');
    
    // TODO: Hier könnte man in Supabase/PostgreSQL speichern als Fallback
    // oder eine Email an Admin senden
  }
}
