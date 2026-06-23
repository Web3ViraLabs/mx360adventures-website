"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Category } from "@/db/schema";

export type CartItem = {
  /** Stable identity: same experience + date + slot collapses into one line. */
  key: string;
  experienceId: string;
  slug: string;
  title: string;
  category: Category;
  heroImage: string;
  slotId: string;
  slotLabel: string;
  slotStartTime: string;
  dateISO: string;
  participants: number;
  unitPriceAed: number;
  minParticipants: number;
  maxParticipants: number;
};

export function cartItemKey(experienceId: string, dateISO: string, slotId: string) {
  return `${experienceId}__${dateISO}__${slotId}`;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** Adds (or merges by participant count) a booking line. Returns the line key. */
  addItem: (item: Omit<CartItem, "key">) => string;
  removeItem: (key: string) => void;
  setParticipants: (key: string, participants: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (incoming) => {
        const key = cartItemKey(incoming.experienceId, incoming.dateISO, incoming.slotId);
        const items = get().items;
        const existing = items.find((i) => i.key === key);

        if (existing) {
          const participants = clamp(
            existing.participants + incoming.participants,
            incoming.minParticipants,
            incoming.maxParticipants
          );
          set({
            items: items.map((i) => (i.key === key ? { ...i, participants } : i)),
          });
        } else {
          set({ items: [...items, { ...incoming, key }] });
        }
        return key;
      },

      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),

      setParticipants: (key, participants) =>
        set({
          items: get().items.map((i) =>
            i.key === key
              ? { ...i, participants: clamp(participants, i.minParticipants, i.maxParticipants) }
              : i
          ),
        }),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "dsa-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Never persist drawer open state.
      partialize: (s) => ({ items: s.items }),
    }
  )
);

/* ---- Derived selectors (stable, no new refs) ---- */
export const selectCount = (s: CartState) =>
  s.items.reduce((n, i) => n + i.participants, 0);
export const selectLineCount = (s: CartState) => s.items.length;
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.unitPriceAed * i.participants, 0);
