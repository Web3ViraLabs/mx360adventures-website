---
name: coolify-ops
description: Deploy and operate the Desert Storm Adventure (mx360) Next.js site on Coolify (AWS). Use when deploying or redeploying, configuring environment variables, registering the Stripe webhook, setting up the database, or DEBUGGING a production / Coolify issue (5xx, crash, failed build, "site is down"). For live server investigation it dispatches the `devops` subagent over SSH.
---

# Coolify Ops — Desert Storm Adventure (mx360)

Runbook for deploying and operating this app on **Coolify** (self-hosted) on **AWS**.
App: Next.js 16 (App Router, Server Actions) · pnpm · Nixpacks · port **3000**.
Repo: `Web3ViraLabs/mx360adventures-website` · branch `main`.

The app is **keyless-resilient**: it builds and runs with zero env vars (catalog
served from the seed module; checkout shows an "add Stripe keys" state). So you can
deploy first, then layer in configuration.

## Connection details
SSH + Coolify info live in `.claude/devops.local.json` (gitignored; template at
`.claude/devops.example.json`). For any **live debugging**, spawn the **`devops`
subagent** — it reads that config, SSHes in, and returns an evidence-based report.
Don't SSH ad-hoc from the main loop for anything non-trivial; delegate to `devops`.

## Deploy checklist (Coolify UI)
1. **Build pack:** Nixpacks. **Port:** 3000. **"Static site": OFF** (needs a Node
   server for Server Actions + the Stripe webhook route).
2. **Node version:** repo pins Node ≥20.9 via `.nvmrc` (22) + `engines` — required,
   since Nixpacks may otherwise default to Node 18 and fail the build. Belt-and-
   suspenders: set Coolify env `NIXPACKS_NODE_VERSION=22`.
3. **Domain:** set the app FQDN in Coolify (auto Let's Encrypt SSL). HTTPS is
   mandatory for Stripe / Apple Pay / the webhook.

## Environment variables
Set in Coolify → app → Environment Variables. **`.env` is gitignored**, so nothing
is inherited from the repo — add them here.

⚠️ **`NEXT_PUBLIC_*` are inlined at BUILD time.** In Coolify mark each as a
**Build Variable / available at build**, or the Payment Element & Supabase client
won't receive them.

| Var | Build-time | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | live domain (canonical/sitemap/OG) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | `pk_live_…` / `pk_test_…` |
| `STRIPE_SECRET_KEY` | runtime | `sk_…` |
| `STRIPE_WEBHOOK_SECRET` | runtime | from webhook step |
| `DATABASE_URL` | build* | Supabase pooled (Transaction, :6543) — optional |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | optional |
| `SUPABASE_SERVICE_ROLE_KEY` | runtime | optional |

\* If `DATABASE_URL` is set it must be reachable **at build time** — catalog pages are
SSG and query the DB during prerender. Invalid/placeholder values are safely ignored
(`lib/env.ts` drops them with a warning → seed fallback), so a bad value won't crash
the build, but a *valid-but-unreachable* DB will. To use a live DB without rebuilding
on every content change, switch the catalog pages to ISR (`export const revalidate`).

## Stripe webhook (after first deploy)
1. Stripe Dashboard → Developers → Webhooks → Add endpoint:
   `https://<domain>/api/stripe/webhook`
2. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`.
3. Copy `whsec_…` → set `STRIPE_WEBHOOK_SECRET` → redeploy.
4. Apple Pay: register the domain under Stripe → Payment Method domains.

## Database (optional)
Leave `DATABASE_URL` unset → runs on the 10 seed adventures (full catalog + cart).
With Supabase: set `DATABASE_URL`, then once: `pnpm db:push && pnpm db:seed`.

## AWS host sizing
Next 16 + Turbopack build is memory-heavy → OOM on small instances. Use ≥2 GB RAM
or add swap. Security group: open inbound 80/443.

## Debugging a production issue
Dispatch the **`devops`** subagent with the symptom (e.g. "site returns 502",
"deploy failed", "checkout 500s"). It will SSH in, find the Coolify container,
pull logs/resources/routing/env (secrets redacted), and return root cause + a
precise fix. Common causes it checks: OOMKilled, Node-version build failure,
missing build-time `NEXT_PUBLIC_*`, unreachable `DATABASE_URL`, Traefik/SSL routing,
crash-loop on a bad env var. Apply code-level fixes via git → redeploy; apply
server/config fixes only after confirming with the user.
