import { Container } from "@/components/layout/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/feature/animated-counter";
import { companyStats } from "@/lib/company";

/**
 * Cinematic dark band of animated headline numbers — the corporate "proof at a
 * glance" moment.
 */
export function StatsBand() {
  return (
    <section className="dark relative overflow-hidden bg-midnight-900 py-20 text-foreground">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-ember-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 size-72 rounded-full bg-midnight-400/20 blur-3xl" />

      <Container className="relative">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-400">
            Trusted across the dunes
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold sm:text-4xl">
            A decade of desert firsts
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {companyStats.map((s) => (
            <RevealItem key={s.label} className="text-center">
              <p className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  decimals={s.decimals}
                  className="bg-[image:var(--gradient-ember)] bg-clip-text text-transparent"
                />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
