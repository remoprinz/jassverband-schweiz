import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  _stripe = new Stripe(key, { typescript: true });
  return _stripe;
}

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
