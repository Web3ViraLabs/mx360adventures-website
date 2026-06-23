import "server-only";
import { eq } from "drizzle-orm";
import { hasDatabase } from "./queries";
import type { CustomerInfo, PricedLine, OrderTotals } from "@/lib/checkout";

/**
 * Order persistence. All functions are no-ops (returning null) when no DB is
 * configured, so the checkout flow still works against the seed catalog —
 * Stripe just won't have a backing order row until DATABASE_URL is set.
 */
export async function createPendingOrder(input: {
  customer: CustomerInfo;
  lines: (PricedLine & { experienceId: string; slotId: string })[];
  totals: OrderTotals;
}): Promise<string | null> {
  if (!hasDatabase()) return null;
  const { db } = await import("./index");
  const { orders, bookings } = await import("./schema");

  const [order] = await db
    .insert(orders)
    .values({
      status: "pending",
      customerName: input.customer.name,
      customerEmail: input.customer.email,
      customerPhone: input.customer.phone,
      subtotalAed: input.totals.subtotalAed,
      totalAed: input.totals.totalAed,
    })
    .returning({ id: orders.id });

  await db.insert(bookings).values(
    input.lines.map((l) => ({
      orderId: order.id,
      experienceId: l.experienceId,
      slotId: l.slotId,
      experienceTitle: l.title,
      slotLabel: l.slotLabel,
      slotStartTime: l.slotStartTime,
      bookingDate: l.dateISO,
      participants: l.participants,
      unitPriceAed: l.unitPriceAed,
      lineTotalAed: l.lineTotalAed,
      status: "held" as const,
    }))
  );

  return order.id;
}

export async function attachPaymentIntent(orderId: string, paymentIntentId: string) {
  if (!hasDatabase()) return;
  const { db } = await import("./index");
  const { orders } = await import("./schema");
  await db
    .update(orders)
    .set({ stripePaymentIntentId: paymentIntentId })
    .where(eq(orders.id, orderId));
}

/** Marks the order paid + bookings confirmed. Called from the Stripe webhook. */
export async function markOrderPaidByPaymentIntent(paymentIntentId: string) {
  if (!hasDatabase()) return { updated: false };
  const { db } = await import("./index");
  const { orders, bookings } = await import("./schema");

  const [order] = await db
    .update(orders)
    .set({ status: "paid", paidAt: new Date() })
    .where(eq(orders.stripePaymentIntentId, paymentIntentId))
    .returning({ id: orders.id });

  if (order) {
    await db.update(bookings).set({ status: "confirmed" }).where(eq(bookings.orderId, order.id));
    return { updated: true, orderId: order.id };
  }
  return { updated: false };
}
