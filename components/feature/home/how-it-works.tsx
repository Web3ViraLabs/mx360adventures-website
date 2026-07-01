import { Compass, CalendarCheck, MoveRight, Mountain } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/feature/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const STEPS = [
  { Icon: Compass, title: "Pick your adventure", body: "Browse the fleet — quads, buggies, MX or a sunset safari — and find your ride." },
  { Icon: CalendarCheck, title: "Choose date & riders", body: "Select a slot and party size with live pricing. No back-and-forth, no waiting." },
  { Icon: MoveRight, title: "Slide to confirm", body: "Secure one-tap checkout with card, Apple Pay or Google Pay. Instant confirmation." },
  { Icon: Mountain, title: "Ride the dunes", body: "We handle pickup and gear. You bring the adrenaline. Memories included." },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From couch to dune crest in four steps"
          subtitle="Booking a world-class desert adventure should take less time than choosing a restaurant."
        />

        <RevealGroup className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          {STEPS.map((s, i) => (
            <RevealItem key={s.title} className="relative text-center">
              <div className="relative mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <s.Icon className="size-6 text-ember-600" />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-[image:var(--gradient-ember)] text-xs font-bold text-white shadow-[var(--shadow-glow)]">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
