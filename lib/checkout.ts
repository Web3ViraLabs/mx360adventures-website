import { z } from "zod";

/** A single booking line as sent from the client cart to the server. */
export const checkoutItemSchema = z.object({
  experienceId: z.string().min(1),
  slotId: z.string().min(1),
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  participants: z.number().int().min(1).max(50),
});

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "Enter a valid phone number"),
});

export const createIntentSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "Your cart is empty"),
  customer: customerSchema,
});

export type CheckoutItem = z.infer<typeof checkoutItemSchema>;
export type CustomerInfo = z.infer<typeof customerSchema>;
export type CreateIntentInput = z.infer<typeof createIntentSchema>;

export const VAT_RATE = 0.05; // UAE VAT 5%

export type PricedLine = {
  experienceId: string;
  title: string;
  dateISO: string;
  slotLabel: string;
  slotStartTime: string;
  participants: number;
  unitPriceAed: number;
  lineTotalAed: number;
};

export type OrderTotals = {
  subtotalAed: number;
  vatAed: number;
  totalAed: number;
};

export function computeTotals(lines: PricedLine[]): OrderTotals {
  const subtotalAed = lines.reduce((s, l) => s + l.lineTotalAed, 0);
  const vatAed = Math.round(subtotalAed * VAT_RATE);
  return { subtotalAed, vatAed, totalAed: subtotalAed + vatAed };
}

/** Result returned by the create-payment-intent server action. */
export type CreateIntentResult =
  | { ok: true; clientSecret: string; totals: OrderTotals; orderId: string | null }
  | { ok: false; reason: "stripe_unconfigured" | "invalid_cart" | "error"; message: string };
