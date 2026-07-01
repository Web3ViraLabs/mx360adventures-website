"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { partners } from "@/lib/company";

/**
 * Featured-in / partner wordmark strip. Driven by a Framer Motion transform
 * (not a CSS keyframe) so it loops reliably regardless of the global
 * reduced-motion CSS freeze. The track is duplicated and shifted -50%, which
 * lands exactly on the copy for a seamless loop.
 */
export function PartnersStrip() {
  const row = [...partners, ...partners];

  return (
    <section className="border-y border-border bg-card py-8">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          As featured on &amp; trusted by
        </p>
      </Container>

      <div className="relative mt-5 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent" />

        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {row.map((p, i) => (
            <span
              key={`${p.name}-${i}`}
              className="flex shrink-0 items-center gap-1.5 pr-12 font-display text-xl font-bold tracking-tight text-foreground/45"
            >
              <Star className="size-4 fill-current text-foreground/30" />
              {p.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
