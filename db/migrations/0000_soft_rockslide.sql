CREATE TYPE "public"."booking_status" AS ENUM('held', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('quad', 'buggy', 'mx', 'safari', 'combo');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'failed', 'refunded', 'cancelled');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"experience_id" uuid NOT NULL,
	"slot_id" uuid NOT NULL,
	"experience_title" text NOT NULL,
	"slot_label" text NOT NULL,
	"slot_start_time" text NOT NULL,
	"booking_date" date NOT NULL,
	"participants" integer NOT NULL,
	"unit_price_aed" integer NOT NULL,
	"line_total_aed" integer NOT NULL,
	"status" "booking_status" DEFAULT 'held' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"category" "category" NOT NULL,
	"tagline" text NOT NULL,
	"short_description" text NOT NULL,
	"long_description" text NOT NULL,
	"base_price_aed" integer NOT NULL,
	"duration_mins" integer NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"min_participants" integer DEFAULT 1 NOT NULL,
	"max_participants" integer DEFAULT 6 NOT NULL,
	"location" text DEFAULT 'Dubai Desert' NOT NULL,
	"hero_image" text NOT NULL,
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"included" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"excluded" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"vehicles" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rating" numeric(2, 1) DEFAULT '5.0' NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stripe_payment_intent_id" text,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text NOT NULL,
	"subtotal_aed" integer NOT NULL,
	"total_aed" integer NOT NULL,
	"currency" text DEFAULT 'AED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "time_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experience_id" uuid NOT NULL,
	"start_time" text NOT NULL,
	"label" text NOT NULL,
	"capacity" integer DEFAULT 12 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_time_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."time_slots"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_order_idx" ON "bookings" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "bookings_experience_date_idx" ON "bookings" USING btree ("experience_id","booking_date");--> statement-breakpoint
CREATE UNIQUE INDEX "experiences_slug_uq" ON "experiences" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "experiences_category_idx" ON "experiences" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_pi_uq" ON "orders" USING btree ("stripe_payment_intent_id");--> statement-breakpoint
CREATE INDEX "orders_email_idx" ON "orders" USING btree ("customer_email");--> statement-breakpoint
CREATE INDEX "time_slots_experience_idx" ON "time_slots" USING btree ("experience_id");