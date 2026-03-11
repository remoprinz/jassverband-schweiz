import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
});

export const MEMBERSHIP_PRICES = {
  pionier: 6000,      // CHF 60
  botschafter: 9000,  // CHF 90
  patron: 35000,      // CHF 350
  jugend: 2000,       // CHF 20
  goenner: 5000,      // CHF 50 (Mindestbetrag, vom User anpassbar)
} as const;

export type MembershipType = keyof typeof MEMBERSHIP_PRICES;

export const MEMBERSHIP_NAMES: Record<MembershipType, string> = {
  pionier: 'Jasser-Lizenz',
  botschafter: 'Trumpf-Lizenz',
  patron: 'Gruppen-Lizenz',
  jugend: 'Jugendlizenz',
  goenner: 'Gönner-Beitrag',
};
