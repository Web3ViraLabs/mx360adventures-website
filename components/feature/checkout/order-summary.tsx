"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useCart, selectSubtotal } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { formatDateLong } from "@/lib/booking";
import { formatTime } from "@/lib/catalog";
import { BLUR_DATA_URL } from "@/lib/images";
import { VAT_RATE, type OrderTotals } from "@/lib/checkout";

/**
 * Order summary. By default it reflects the live cart; pass `lockedTotals`
 * during the payment step so the displayed amount matches the PaymentIntent.
 */
export function OrderSummary({ lockedTotals }: { lockedTotals?: OrderTotals }) {
  const items = useCart((s) => s.items);
  const liveSubtotal = useCart(selectSubtotal);

  const subtotal = lockedTotals?.subtotalAed ?? liveSubtotal;
  const vat = lockedTotals?.vatAed ?? Math.round(liveSubtotal * VAT_RATE);
  const total = lockedTotals?.totalAed ?? subtotal + vat;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <h2 className="font-display text-lg font-bold">Order summary</h2>

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.key} className="flex gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image
                src={item.heroImage}
                alt={item.title}
                fill
                sizes="64px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {item.participants}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-semibold">{item.title}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3" />
                {formatDateLong(item.dateISO)} · {formatTime(item.slotStartTime)}
              </p>
            </div>
            <span className="text-sm font-semibold tabular-nums">
              {formatPrice(item.unitPriceAed * item.participants)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">VAT (5%)</dt>
          <dd className="tabular-nums">{formatPrice(vat)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-extrabold">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
