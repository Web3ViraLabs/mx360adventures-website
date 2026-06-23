"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, CalendarDays } from "lucide-react";
import {
  useCart,
  selectSubtotal,
  selectCount,
  type CartItem,
} from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { formatDateLong } from "@/lib/booking";
import { formatTime } from "@/lib/catalog";
import { BLUR_DATA_URL } from "@/lib/images";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

function CartLine({ item }: { item: CartItem }) {
  const setParticipants = useCart((s) => s.setParticipants);
  const removeItem = useCart((s) => s.removeItem);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-3 overflow-hidden border-b border-border py-4 last:border-b-0"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-border">
        <Image
          src={item.heroImage}
          alt={item.title}
          fill
          sizes="80px"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-bold">{item.title}</h3>
          <button
            type="button"
            aria-label={`Remove ${item.title}`}
            onClick={() => removeItem(item.key)}
            className="-mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3" />
          {formatDateLong(item.dateISO)} · {formatTime(item.slotStartTime)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease riders"
              disabled={item.participants <= item.minParticipants}
              onClick={() => setParticipants(item.key, item.participants - 1)}
              className="grid size-7 place-items-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-5 text-center text-sm font-semibold tabular-nums">
              {item.participants}
            </span>
            <button
              type="button"
              aria-label="Increase riders"
              disabled={item.participants >= item.maxParticipants}
              onClick={() => setParticipants(item.key, item.participants + 1)}
              className="grid size-7 place-items-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <span className="font-display text-sm font-bold tabular-nums">
            {formatPrice(item.unitPriceAed * item.participants)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export function CartDrawer() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const count = useCart(selectCount);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        className={
          isDesktop
            ? "flex w-full flex-col gap-0 p-0 sm:max-w-md"
            : "flex max-h-[90svh] flex-col gap-0 rounded-t-3xl p-0"
        }
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="flex items-center gap-2 font-display text-lg">
            <ShoppingBag className="size-5 text-ember-600" />
            Your order
            {count > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review the adventures in your cart and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-secondary">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="font-display text-lg font-bold">Your order is empty</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Add a desert adventure and it'll show up here, ready to book.
            </p>
            <Button asChild className="mt-2" onClick={() => setOpen(false)}>
              <Link href="/adventures">Browse adventures</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-5">
              <ul>
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartLine key={item.key} item={item} />
                  ))}
                </AnimatePresence>
              </ul>
            </ScrollArea>

            <div className="border-t border-border bg-card px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl font-extrabold tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Taxes calculated at checkout.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-4 h-13 w-full text-base shadow-[var(--shadow-glow)]"
                onClick={() => setOpen(false)}
              >
                <Link href="/checkout">Checkout · {formatPrice(subtotal)}</Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-2 w-full py-2 text-center text-sm text-muted-foreground hover:text-foreground"
              >
                Continue browsing
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
