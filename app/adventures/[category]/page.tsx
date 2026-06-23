import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperiencesByCategory } from "@/db/queries";
import { categories } from "@/lib/site";
import type { Category } from "@/db/schema";
import { Container } from "@/components/layout/container";
import { CategoryPills } from "@/components/feature/category-pills";
import { AdventuresGrid } from "@/components/feature/adventures-grid";

type Params = { category: string };

const CATEGORY_SLUGS = categories.map((c) => c.slug);

function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function generateStaticParams(): Params[] {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} in the Dubai Desert`,
    description: cat.blurb,
    alternates: { canonical: `/adventures/${cat.slug}` },
    openGraph: { title: `${cat.name} · Desert Storm Adventure`, description: cat.blurb },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();

  const experiences = await getExperiencesByCategory(cat.slug as Category);

  return (
    <>
      <section className="border-b border-border bg-secondary/30 pt-24 pb-8">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-ember-600">
            {cat.tagline}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
            {cat.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{cat.blurb}</p>
          <div className="mt-6">
            <CategoryPills active={cat.slug} />
          </div>
        </Container>
      </section>

      <AdventuresGrid experiences={experiences} />
    </>
  );
}
