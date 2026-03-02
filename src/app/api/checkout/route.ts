/**
 * Stripe Checkout API Route
 * 
 * Erstellt eine Stripe Checkout Session für JVS-Mitgliedschaft
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe, MEMBERSHIP_PRICES, MEMBERSHIP_NAMES, MembershipType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      paket, 
      name, 
      email, 
      jassname,
      locale = 'de' 
    } = body;

    // Validierung
    if (!paket || !name || !email) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: paket, name, email' },
        { status: 400 }
      );
    }

    // Prüfe ob gültiges Paket
    if (!Object.keys(MEMBERSHIP_PRICES).includes(paket)) {
      return NextResponse.json(
        { error: 'Ungültiges Paket' },
        { status: 400 }
      );
    }

    const membershipType = paket as MembershipType;
    const price = MEMBERSHIP_PRICES[membershipType];
    const productName = MEMBERSHIP_NAMES[membershipType];

    // Base URL für Redirects
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jassverband.ch';
    
    // Stripe Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: productName,
              description: `Jassverband Schweiz - ${productName} (1 Jahr)`,
              metadata: {
                membership_type: membershipType,
              },
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      
      // Metadata für Webhook
      metadata: {
        membership_type: membershipType,
        customer_name: name,
        customer_email: email,
        jassname: jassname || '',
      },
      
      // Redirects
      success_url: `${baseUrl}/${locale}/mitmachen/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/mitmachen#anmeldung`,
      
      // Swiss German locale
      locale: locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : locale === 'it' ? 'it' : 'de',
      
      // Automatische Steuerberechnung (optional)
      // automatic_tax: { enabled: true },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (error) {
    console.error('[Stripe Checkout] Error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Checkout konnte nicht erstellt werden' },
      { status: 500 }
    );
  }
}
