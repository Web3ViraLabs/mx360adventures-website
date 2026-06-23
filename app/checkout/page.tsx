import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { CheckoutClient } from "@/components/feature/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your desert adventure booking.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Container className="pt-24 pb-16">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-muted-foreground">
        Secure guest checkout — book your slot in under a minute.
      </p>
      <div className="mt-8">
        <CheckoutClient />
      </div>
    </Container>
  );
}
