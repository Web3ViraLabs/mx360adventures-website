import { ShieldCheck, Gem, Compass, Leaf, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { values, type Value } from "@/lib/company";

const ICONS: Record<Value["icon"], LucideIcon> = {
  shield: ShieldCheck,
  gem: Gem,
  compass: Compass,
  leaf: Leaf,
};

export function ValuesGrid() {
  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2">
      {values.map((v) => {
        const Icon = ICONS[v.icon];
        return (
          <RevealItem key={v.title}>
            <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lifted)]">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ember-50 text-ember-600 transition-colors group-hover:bg-[image:var(--gradient-ember)] group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
