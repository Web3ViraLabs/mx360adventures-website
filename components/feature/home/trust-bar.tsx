import { ShieldCheck, Award, CalendarCheck, Headset } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const ITEMS = [
  { Icon: ShieldCheck, title: "Fully insured", sub: "Certified guides & gear" },
  { Icon: Award, title: "10+ years", sub: "20,000+ riders hosted" },
  { Icon: CalendarCheck, title: "Free rescheduling", sub: "Up to 24h before" },
  { Icon: Headset, title: "Instant confirmation", sub: "Book in under a minute" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:grid-cols-4">
        {ITEMS.map(({ Icon, title, sub }, i) => (
          <Reveal key={title} delay={i * 0.05} className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ember-50 text-ember-600">
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-tight">{title}</span>
              <span className="block text-xs text-muted-foreground">{sub}</span>
            </span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
