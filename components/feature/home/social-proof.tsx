import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RatingStars } from "@/components/feature/rating-stars";

const STATS = [
  { value: "20k+", label: "Riders hosted" },
  { value: "4.9", label: "Average rating" },
  { value: "12", label: "Vehicles in fleet" },
  { value: "10+", label: "Years in the dunes" },
];

const TESTIMONIALS = [
  {
    quote:
      "The Raptor 700 session was unreal. Guides were pros and the booking took me thirty seconds on my phone.",
    name: "Marcus T.",
    detail: "Quad · Raptor 700",
  },
  {
    quote:
      "Did the X3 turbo buggy with my brother — fastest, most fun hour of our Dubai trip. Pickup was right on time.",
    name: "Priya N.",
    detail: "Buggy · Can-Am X3",
  },
  {
    quote:
      "Sunset safari with the kids was magical. Camel rides, sandboarding, then a proper BBQ under the stars.",
    name: "James & family",
    detail: "Safari · Sunset & BBQ",
  },
];

export function SocialProof() {
  return (
    <section className="pattern-waves py-20">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <RevealItem key={s.label} className="text-center">
              <p className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
            Riders keep coming back
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <Quote className="size-7 text-ember-300" aria-hidden />
                <blockquote className="mt-3 flex-1 text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.detail}</span>
                  </span>
                  <RatingStars rating={5} showCount={false} />
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
