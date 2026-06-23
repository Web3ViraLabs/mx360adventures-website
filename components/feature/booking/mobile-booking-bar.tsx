"use client";

import { useState } from "react";
import type { CatalogExperience } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookingPanel } from "./booking-panel";

/**
 * Thumb-friendly sticky bar (mobile/tablet only). Tapping "Book" opens a bottom
 * sheet with the full date/time/participant selector + slide-to-add.
 */
export function MobileBookingBar({ experience }: { experience: CatalogExperience }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <div>
            <span className="text-xs text-muted-foreground">from</span>
            <p className="font-display text-xl font-bold leading-none">
              {formatPrice(experience.basePriceAed)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
            </p>
          </div>
          <Button size="lg" className="h-12 flex-1 max-w-[60%] text-base" onClick={() => setOpen(true)}>
            Book now
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[92svh] rounded-t-3xl p-0">
          <SheetHeader className="px-5 pt-5 text-left">
            <SheetTitle className="font-display text-xl">{experience.title}</SheetTitle>
            <SheetDescription>Choose your date, time and riders.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="max-h-[72svh] px-5 pb-8 pt-2">
            <BookingPanel experience={experience} compact onAdded={() => setOpen(false)} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
