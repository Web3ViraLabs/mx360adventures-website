"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";

export function SuccessClient({ paymentIntent }: { paymentIntent?: string }) {
  const clear = useCart((s) => s.clear);
  const reduce = useReducedMotion();
  const cleared = useRef(false);

  // Clear the cart once on arrival (covers the wallet-redirect return path).
  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clear();
    }
  }, [clear]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
      <motion.div
        initial={reduce ? false : { scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid size-20 place-items-center rounded-full bg-[image:var(--gradient-ember)] text-white shadow-[var(--shadow-glow)]"
      >
        <Check className="size-10" strokeWidth={3} />
      </motion.div>

      <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">
        You're booked! 🏜️
      </h1>
      <p className="mt-3 text-muted-foreground">
        Your desert adventure is confirmed. A confirmation email with your booking
        details and pickup info is on its way.
      </p>

      {paymentIntent && (
        <p className="mt-4 rounded-lg bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground">
          Ref: {paymentIntent}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/adventures">Book another adventure</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
