import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { milestones } from "@/lib/company";

/**
 * Vertical company timeline — a left rail with year markers and milestone cards.
 */
export function Timeline() {
  return (
    <RevealGroup className="relative">
      {/* Vertical rail */}
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-ember-300 via-border to-transparent sm:left-[19px]" />

      <ol className="space-y-8">
        {milestones.map((m) => (
          <RevealItem key={m.year}>
            <li className="relative flex gap-5 sm:gap-7">
              {/* Node */}
              <div className="relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full border-2 border-background bg-[image:var(--gradient-ember)] shadow-[var(--shadow-glow)] sm:size-10">
                <span className="size-2 rounded-full bg-white sm:size-2.5" />
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <span className="inline-flex items-center rounded-full bg-ember-50 px-2.5 py-1 font-display text-sm font-bold text-ember-700">
                  {m.year}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            </li>
          </RevealItem>
        ))}
      </ol>
    </RevealGroup>
  );
}
