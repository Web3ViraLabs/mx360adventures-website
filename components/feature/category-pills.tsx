import Link from "next/link";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/site";

/** Horizontal, thumb-scrollable category filter. `active` may be a slug or null (=All). */
export function CategoryPills({ active }: { active: string | null }) {
  const items = [{ slug: null as string | null, name: "All" }, ...categories];
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      {items.map((c) => {
        const href = c.slug ? `/adventures/${c.slug}` : "/adventures";
        const isActive = active === c.slug;
        return (
          <Link
            key={c.slug ?? "all"}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "border-transparent bg-foreground text-background"
                : "border-border bg-card text-foreground/80 hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {c.name}
          </Link>
        );
      })}
    </div>
  );
}
