"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, ShoppingBag, TriangleAlert } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useMounted } from "@/lib/hooks";
import { getStripePromise, isStripeClientConfigured } from "@/lib/stripe-client";
import { customerSchema, type CustomerInfo, type OrderTotals } from "@/lib/checkout";
import { createPaymentIntent } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderSummary } from "./order-summary";
import { PaymentForm } from "./payment-form";

const APPEARANCE: StripeElementsOptions["appearance"] = {
  theme: "flat",
  variables: {
    colorPrimary: "#e25613",
    colorBackground: "#ffffff",
    colorText: "#0e1726",
    colorTextSecondary: "#7e6a54",
    colorDanger: "#dc2626",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": { border: "1px solid #e8dcc8", boxShadow: "none", padding: "12px" },
    ".Input:focus": { border: "1px solid #e25613", boxShadow: "0 0 0 1px #e25613" },
    ".Tab": { border: "1px solid #e8dcc8" },
    ".Tab--selected": { borderColor: "#e25613", boxShadow: "0 0 0 1px #e25613" },
  },
};

export function CheckoutClient() {
  const mounted = useMounted();
  const items = useCart((s) => s.items);
  const [step, setStep] = useState<"details" | "payment">("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [totals, setTotals] = useState<OrderTotals | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unconfigured, setUnconfigured] = useState(false);

  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", email: "", phone: "" },
    mode: "onBlur",
  });

  const stripePromise = getStripePromise();

  const onSubmit = form.handleSubmit(async (customer) => {
    setSubmitting(true);
    setUnconfigured(false);
    const res = await createPaymentIntent({
      items: items.map((i) => ({
        experienceId: i.experienceId,
        slotId: i.slotId,
        dateISO: i.dateISO,
        participants: i.participants,
      })),
      customer,
    });
    setSubmitting(false);

    if (!res.ok) {
      if (res.reason === "stripe_unconfigured") setUnconfigured(true);
      else form.setError("root", { message: res.message });
      return;
    }
    setClientSecret(res.clientSecret);
    setTotals(res.totals);
    setStep("payment");
  });

  // Avoid flashing the empty state before the persisted cart hydrates.
  if (!mounted) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-secondary">
          <ShoppingBag className="size-7 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold">Your order is empty</h1>
        <p className="text-muted-foreground">Add an adventure before heading to checkout.</p>
        <Button asChild className="mt-2">
          <Link href="/adventures">Browse adventures</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* LEFT — details / payment */}
      <div className="order-2 lg:order-1">
        <AnimatePresence mode="wait">
          {step === "details" ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
                <h2 className="font-display text-xl font-bold">Your details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Guest checkout — no account needed. We'll send confirmation here.
                </p>

                <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
                  <Field
                    label="Full name"
                    error={form.formState.errors.name?.message}
                    {...form.register("name")}
                    autoComplete="name"
                    placeholder="Jordan Rider"
                  />
                  <Field
                    label="Email"
                    type="email"
                    error={form.formState.errors.email?.message}
                    {...form.register("email")}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  <Field
                    label="Phone (WhatsApp)"
                    type="tel"
                    error={form.formState.errors.phone?.message}
                    {...form.register("phone")}
                    autoComplete="tel"
                    placeholder="+971 50 000 0000"
                  />

                  {unconfigured && (
                    <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                      <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                      <span>
                        Payments aren't configured yet. Add your Stripe test keys to{" "}
                        <code className="rounded bg-amber-100 px-1">.env.local</code> and restart.
                      </span>
                    </div>
                  )}
                  {form.formState.errors.root && (
                    <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
                  )}

                  <Button type="submit" size="lg" disabled={submitting} className="h-13 w-full text-base">
                    {submitting ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <>Continue to payment <ArrowRight className="ml-1 size-5" /></>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-4" /> Edit details
                </button>
                <h2 className="font-display text-xl font-bold">Payment</h2>

                {clientSecret && totals && stripePromise && isStripeClientConfigured() ? (
                  <div className="mt-5">
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: APPEARANCE }}>
                      <PaymentForm totals={totals} />
                    </Elements>
                  </div>
                ) : (
                  <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                    <span>
                      Add <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{" "}
                      to render the payment form.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT — summary */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-24">
          <OrderSummary lockedTotals={step === "payment" ? totals ?? undefined : undefined} />
        </div>
      </div>
    </div>
  );
}

/** Small labelled input with inline error, forwarding RHF's register props. */
const Field = ({
  label,
  error,
  ...props
}: { label: string; error?: string } & React.ComponentProps<typeof Input>) => {
  const id = props.name ?? label;
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block">
        {label}
      </Label>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
