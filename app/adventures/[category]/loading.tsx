import { AdventuresGridSkeleton, ListingHeaderSkeleton } from "@/components/feature/skeletons";

export default function Loading() {
  return (
    <>
      <ListingHeaderSkeleton />
      <AdventuresGridSkeleton count={3} />
    </>
  );
}
