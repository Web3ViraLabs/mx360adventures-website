import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { categories } from "@/lib/site";
import { unsplash, PHOTOS, BLUR_DATA_URL } from "@/lib/images";

const CATEGORY_IMAGE: Record<string, string> = {
  quad: PHOTOS.offroad,
  buggy: PHOTOS.desertRoad,
  mx: PHOTOS.dunesShadow,
  safari: PHOTOS.camel,
  combo: PHOTOS.dunesAerial,
};

export function CategoriesGrid() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-ember-600">
            Choose your ride
          </p>
          <h2 className="mt-2 max-w-2xl text-balance font-display text-3xl font-bold sm:text-4xl">
            Five ways to take on the desert
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <RevealItem
              key={c.slug}
              className={i === 0 ? "lg:row-span-2" : undefined}
            >
              <Link
                href={`/adventures/${c.slug}`}
                className="group relative flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-2xl border border-border p-5 text-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lifted)]"
              >
                <Image
                  src={unsplash(CATEGORY_IMAGE[c.slug], 900, 70)}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/85 via-midnight-900/30 to-midnight-900/5" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ember-300">
                    {c.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{c.name}</h3>
                  <p className="mt-1.5 max-w-sm text-sm text-white/75">{c.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
