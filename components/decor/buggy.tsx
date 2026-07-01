import { cn } from "@/lib/utils";

/**
 * Stylised dune-buggy silhouette (side profile) for use as a decorative,
 * bleed-off-the-edge accent. Uses currentColor, so tint it via `text-*`.
 */
export function BuggySilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 320"
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(className)}
    >
      {/* wheels */}
      <circle cx="150" cy="230" r="68" />
      <circle cx="150" cy="230" r="26" />
      <circle cx="430" cy="230" r="68" />
      <circle cx="430" cy="230" r="26" />
      {/* body + roll cage */}
      <path d="M78 210 C82 158 104 138 156 134 L214 134 L250 80 L372 80 L410 136 L486 146 C512 154 512 188 506 208" />
      {/* cage braces */}
      <path d="M250 80 L306 134" />
      <path d="M372 80 L318 134" />
      <path d="M214 134 L214 192" />
      <path d="M410 136 L410 192" />
      {/* floor pan */}
      <path d="M214 200 L410 200" />
      {/* headlight */}
      <circle cx="476" cy="170" r="7" fill="currentColor" stroke="none" />
    </svg>
  );
}
