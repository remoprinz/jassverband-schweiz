/**
 * Stripe Configuration
 * 
 * Server-side Stripe client für JVS Checkout
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

// Mitgliedschafts-Preise in Rappen
export const MEMBERSHIP_PRICES = {
  pionier: 6000,     // CHF 60
  botschafter: 9000, // CHF 90
  patron: 35000,     // CHF 350
} as const;

export type MembershipType = keyof typeof MEMBERSHIP_PRICES;

// Human-readable Namen
export const MEMBERSHIP_NAMES: Record<MembershipType, string> = {
  pionier: 'Pionier-Mitgliedschaft',
  botschafter: 'Botschafter-Mitgliedschaft', 
  patron: 'Patron-Mitgliedschaft',
};
