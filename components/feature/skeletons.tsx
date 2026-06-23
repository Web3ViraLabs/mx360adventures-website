import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export function ExperienceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function AdventuresGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Container className="py-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ExperienceCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}

export function ListingHeaderSkeleton() {
  return (
    <section className="border-b border-border bg-secondary/30 pt-24 pb-8">
      <Container className="space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-80" />
        <div className="flex gap-2 pt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </Container>
    </section>
  );
}
