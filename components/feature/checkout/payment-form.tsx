"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import type { OrderTotals } from "@/lib/checkout";
import { SlideToConfirm } from "@/components/feature/slide-to-confirm";

export function PaymentForm({ totals }: { totals: OrderTotals }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clearCart = useCart((s) => s.clear);
  const [ready, setReady] = useState(false);

  const pay = async () => {
    if (!stripe || !elements) throw new Error("Stripe not ready");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message ?? "Payment failed. Please try again.");
      throw error; // resets the slider
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      clearCart();
      router.push(`/checkout/success?payment_intent=${paymentIntent.id}&redirect_status=succeeded`);
      // Keep the slider in its loading state through navigation.
      await new Promise(() => {});
    }
  };

  return (
    <div className="space-y-5">
      <PaymentElement
        onReady={() => setReady(true)}
        options={{ layout: "tabs" }}
      />

      <SlideToConfirm
        label={`Slide to pay ${formatPrice(totals.totalAed)}`}
        confirmedLabel="Payment confirmed"
        onConfirm={pay}
        disabled={!stripe || !ready}
        autoReset={false}
      />

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        Secured by Stripe · Apple Pay &amp; Google Pay supported
      </p>
    </div>
  );
}
