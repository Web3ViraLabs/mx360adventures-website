import type { Metadata } from "next";
import { getAllExperiences } from "@/db/queries";
import { Container } from "@/components/layout/container";
import { CategoryPills } from "@/components/feature/category-pills";
import { AdventuresGrid } from "@/components/feature/adventures-grid";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Desert Adventures",
  description:
    "Browse every desert experience — quad biking, dune buggies, MX, sunset safaris and combo packages in the Dubai desert.",
  alternates: { canonical: "/adventures" },
};

export default async function AdventuresPage() {
  const experiences = await getAllExperiences();

  return (
    <>
      <section className="border-b border-border bg-secondary/30 pt-24 pb-8">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-ember-600">
            {siteConfig.shortName}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
            All adventures
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {experiences.length} experiences across the dunes. Filter by ride, then
            slide to book.
          </p>
          <div className="mt-6">
            <CategoryPills active={null} />
          </div>
        </Container>
      </section>

      <AdventuresGrid experiences={experiences} />
    </>
  );
}
