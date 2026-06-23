import { z } from "zod";

/**
 * Centralised, resilient environment access.
 *
 * Validation NEVER throws at module load: a present-but-invalid value (e.g. the
 * placeholder `DATABASE_URL` copied from .env.example, or a fake Stripe key) is
 * dropped to `undefined` with a warning, so the app falls back to seed data /
 * the "add keys" checkout state instead of crashing the build. Real secrets are
 * required only at the point of use via `requireEnv`.
 */

// A usable Postgres URL — rejects the bracketed `[PASSWORD]@[HOST]` placeholder.
const databaseUrl = z
  .string()
  .refine((v) => /^postgres(ql)?:\/\//i.test(v) && !v.includes("["), "Not a usable Postgres URL");

// Real Stripe keys are long; min length filters out the `..._xxx` placeholders.
const serverShape = {
  DATABASE_URL: databaseUrl.optional(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").min(20).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").min(20).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
} as const;

const clientShape = {
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_").min(20).optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
} as const;

/**
 * Validate each field independently. A field that's set but invalid is coerced
 * to `undefined` (with a warning) rather than failing the whole object.
 */
function cleanEnv<S extends Record<string, z.ZodTypeAny>>(
  shape: S,
  raw: Record<keyof S, string | undefined>
): { [K in keyof S]: z.infer<S[K]> } {
  const out = {} as { [K in keyof S]: z.infer<S[K]> };
  for (const key in shape) {
    const value = raw[key];
    const result = shape[key].safeParse(value);
    if (result.success) {
      out[key] = result.data;
    } else {
      out[key] = undefined as z.infer<S[typeof key]>;
      if (value !== undefined && value !== "") {
        console.warn(`[env] Ignoring invalid ${key} (${result.error.issues[0]?.message ?? "invalid"}).`);
      }
    }
  }
  return out;
}

export const serverEnv = cleanEnv(serverShape, {
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

export const clientEnv = cleanEnv(clientShape, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

/** Throw a descriptive error when a required server secret is missing at use-time. */
export function requireEnv<T>(value: T | undefined | null, name: string): T {
  if (value === undefined || value === null || value === "") {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local (see .env.example).`
    );
  }
  return value;
}
