import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Consistent section header: eyebrow + display title + optional subtitle.
 * Used across the site for a uniform editorial rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-muted-foreground", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
