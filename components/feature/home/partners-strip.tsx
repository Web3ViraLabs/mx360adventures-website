import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { partners } from "@/lib/company";

/**
 * Featured-in / partner wordmark strip. A duplicated track gives an infinite
 * marquee; prefers-reduced-motion freezes it via the global CSS rule.
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

      <div className="group relative mt-5 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent" />

        {/* Each item carries its own trailing space (pr-12) so the -50% shift
            lands exactly on the duplicate → perfectly seamless loop. */}
        <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((p, i) => (
            <span
              key={`${p.name}-${i}`}
              className="flex shrink-0 items-center gap-1.5 pr-12 font-display text-xl font-bold tracking-tight text-foreground/45"
            >
              <Star className="size-4 fill-current text-foreground/30" />
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
