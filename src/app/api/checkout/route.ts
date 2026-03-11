import { NextRequest, NextResponse } from 'next/server';
import { stripe, MEMBERSHIP_PRICES, MEMBERSHIP_NAMES, type MembershipType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      paket,
      name,
      email,
      jassname,
      amount: customAmount,
      locale = 'de',
    } = body;

    if (!paket || !name || !email) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: paket, name, email' },
        { status: 400 }
      );
    }

    if (!Object.keys(MEMBERSHIP_PRICES).includes(paket)) {
      return NextResponse.json(
        { error: 'Ungültiges Paket' },
        { status: 400 }
      );
    }

    const membershipType = paket as MembershipType;

    let price: number = MEMBERSHIP_PRICES[membershipType];
    if (membershipType === 'goenner' && customAmount && Number(customAmount) >= 10) {
      price = Math.round(Number(customAmount) * 100);
    }

    const productName = MEMBERSHIP_NAMES[membershipType];
    const baseUrl = 'https://jassverband.ch';

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
              description:
                membershipType === 'goenner'
                  ? 'Jassverband Schweiz — Gönner-Beitrag'
                  : `Jassverband Schweiz — ${productName} (Saison 1)`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],

      metadata: {
        membership_type: membershipType,
        customer_name: name,
        customer_email: email,
        jassname: jassname || '',
      },

      success_url: `${baseUrl}/${locale}/mitmachen/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/mitmachen#anmeldung`,

      locale:
        locale === 'fr' ? 'fr' : locale === 'it' ? 'it' : 'de',
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('[Stripe Checkout] Error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout konnte nicht erstellt werden' },
      { status: 500 }
    );
  }
}
