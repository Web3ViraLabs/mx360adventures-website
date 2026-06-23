import { cn } from "@/lib/utils";
import { DIFFICULTY_LABEL } from "@/lib/catalog";
import type { Difficulty } from "@/db/schema";

const STYLES: Record<Difficulty, string> = {
  beginner: "text-emerald-700 bg-emerald-50 border-emerald-200",
  intermediate: "text-sand-700 bg-sand-100 border-sand-300",
  advanced: "text-ember-700 bg-ember-50 border-ember-200",
  expert: "text-red-700 bg-red-50 border-red-200",
};

const BARS: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export function DifficultyBadge({
  level,
  className,
}: {
  level: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        STYLES[level],
        className
      )}
    >
      <span className="flex items-end gap-px" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "w-0.5 rounded-full bg-current",
              i < BARS[level] ? "opacity-100" : "opacity-25"
            )}
            style={{ height: `${5 + i * 2}px` }}
          />
        ))}
      </span>
      {DIFFICULTY_LABEL[level]}
    </span>
  );
}
