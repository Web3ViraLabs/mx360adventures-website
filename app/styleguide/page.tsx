import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RAMPS = ["sand", "ember", "midnight"] as const;
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function Ramp({ name }: { name: string }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-sm font-semibold capitalize">{name}</h3>
      <div className="flex overflow-hidden rounded-lg shadow-[var(--shadow-soft)]">
        {STEPS.map((s) => (
          <div key={s} className="flex-1">
            {/* Inline CSS var avoids Tailwind JIT missing dynamically-built classes. */}
            <div className="h-14" style={{ backgroundColor: `var(--color-${name}-${s})` }} />
            <div className="bg-card px-1 py-1 text-center text-[10px] text-muted-foreground">
              {s}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TokenPreviewPage() {
  return (
    <>
      {/* Cinematic dark band — mimics the future hero, proves the dark tokens. */}
      <section className="dark bg-[image:var(--gradient-dusk)] pt-28 pb-16 text-foreground">
        <Container>
          <Badge className="bg-primary text-primary-foreground">Scaffold preview</Badge>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-extrabold sm:text-6xl">
            Desert Storm Adventure
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Design tokens &amp; layout shell. The real cinematic hero, catalog and
            slide-to-confirm checkout come next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="shadow-[var(--shadow-glow)]">Book an adventure</Button>
            <Button size="lg" variant="outline">Explore the fleet</Button>
          </div>
        </Container>
      </section>

      <Container className="space-y-12 py-16">
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold">Color ramps</h2>
          {RAMPS.map((r) => (
            <Ramp key={r} name={r} />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Typography</h2>
          <p className="font-display text-5xl font-extrabold tracking-tight">Display / Sora 800</p>
          <p className="font-display text-3xl font-semibold">Heading / Sora 600</p>
          <p className="text-base text-foreground/90">
            Body / Inter — the quick desert fox jumps the dune at sunset. 0123456789
          </p>
          <p className="text-sm text-muted-foreground">Muted / Inter — supporting copy.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Elevation &amp; surfaces</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Soft", "shadow-[var(--shadow-soft)]"],
              ["Card", "shadow-[var(--shadow-card)]"],
              ["Lifted", "shadow-[var(--shadow-lifted)]"],
              ["Glow", "shadow-[var(--shadow-glow)]"],
            ].map(([label, shadow]) => (
              <div
                key={label}
                className={`grid h-28 place-items-center rounded-xl border border-border bg-card font-medium ${shadow}`}
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>
      </Container>
    </>
  );
}
