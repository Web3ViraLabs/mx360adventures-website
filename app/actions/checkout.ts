"use server";

import { getExperienceById } from "@/db/queries";
import { createPendingOrder, attachPaymentIntent } from "@/db/orders";
import { getStripe, isStripeConfigured, toFils } from "@/lib/stripe";
import {
  createIntentSchema,
  computeTotals,
  type CreateIntentResult,
  type PricedLine,
} from "@/lib/checkout";
import { formatTime } from "@/lib/catalog";

/**
 * Recompute the cart server-side from the catalog (never trust client prices),
 * persist a pending order when a DB is connected, and create a Stripe
 * PaymentIntent with automatic payment methods (card + Apple/Google Pay).
 */
export async function createPaymentIntent(input: unknown): Promise<CreateIntentResult> {
  const parsed = createIntentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, reason: "invalid_cart", message: parsed.error.issues[0]?.message ?? "Invalid order" };
  }
  const { items, customer } = parsed.data;

  // Reprice every line against the source-of-truth catalog.
  const lines: (PricedLine & { experienceId: string; slotId: string })[] = [];
  for (const item of items) {
    const exp = await getExperienceById(item.experienceId);
    if (!exp) return { ok: false, reason: "invalid_cart", message: "An item is no longer available." };
    const slot = exp.slots.find((s) => s.id === item.slotId);
    if (!slot) return { ok: false, reason: "invalid_cart", message: "A selected time is no longer available." };

    const participants = Math.max(exp.minParticipants, Math.min(exp.maxParticipants, item.participants));
    lines.push({
      experienceId: exp.id,
      slotId: slot.id,
      title: exp.title,
      dateISO: item.dateISO,
      slotLabel: slot.label,
      slotStartTime: slot.startTime,
      participants,
      unitPriceAed: exp.basePriceAed,
      lineTotalAed: exp.basePriceAed * participants,
    });
  }

  const totals = computeTotals(lines);

  if (!isStripeConfigured()) {
    return {
      ok: false,
      reason: "stripe_unconfigured",
      message: "Payments aren't configured yet. Add Stripe test keys to .env.local.",
    };
  }

  try {
    // Persist a pending order first (no-op without a DB) so the webhook can confirm it.
    const orderId = await createPendingOrder({ customer, lines, totals });

    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount: toFils(totals.totalAed),
      currency: "aed",
      automatic_payment_methods: { enabled: true },
      receipt_email: customer.email,
      description: `Desert Storm Adventure — ${lines.length} booking${lines.length > 1 ? "s" : ""}`,
      metadata: {
        orderId: orderId ?? "",
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        // Compact, human-readable summary (Stripe metadata caps at 500 chars/value).
        summary: lines
          .map((l) => `${l.participants}× ${l.title} @ ${l.dateISO} ${formatTime(l.slotStartTime)}`)
          .join(" | ")
          .slice(0, 490),
      },
    });

    if (orderId) await attachPaymentIntent(orderId, intent.id);

    if (!intent.client_secret) {
      return { ok: false, reason: "error", message: "Could not initialise payment." };
    }
    return { ok: true, clientSecret: intent.client_secret, totals, orderId };
  } catch (err) {
    console.error("createPaymentIntent failed:", err);
    return { ok: false, reason: "error", message: "Something went wrong creating your payment." };
  }
}
