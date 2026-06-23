"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import type { CatalogExperience } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import {
  type BookingSelection,
  defaultSelection,
  formatDateLong,
  lineTotal,
} from "@/lib/booking";
import { formatTime } from "@/lib/catalog";
import { useCart } from "@/lib/store/cart";
import { BookingFields } from "./booking-fields";
import { SlideToConfirm } from "@/components/feature/slide-to-confirm";

export function BookingPanel({
  experience,
  onAdded,
  compact = false,
}: {
  experience: CatalogExperience;
  /** Called after a successful add (e.g. to close the mobile sheet). */
  onAdded?: () => void;
  compact?: boolean;
}) {
  const [selection, setSelection] = useState<BookingSelection>(() =>
    defaultSelection(experience)
  );
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const total = lineTotal(experience.basePriceAed, selection.participants);
  const slot = useMemo(
    () => experience.slots.find((s) => s.id === selection.slotId) ?? experience.slots[0],
    [experience.slots, selection.slotId]
  );

  const canBook = Boolean(selection.dateISO && slot);

  const handleConfirm = () => {
    if (!slot) return;
    addItem({
      experienceId: experience.id,
      slug: experience.slug,
      title: experience.title,
      category: experience.category,
      heroImage: experience.heroImage,
      slotId: slot.id,
      slotLabel: slot.label,
      slotStartTime: slot.startTime,
      dateISO: selection.dateISO,
      participants: selection.participants,
      unitPriceAed: experience.basePriceAed,
      minParticipants: experience.minParticipants,
      maxParticipants: experience.maxParticipants,
    });
    toast.success("Added to your order", {
      description: `${experience.title} · ${formatDateLong(selection.dateISO)} · ${formatTime(slot.startTime)}`,
      action: { label: "View cart", onClick: openCart },
    });
    onAdded?.();
  };

  return (
    <div className={compact ? "min-w-0" : "min-w-0 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"}>
      {!compact && (
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-muted-foreground">from</span>
            <p className="font-display text-3xl font-extrabold">
              {formatPrice(experience.basePriceAed)}
              <span className="ml-1 text-sm font-normal text-muted-foreground">/ person</span>
            </p>
          </div>
        </div>
      )}

      <BookingFields experience={experience} value={selection} onChange={setSelection} />

      {/* Live total */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          <span>
            {formatDateLong(selection.dateISO)}
            {slot ? ` · ${formatTime(slot.startTime)}` : ""} · {selection.participants}{" "}
            {selection.participants === 1 ? "rider" : "riders"}
          </span>
        </div>
        <p className="font-display text-xl font-bold tabular-nums" aria-live="polite">
          {formatPrice(total)}
        </p>
      </div>

      <div className="mt-4">
        <SlideToConfirm
          label="Slide to add to cart"
          confirmedLabel="Added!"
          onConfirm={handleConfirm}
          disabled={!canBook}
        />
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Free rescheduling up to 24h before · Instant confirmation
      </p>
    </div>
  );
}
