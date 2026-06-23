"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogExperience } from "@/lib/catalog";
import { formatTime } from "@/lib/catalog";
import {
  type BookingSelection,
  upcomingDates,
  clampParticipants,
} from "@/lib/booking";

/**
 * Controlled date / time-slot / participant fields. Shared by the detail-page
 * booking panel and the add-to-cart bottom sheet so selection behaves
 * identically everywhere.
 */
export function BookingFields({
  experience,
  value,
  onChange,
  idPrefix = "booking",
}: {
  experience: CatalogExperience;
  value: BookingSelection;
  onChange: (next: BookingSelection) => void;
  idPrefix?: string;
}) {
  const dates = useMemo(() => upcomingDates(14), []);

  const setParticipants = (n: number) =>
    onChange({ ...value, participants: clampParticipants(n, experience) });

  // Hover arrows for the date strip — purely an affordance; the row also
  // swipes (touch) and is keyboard-navigable via the radios.
  const dateRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateDateEdges = useCallback(() => {
    const el = dateRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = dateRef.current;
    if (!el) return;
    updateDateEdges();
    el.addEventListener("scroll", updateDateEdges, { passive: true });
    window.addEventListener("resize", updateDateEdges);
    return () => {
      el.removeEventListener("scroll", updateDateEdges);
      window.removeEventListener("resize", updateDateEdges);
    };
  }, [updateDateEdges]);

  const scrollDates = (dir: 1 | -1) => {
    const el = dateRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.7, 160), behavior: "smooth" });
  };

  return (
    <div className="min-w-0 space-y-6">
      {/* Date */}
      <fieldset className="group/dates min-w-0">
        <legend className="mb-2 text-sm font-semibold">Choose a date</legend>
        <div className="relative">
          <div
            ref={dateRef}
            className="no-scrollbar -mx-1 flex w-[calc(100%+0.5rem)] min-w-0 gap-2 overflow-x-auto px-1 pb-1"
            role="radiogroup"
            aria-label="Booking date"
          >
            {dates.map((d) => {
            const selected = value.dateISO === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange({ ...value, dateISO: d.iso })}
                className={cn(
                  "flex min-w-[58px] shrink-0 flex-col items-center rounded-xl border px-3 py-2 text-center transition-colors",
                  selected
                    ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border bg-card hover:border-foreground/30"
                )}
              >
                <span className="text-[11px] font-medium opacity-80">
                  {d.isToday ? "Today" : d.weekday}
                </span>
                <span className="text-lg font-bold leading-none">{d.day}</span>
                <span className="text-[11px] opacity-80">{d.month}</span>
              </button>
            );
          })}
          </div>

          {/* Edge fade + hover arrows (mouse affordance; hidden on touch) */}
          {canPrev && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-card to-transparent" aria-hidden />
              <button
                type="button"
                tabIndex={-1}
                aria-label="Earlier dates"
                onClick={() => scrollDates(-1)}
                className="absolute left-0 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground opacity-0 shadow-[var(--shadow-soft)] transition-opacity hover:bg-muted group-hover/dates:opacity-100"
              >
                <ChevronLeft className="size-4" />
              </button>
            </>
          )}
          {canNext && (
            <>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-card to-transparent" aria-hidden />
              <button
                type="button"
                tabIndex={-1}
                aria-label="Later dates"
                onClick={() => scrollDates(1)}
                className="absolute right-0 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground opacity-0 shadow-[var(--shadow-soft)] transition-opacity hover:bg-muted group-hover/dates:opacity-100"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
        </div>
      </fieldset>

      {/* Time slot */}
      {experience.slots.length > 0 && (
        <fieldset className="min-w-0">
          <legend className="mb-2 text-sm font-semibold">Pick a time</legend>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Time slot">
            {experience.slots.map((s) => {
              const selected = value.slotId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange({ ...value, slotId: s.id })}
                  className={cn(
                    "flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-colors",
                    selected
                      ? "border-primary bg-ember-50 text-foreground"
                      : "border-border bg-card hover:border-foreground/30"
                  )}
                >
                  <span className="text-sm font-bold">{formatTime(s.startTime)}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Participants */}
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold">
          Participants
          <span className="ml-1 font-normal text-muted-foreground">
            ({experience.minParticipants}–{experience.maxParticipants})
          </span>
        </legend>
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2">
          <span className="text-sm text-muted-foreground">Riders</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease participants"
              disabled={value.participants <= experience.minParticipants}
              onClick={() => setParticipants(value.participants - 1)}
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <span
              className="w-8 text-center font-display text-xl font-bold tabular-nums"
              aria-live="polite"
              id={`${idPrefix}-participants`}
            >
              {value.participants}
            </span>
            <button
              type="button"
              aria-label="Increase participants"
              disabled={value.participants >= experience.maxParticipants}
              onClick={() => setParticipants(value.participants + 1)}
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
