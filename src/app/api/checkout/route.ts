import { NextRequest, NextResponse } from 'next/server';
import { getStripe, MEMBERSHIP_PRICES, MEMBERSHIP_NAMES, type MembershipType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      paket,
      firstName: firstNameRaw,
      lastName: lastNameRaw,
      email: emailRaw,
      jassname: jassnameRaw,
      message,
      amount: customAmount,
      locale = 'de',
    } = body;

    // Trim user input — verhindert "Priska "-Artefakte in DB/Emails.
    const firstName = typeof firstNameRaw === 'string' ? firstNameRaw.trim() : '';
    const lastName = typeof lastNameRaw === 'string' ? lastNameRaw.trim() : '';
    const email = typeof emailRaw === 'string' ? emailRaw.trim() : '';
    const jassname = typeof jassnameRaw === 'string' ? jassnameRaw.trim() : '';

    if (!paket || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: paket, firstName, lastName, email' },
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

    let productLabel = productName;
    let description = `Jassverband Schweiz — ${productName} (12 Monate)`;

    if (membershipType === 'goenner') {
      const amountChf = price / 100;
      if (amountChf >= 500) {
        productLabel = 'Ehrenmitglied';
        description = 'Jassverband Schweiz — Ehrenmitgliedschaft (lebenslang, mit Diplom)';
      } else if (amountChf >= 100) {
        productLabel = 'Lebenslange Mitgliedschaft';
        description = 'Jassverband Schweiz — Lebenslange Mitgliedschaft';
      } else {
        description = 'Jassverband Schweiz — Gönner-Beitrag (1 Saison)';
      }
    } else if (membershipType === 'pionier') {
      description = 'Jassverband Schweiz — Jasser-Lizenz (1 Saison)';
    } else if (membershipType === 'jugend') {
      description = 'Jassverband Schweiz — Jugendlizenz (1 Saison)';
    }

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      payment_method_types: ['twint', 'card'],

      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: productLabel,
              description,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],

      metadata: {
        membership_type: membershipType,
        customer_firstName: firstName,
        customer_lastName: lastName,
        customer_email: email,
        jassname: jassname || '',
        message: typeof message === 'string' ? message.trim() : '',
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
