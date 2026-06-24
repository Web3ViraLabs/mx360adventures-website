import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/feature/section-heading";
import { AnimatedCounter } from "@/components/feature/animated-counter";
import { ValuesGrid } from "@/components/feature/values-grid";
import { Timeline } from "@/components/feature/about/timeline";
import { TeamGrid } from "@/components/feature/about/team-grid";
import { aboutStats, pressQuotes } from "@/lib/company";
import { siteConfig } from "@/lib/site";
import { unsplash, PHOTOS, BLUR_DATA_URL } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us — A Decade in the Dunes",
  description:
    "The story of Desert Storm Adventure: eleven years, 25,000+ bookings, 19,000+ happy riders and a 100% safety record across Dubai's desert.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="dark relative flex min-h-[60svh] items-center overflow-hidden bg-midnight-900 pt-20 text-foreground">
        <Image
          src={unsplash(PHOTOS.dunesVast, 2000, 70)}
          alt="Vast desert dunes"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-dusk)] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/20 to-midnight-900/50" />
        <Container className="relative py-16">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-400">
              Our story
            </p>
            <h1 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              We turned a love of the dunes into Dubai's desert standard.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              What began in 2014 with three quad bikes and a refusal to cut corners is
              now a fleet of premium machines, a team of certified guides, and tens of
              thousands of riders who trust us with their adrenaline.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary/40 py-14">
        <Container>
          <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            {aboutStats.map((s) => (
              <RevealItem key={s.label} className="text-center">
                <p className="font-display text-4xl font-extrabold tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our mission"
              title="Premium adventure, done responsibly"
              subtitle="We exist to give people the most thrilling, safe and genuinely premium way to experience the Arabian desert — while treating the landscape and our guests with the respect they deserve."
            />
            <p className="mt-4 leading-relaxed text-foreground/90">
              Every ride is led by a certified guide, on a meticulously maintained machine,
              with full safety gear and a proper briefing. We cap group sizes, stick to
              designated trails, and run leave-no-trace camps. The result is an experience
              that feels effortless to you and is anything but behind the scenes.
            </p>
            <Button asChild className="mt-7">
              <Link href="/adventures">
                Explore the experiences <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lifted)]">
              <Image
                src={unsplash(PHOTOS.offroad, 1000, 75)}
                alt="Riders on the dunes"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/30 py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The journey"
            title="Eleven years, one obsession"
            subtitle="From three quads to the desert's most-trusted operator."
            className="mb-12"
          />
          <div className="mx-auto max-w-3xl">
            <Timeline />
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="The principles behind every ride"
            className="mb-12"
          />
          <ValuesGrid />
        </Container>
      </section>

      {/* Press quotes */}
      <section className="bg-secondary/30 py-16">
        <Container>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {pressQuotes.map((p) => (
              <RevealItem key={p.source}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <Quote className="size-6 text-ember-300" aria-hidden />
                  <blockquote className="mt-3 flex-1 font-display text-lg font-semibold leading-snug">
                    &ldquo;{p.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
                    — {p.source}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The people"
            title="The crew behind the dust"
            subtitle="A small, obsessive team that lives for the desert."
            className="mb-12"
          />
          <TeamGrid />
        </Container>
      </section>

      {/* CTA */}
      <section className="dark relative overflow-hidden bg-[image:var(--gradient-dusk)] py-20 text-foreground">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-extrabold sm:text-5xl">
              Come write your chapter in the dunes.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Join {aboutStats[1].value.toLocaleString()}+ riders who've trusted us with
              their best desert day.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 px-8 text-base shadow-[var(--shadow-glow)]">
                <Link href="/adventures">Book an adventure</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-white/25 bg-white/5 px-8 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white"
              >
                <a href={`mailto:${siteConfig.contact.email}`}>Talk to us</a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
