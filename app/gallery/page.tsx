import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Gallery } from "@/components/feature/home/gallery";
import { HERO_LOCAL, BLUR_DATA_URL } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery — Moments in the Dunes",
  description:
    "Real days, real dust, real grins. A gallery of desert adventures with Desert Storm Adventure — quads, buggies, camel rides and sunset camps.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="dark relative flex min-h-[46svh] items-center overflow-hidden bg-midnight-900 pt-20 text-foreground">
        <Image
          src={HERO_LOCAL}
          alt="Desert dunes"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-dusk)] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/20 to-midnight-900/40" />
        <Container className="relative py-14">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-400">
              Gallery
            </p>
            <h1 className="mt-3 text-balance font-display text-4xl font-extrabold sm:text-6xl">
              Moments in the dunes
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              A glimpse of the dust, the drops and the grins. This is what your desert
              day looks like.
            </p>
          </Reveal>
        </Container>
      </section>

      <Gallery />

      {/* CTA */}
      <section className="dark relative overflow-hidden bg-[image:var(--gradient-dusk)] py-20 text-foreground">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-extrabold sm:text-5xl">
              Your turn in the frame.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Book your ride and make your own desert memories.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="h-13 px-8 text-base shadow-[var(--shadow-glow)]">
                <Link href="/adventures">
                  Browse adventures <ArrowRight className="ml-1 size-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
