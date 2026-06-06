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
  pionier: 2000,      // CHF 20 — Jasser-Lizenz (1 Saison)
  jugend: 1000,       // CHF 10 — Jugendlizenz (versteckt)
  goenner: 1000,      // CHF 10 — Gönner-Mindestbetrag (frei wählbar)
} as const;

export type MembershipType = keyof typeof MEMBERSHIP_PRICES;

export const MEMBERSHIP_NAMES: Record<MembershipType, string> = {
  pionier: 'Jasser-Lizenz',
  jugend: 'Jugendlizenz',
  goenner: 'Gönner-Beitrag',
};
