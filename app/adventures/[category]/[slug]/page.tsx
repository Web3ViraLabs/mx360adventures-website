import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  X,
  Clock,
  Users,
  MapPin,
  ChevronRight,
  Gauge,
} from "lucide-react";
import { getAllExperiences, getExperienceBySlug } from "@/db/queries";
import { formatDuration, DIFFICULTY_LABEL, formatTime } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { RatingStars } from "@/components/feature/rating-stars";
import { DifficultyBadge } from "@/components/feature/difficulty-badge";
import { ExperienceGallery } from "@/components/feature/experience-gallery";
import { BookingPanel } from "@/components/feature/booking/booking-panel";
import { MobileBookingBar } from "@/components/feature/booking/mobile-booking-bar";

type Params = { category: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllExperiences();
  return all.map((e) => ({ category: e.category, slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = await getExperienceBySlug(slug);
  if (!exp) return {};
  return {
    title: exp.title,
    description: exp.shortDescription,
    alternates: { canonical: `/adventures/${exp.category}/${exp.slug}` },
    openGraph: {
      title: exp.title,
      description: exp.shortDescription,
      images: [{ url: exp.heroImage, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;
  const exp = await getExperienceBySlug(slug);
  if (!exp || exp.category !== category) notFound();

  const images = [exp.heroImage, ...exp.gallery];

  // Product JSON-LD for rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: exp.title,
    description: exp.shortDescription,
    image: images,
    brand: { "@type": "Brand", name: siteConfig.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: exp.rating,
      reviewCount: exp.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: exp.basePriceAed,
      priceCurrency: siteConfig.currency,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/adventures/${exp.category}/${exp.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pb-28 pt-24 lg:pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/adventures" className="hover:text-foreground">Adventures</Link>
          <ChevronRight className="size-4" />
          <Link href={`/adventures/${exp.category}`} className="capitalize hover:text-foreground">
            {exp.category}
          </Link>
          <ChevronRight className="size-4" />
          <span className="truncate text-foreground">{exp.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_24rem]">
          {/* LEFT — media + content (dominant) */}
          <div className="min-w-0">
            <Reveal>
              <ExperienceGallery images={images} title={exp.title} />
            </Reveal>

            <div className="mt-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-ember-600">
                {exp.tagline}
              </p>
              <h1 className="mt-1.5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {exp.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <RatingStars rating={exp.rating} reviewCount={exp.reviewCount} />
                <DifficultyBadge level={exp.difficulty} />
              </div>

              {/* Quick facts */}
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { Icon: Clock, label: "Duration", value: formatDuration(exp.durationMins) },
                  { Icon: Users, label: "Group", value: `${exp.minParticipants}–${exp.maxParticipants}` },
                  { Icon: Gauge, label: "Level", value: DIFFICULTY_LABEL[exp.difficulty] },
                  { Icon: MapPin, label: "Location", value: exp.location.split(",")[0] },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="rounded-xl border border-border bg-card p-3">
                    <Icon className="size-4 text-ember-600" />
                    <dt className="mt-1.5 text-xs text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Description */}
              <div className="mt-8">
                <h2 className="font-display text-xl font-bold">About this ride</h2>
                <p className="mt-3 leading-relaxed text-foreground/90">{exp.longDescription}</p>
              </div>

              {/* Vehicles */}
              {exp.vehicles.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-xl font-bold">The machines</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.vehicles.map((v, i) => (
                      <span
                        key={`${v.model}-${v.cc}-${i}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium"
                      >
                        <Gauge className="size-3.5 text-ember-600" />
                        {v.model} <span className="text-muted-foreground">{v.cc}cc</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Included / excluded */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="font-display text-lg font-bold">What's included</h2>
                  <ul className="mt-3 space-y-2">
                    {exp.included.map((item) => (
                      <li key={item} className="flex gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {exp.excluded.length > 0 && (
                  <div>
                    <h2 className="font-display text-lg font-bold">Not included</h2>
                    <ul className="mt-3 space-y-2">
                      {exp.excluded.map((item) => (
                        <li key={item} className="flex gap-2 text-sm">
                          <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Departure times */}
              {exp.slots.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-bold">Daily departures</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.slots.map((s) => (
                      <span
                        key={s.id}
                        className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm"
                      >
                        <span className="font-semibold">{formatTime(s.startTime)}</span>
                        <span className="ml-1.5 text-muted-foreground">{s.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — sticky booking panel (desktop) */}
          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-24 min-w-0">
              <BookingPanel experience={exp} />
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile sticky bar + bottom sheet */}
      <MobileBookingBar experience={exp} />
    </>
  );
}
