import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviewCount,
  className,
  showCount = true,
}: {
  rating: string | number;
  reviewCount?: number;
  className?: string;
  showCount?: boolean;
}) {
  const value = typeof rating === "string" ? parseFloat(rating) : rating;
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <Star className="size-4 fill-ember-400 text-ember-400" aria-hidden />
      <span className="font-semibold tabular-nums">{value.toFixed(1)}</span>
      {showCount && reviewCount != null && (
        <span className="text-muted-foreground">({reviewCount})</span>
      )}
      <span className="sr-only">{value.toFixed(1)} out of 5 stars{reviewCount != null ? `, ${reviewCount} reviews` : ""}</span>
    </span>
  );
}
