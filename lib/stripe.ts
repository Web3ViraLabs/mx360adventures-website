import "server-only";
import Stripe from "stripe";
import { serverEnv, requireEnv } from "./env";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  cached = new Stripe(requireEnv(serverEnv.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY"), {
    // Use the SDK's pinned API version; account default applies otherwise.
    typescript: true,
    appInfo: { name: "Desert Storm Adventure" },
  });
  return cached;
}

export const isStripeConfigured = () => Boolean(serverEnv.STRIPE_SECRET_KEY);

/** AED is a 2-decimal currency — Stripe amounts are in fils. */
export const toFils = (aed: number) => Math.round(aed * 100);
