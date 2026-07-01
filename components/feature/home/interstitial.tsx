import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { HERO_LOCAL, BLUR_DATA_URL } from "@/lib/images";

/**
 * Full-bleed cinematic band that parallaxes on scroll — a jolt of adrenaline
 * between the calmer content sections.
 */
export function Interstitial() {
  return (
    <section className="dark relative flex min-h-[70svh] items-center overflow-hidden bg-midnight-900 text-foreground">
      <Parallax distance={80} className="absolute inset-0">
        <Image
          src={HERO_LOCAL}
          alt="Riders carving across the dunes"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="scale-110 object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 bg-midnight-900/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-transparent to-midnight-900/40" />

      <Container className="relative py-20 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember-300">
            Feel it move beneath you
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            The dunes don't wait.
            <span className="mt-1 block text-gradient-ember">Neither should you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            Throttle open, sand flying, sun dropping. This is the desert at full tilt —
            and it's one tap away.
          </p>
          <div className="mt-9 flex justify-center">
            <Button asChild size="lg" className="h-13 px-8 text-base shadow-[var(--shadow-glow)]">
              <Link href="/adventures">
                Chase the adrenaline <ArrowRight className="ml-1 size-5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
