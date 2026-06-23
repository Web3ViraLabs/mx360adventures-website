"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ExperienceCard } from "@/components/feature/experience-card";
import type { CatalogExperience } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * Featured experiences as a snap-scrolling carousel at every breakpoint:
 * thumb-swipeable on touch, with prev/next arrow controls on desktop and a
 * peek of the next card to signal that it scrolls.
 */
export function FeaturedRail({ experiences }: { experiences: CatalogExperience[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    // Scroll by one card width (first child) including the gap.
    const card = el.firstElementChild as HTMLElement | null;
    const gap = 16;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (!experiences.length) return null;

  return (
    <section className="overflow-x-hidden bg-secondary/30 py-20">
      <Container>
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-ember-600">
              Most booked
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Featured adventures
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop arrow controls */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="Previous adventures"
                onClick={() => scrollByCards(-1)}
                disabled={atStart}
                className={cn(
                  "grid size-10 place-items-center rounded-full border border-border bg-card transition-colors",
                  "hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-40"
                )}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next adventures"
                onClick={() => scrollByCards(1)}
                disabled={atEnd}
                className={cn(
                  "grid size-10 place-items-center rounded-full border border-border bg-card transition-colors",
                  "hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-40"
                )}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            <Link
              href="/adventures"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary sm:inline-flex"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* Carousel track — clipped to the page content width; scrolls within it */}
      <Container className="mt-8">
        <div
          ref={scroller}
          role="region"
          aria-label="Featured adventures carousel"
          className="no-scrollbar flex min-w-0 max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {experiences.map((e, i) => (
            <ExperienceCard
              key={e.id}
              experience={e}
              priority={i < 2}
              className="w-[78vw] shrink-0 snap-start sm:w-80 lg:w-84"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
