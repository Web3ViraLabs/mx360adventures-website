# Desert Storm Adventure

Production-grade Next.js storefront for a desert adventure tourism business —
bookable, time-slotted experiences (quad biking, dune buggies, MX, safaris,
combos) with a mobile-first, slide-to-confirm booking flow.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions) · React 19 · TypeScript (strict)
- **Tailwind CSS v4** + **shadcn/ui** — design tokens in [`app/globals.css`](app/globals.css)
- **Framer Motion** — parallax hero, scroll reveals, page transitions, slide-to-confirm
- **Zustand** (persisted cart) · **React Hook Form + Zod** (validation)
- **Stripe** Payment Intents + Payment Element (card, Apple Pay, Google Pay)
- **Supabase** Postgres via **Drizzle ORM**

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in keys (all optional to start — see below)
pnpm dev
```

The app runs **with no keys at all**: the catalog falls back to the typed seed
module in [`db/seed-data.ts`](db/seed-data.ts), and checkout shows a clear
"add Stripe keys" state until configured.

## Configuration

| Variable | Needed for |
|---|---|
| `DATABASE_URL` | Persisting orders/bookings to Supabase (catalog works without it) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Rendering the Payment Element |
| `STRIPE_SECRET_KEY` | Creating Payment Intents (server) |
| `STRIPE_WEBHOOK_SECRET` | Verifying the order-confirmation webhook |

### Database (optional)

```bash
pnpm db:push     # apply schema to Supabase Postgres
pnpm db:seed     # load the 10 sample adventures + time slots
pnpm db:studio   # browse data
```

When `DATABASE_URL` is set, the catalog reads from Postgres and checkout writes
real `orders` + `bookings`. When unset, everything runs off the seed module.

### Stripe webhook (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# paste the printed whsec_... into STRIPE_WEBHOOK_SECRET
```

`payment_intent.succeeded` marks the order `paid` and its bookings `confirmed`.

## Project structure

```
app/
  actions/checkout.ts          server action: reprice cart + create PaymentIntent
  api/stripe/webhook/route.ts  signed webhook → confirm order
  adventures/[category]/[slug] catalog: listing, category, detail (SSG)
  checkout/                    single-page checkout + success
  opengraph-image.tsx          dynamic social card · sitemap.ts · robots.ts
components/
  ui/                          shadcn primitives
  feature/                     cards, gallery, booking, cart, checkout, slide-to-confirm
  motion/                      reveal / staggered reveal
  layout/                      header, footer, container
db/                            Drizzle schema, queries (keyless-resilient), seed
lib/                           site config, env (Zod), catalog/booking/checkout helpers, store
```

## Notes

- Prices are **placeholder AED**, tiered by vehicle power — edit in `db/seed-data.ts`.
- Imagery uses verified Unsplash placeholders ([`lib/images.ts`](lib/images.ts)).
- `/styleguide` renders the live design-token preview.
- All motion respects `prefers-reduced-motion`; slide-to-confirm falls back to a
  tap button on non-touch / reduced-motion.
