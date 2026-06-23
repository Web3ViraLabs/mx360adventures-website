"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";
import type { CatalogExperience } from "@/lib/catalog";
import { formatDuration } from "@/lib/catalog";
import { formatPrice, cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/images";
import { RatingStars } from "./rating-stars";
import { DifficultyBadge } from "./difficulty-badge";

export function ExperienceCard({
  experience,
  className,
  priority = false,
}: {
  experience: CatalogExperience;
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const href = `/adventures/${experience.category}/${experience.slug}`;

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lifted)]",
        className
      )}
    >
      <Link href={href} className="flex flex-1 flex-col focus:outline-none">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={experience.heroImage}
            alt={experience.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/70 via-midnight-900/10 to-transparent" />
          <div className="absolute left-3 top-3">
            <DifficultyBadge level={experience.difficulty} />
          </div>
          {experience.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-[image:var(--gradient-ember)] px-2.5 py-1 text-xs font-bold text-white shadow-[var(--shadow-glow)]">
              Featured
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
            <RatingStars
              rating={experience.rating}
              reviewCount={experience.reviewCount}
              className="text-white [&_.text-muted-foreground]:text-white/70"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ember-600">
            {experience.tagline}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-tight">
            {experience.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {experience.shortDescription}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {formatDuration(experience.durationMins)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" /> {experience.minParticipants}–{experience.maxParticipants}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {experience.location.split(",")[0]}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
            <div>
              <span className="text-xs text-muted-foreground">from</span>
              <p className="font-display text-xl font-bold text-foreground">
                {formatPrice(experience.basePriceAed)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
              </p>
            </div>
            <span className="rounded-full bg-foreground/5 px-3 py-1.5 text-sm font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              Book
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
