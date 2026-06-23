import type { Category, Difficulty } from "@/db/schema";

/** Slot as consumed by the UI (id is real UUID with DB, deterministic without). */
export type CatalogSlot = {
  id: string;
  startTime: string;
  label: string;
  capacity: number;
};

/** An experience joined with its slots — the unit the catalog/cart work with. */
export type CatalogExperience = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  basePriceAed: number;
  durationMins: number;
  difficulty: Difficulty;
  minParticipants: number;
  maxParticipants: number;
  location: string;
  heroImage: string;
  gallery: string[];
  included: string[];
  excluded: string[];
  vehicles: { model: string; cc: number }[];
  rating: string;
  reviewCount: number;
  featured: boolean;
  sortOrder: number;
  slots: CatalogSlot[];
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

/** Human-friendly duration ("30 min", "1h", "1h 30m", "6h"). */
export function formatDuration(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** "06:30" → "6:30 AM". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}
