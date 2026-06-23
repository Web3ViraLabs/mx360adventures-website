"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { clientEnv } from "./env";

let promise: Promise<Stripe | null> | null = null;

/** Singleton Stripe.js loader. Returns null if the publishable key is unset. */
export function getStripePromise(): Promise<Stripe | null> | null {
  const key = clientEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  promise ??= loadStripe(key);
  return promise;
}

export const isStripeClientConfigured = () =>
  Boolean(clientEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
