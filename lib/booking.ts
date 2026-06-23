import type { CatalogExperience } from "./catalog";

export type BookingSelection = {
  dateISO: string; // "2026-06-21"
  slotId: string;
  participants: number;
};

export type UpcomingDate = {
  iso: string;
  weekday: string; // "Sat"
  day: string; // "21"
  month: string; // "Jun"
  isToday: boolean;
};

/** Next `count` bookable days starting today (client-side; local timezone). */
export function upcomingDates(count = 14): UpcomingDate[] {
  const out: UpcomingDate[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({
      iso: toISODate(d),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.toLocaleDateString("en-US", { day: "2-digit" }),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      isToday: i === 0,
    });
  }
  return out;
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "2026-06-21" → "Sat, 21 Jun". */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Clamp participants to the experience's min/max. */
export function clampParticipants(n: number, exp: Pick<CatalogExperience, "minParticipants" | "maxParticipants">) {
  return Math.max(exp.minParticipants, Math.min(exp.maxParticipants, n));
}

export function lineTotal(basePriceAed: number, participants: number) {
  return basePriceAed * participants;
}

/** A sensible default selection: today, first slot, min participants. */
export function defaultSelection(exp: CatalogExperience): BookingSelection {
  return {
    dateISO: upcomingDates(1)[0].iso,
    slotId: exp.slots[0]?.id ?? "",
    participants: exp.minParticipants,
  };
}
