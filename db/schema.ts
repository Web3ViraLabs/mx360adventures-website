import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
  numeric,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* ----------------------------------------------------------------------------
   Enums
---------------------------------------------------------------------------- */
export const categoryEnum = pgEnum("category", [
  "quad",
  "buggy",
  "mx",
  "safari",
  "combo",
]);

export const difficultyEnum = pgEnum("difficulty", [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
  "cancelled",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "held",
  "confirmed",
  "cancelled",
]);

/* ----------------------------------------------------------------------------
   experiences — one bookable desert adventure
---------------------------------------------------------------------------- */
export const experiences = pgTable(
  "experiences",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    category: categoryEnum("category").notNull(),
    tagline: text("tagline").notNull(),
    shortDescription: text("short_description").notNull(),
    longDescription: text("long_description").notNull(),

    // Whole-AED price per participant/rider. Stripe amount = ×100 (fils).
    basePriceAed: integer("base_price_aed").notNull(),
    durationMins: integer("duration_mins").notNull(),
    difficulty: difficultyEnum("difficulty").notNull(),
    minParticipants: integer("min_participants").notNull().default(1),
    maxParticipants: integer("max_participants").notNull().default(6),
    location: text("location").notNull().default("Dubai Desert"),

    heroImage: text("hero_image").notNull(),
    gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
    included: jsonb("included").$type<string[]>().notNull().default([]),
    excluded: jsonb("excluded").$type<string[]>().notNull().default([]),
    // Vehicles offered for this experience: [{ model, cc }]
    vehicles: jsonb("vehicles").$type<{ model: string; cc: number }[]>().notNull().default([]),

    rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("5.0"),
    reviewCount: integer("review_count").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("experiences_slug_uq").on(t.slug),
    index("experiences_category_idx").on(t.category),
  ]
);

/* ----------------------------------------------------------------------------
   time_slots — recurring daily departure times for an experience
---------------------------------------------------------------------------- */
export const timeSlots = pgTable(
  "time_slots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => experiences.id, { onDelete: "cascade" }),
    // "06:00" 24h local time
    startTime: text("start_time").notNull(),
    label: text("label").notNull(), // e.g. "Sunrise", "Golden hour"
    capacity: integer("capacity").notNull().default(12),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("time_slots_experience_idx").on(t.experienceId)]
);

/* ----------------------------------------------------------------------------
   orders — one checkout / payment intent (guest checkout, no account)
---------------------------------------------------------------------------- */
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    status: orderStatusEnum("status").notNull().default("pending"),

    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),

    subtotalAed: integer("subtotal_aed").notNull(),
    totalAed: integer("total_aed").notNull(),
    currency: text("currency").notNull().default("AED"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("orders_pi_uq").on(t.stripePaymentIntentId),
    index("orders_email_idx").on(t.customerEmail),
  ]
);

/* ----------------------------------------------------------------------------
   bookings — line items within an order (a date+slot+participants reservation)
---------------------------------------------------------------------------- */
export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => experiences.id, { onDelete: "restrict" }),
    slotId: uuid("slot_id")
      .notNull()
      .references(() => timeSlots.id, { onDelete: "restrict" }),

    // Denormalised snapshot so historical orders survive catalog edits.
    experienceTitle: text("experience_title").notNull(),
    slotLabel: text("slot_label").notNull(),
    slotStartTime: text("slot_start_time").notNull(),

    bookingDate: date("booking_date").notNull(),
    participants: integer("participants").notNull(),
    unitPriceAed: integer("unit_price_aed").notNull(),
    lineTotalAed: integer("line_total_aed").notNull(),

    status: bookingStatusEnum("status").notNull().default("held"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("bookings_order_idx").on(t.orderId),
    index("bookings_experience_date_idx").on(t.experienceId, t.bookingDate),
  ]
);

/* ----------------------------------------------------------------------------
   Relations
---------------------------------------------------------------------------- */
export const experiencesRelations = relations(experiences, ({ many }) => ({
  timeSlots: many(timeSlots),
  bookings: many(bookings),
}));

export const timeSlotsRelations = relations(timeSlots, ({ one, many }) => ({
  experience: one(experiences, {
    fields: [timeSlots.experienceId],
    references: [experiences.id],
  }),
  bookings: many(bookings),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  order: one(orders, { fields: [bookings.orderId], references: [orders.id] }),
  experience: one(experiences, {
    fields: [bookings.experienceId],
    references: [experiences.id],
  }),
  slot: one(timeSlots, { fields: [bookings.slotId], references: [timeSlots.id] }),
}));

/* ----------------------------------------------------------------------------
   Inferred types
---------------------------------------------------------------------------- */
export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
export type TimeSlot = typeof timeSlots.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Category = (typeof categoryEnum.enumValues)[number];
export type Difficulty = (typeof difficultyEnum.enumValues)[number];
