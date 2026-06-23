import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SuccessClient } from "@/components/feature/checkout/success-client";

export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string }>;
}) {
  const { payment_intent } = await searchParams;
  return (
    <Container className="pt-20">
      <SuccessClient paymentIntent={payment_intent} />
    </Container>
  );
}
