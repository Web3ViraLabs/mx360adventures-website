import "server-only";
import { asc } from "drizzle-orm";
import { serverEnv } from "@/lib/env";
import type { CatalogExperience, CatalogSlot } from "@/lib/catalog";
import type { Category } from "./schema";
import {
  seedExperiences,
  fallbackExperienceId,
  fallbackSlotId,
  type SeedExperience,
} from "./seed-data";

/**
 * Keyless-resilient catalog access. When DATABASE_URL is set we read from
 * Supabase via Drizzle; otherwise we fall back to the typed seed module so the
 * whole site runs before any keys are added. Both paths return CatalogExperience.
 */
export function hasDatabase() {
  return Boolean(serverEnv.DATABASE_URL);
}

function seedToCatalog(s: SeedExperience): CatalogExperience {
  const { slots, ...rest } = s;
  return {
    ...rest,
    id: fallbackExperienceId(s.slug),
    slots: slots
      .map<CatalogSlot>((slot) => ({
        id: fallbackSlotId(s.slug, slot.startTime),
        startTime: slot.startTime,
        label: slot.label,
        capacity: slot.capacity,
      }))
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  };
}

async function dbAllExperiences(): Promise<CatalogExperience[]> {
  // Imported lazily so the seed-only path never touches the postgres driver.
  const { db } = await import("./index");
  const { experiences, timeSlots } = await import("./schema");

  const rows = await db.query.experiences.findMany({
    with: { timeSlots: { orderBy: [asc(timeSlots.startTime)] } },
    orderBy: [asc(experiences.sortOrder)],
  });

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    tagline: r.tagline,
    shortDescription: r.shortDescription,
    longDescription: r.longDescription,
    basePriceAed: r.basePriceAed,
    durationMins: r.durationMins,
    difficulty: r.difficulty,
    minParticipants: r.minParticipants,
    maxParticipants: r.maxParticipants,
    location: r.location,
    heroImage: r.heroImage,
    gallery: r.gallery,
    included: r.included,
    excluded: r.excluded,
    vehicles: r.vehicles,
    rating: r.rating,
    reviewCount: r.reviewCount,
    featured: r.featured,
    sortOrder: r.sortOrder,
    slots: r.timeSlots.map((t) => ({
      id: t.id,
      startTime: t.startTime,
      label: t.label,
      capacity: t.capacity,
    })),
  }));
}

export async function getAllExperiences(): Promise<CatalogExperience[]> {
  if (!hasDatabase()) {
    return [...seedExperiences].sort((a, b) => a.sortOrder - b.sortOrder).map(seedToCatalog);
  }
  return dbAllExperiences();
}

export async function getFeaturedExperiences(): Promise<CatalogExperience[]> {
  return (await getAllExperiences()).filter((e) => e.featured);
}

export async function getExperiencesByCategory(category: Category): Promise<CatalogExperience[]> {
  return (await getAllExperiences()).filter((e) => e.category === category);
}

export async function getExperienceBySlug(slug: string): Promise<CatalogExperience | null> {
  return (await getAllExperiences()).find((e) => e.slug === slug) ?? null;
}

/** Look up a single experience + slot by id (used to validate cart/checkout). */
export async function getExperienceById(id: string): Promise<CatalogExperience | null> {
  return (await getAllExperiences()).find((e) => e.id === id) ?? null;
}
