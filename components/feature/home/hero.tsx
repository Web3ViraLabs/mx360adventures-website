"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/lib/images";

/**
 * Cinematic, scroll-driven parallax hero. Three layers move at different rates;
 * everything is transform/opacity only and disabled under reduced-motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Slower-moving background + drifting foreground => depth.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="dark relative flex min-h-[100svh] items-center overflow-hidden bg-midnight-900 text-foreground"
    >
      {/* Layer 1 — desert backdrop (paint order, not negative z, so it sits
          above the section's opaque fallback background) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/hero-1.png"
          alt="Desert Storm Adventure — riding the dunes"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Layer 2 — gradient wash + vignette for text legibility over the photo */}
      <div className="absolute inset-0 z-1 bg-[image:var(--gradient-dusk)] opacity-45" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-midnight-900 via-midnight-900/20 to-midnight-900/40" />

      {/* Layer 3 — content */}
      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 w-full pt-20">
        <Container>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm backdrop-blur">
              <Star className="size-3.5 fill-ember-400 text-ember-400" />
              4.9 · 1,500+ desert riders
            </span>

            <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
              Ride the storm.
              <span className="text-gradient-ember block">Own the dunes.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/80">
              Quad bikes, turbo buggies, MX and sunset safaris in the Dubai desert.
              Pick your slot, slide to confirm, and we'll handle the rest.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 px-7 text-base shadow-[var(--shadow-glow)]">
                <Link href="/adventures">Book an adventure</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-white/25 bg-white/5 px-7 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white"
              >
                <Link href="/adventures/buggy">Explore the fleet</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown className="size-6" />
        </motion.div>
      )}
    </section>
  );
}
