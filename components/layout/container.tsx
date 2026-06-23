import { cn } from "@/lib/utils";

/** Consistent max-width gutter wrapper used across all sections. */
export function Container({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Comp className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </Comp>
  );
}
