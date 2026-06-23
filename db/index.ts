import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { serverEnv, requireEnv } from "@/lib/env";

/**
 * Drizzle client over the Supabase Postgres pooled connection. Lazily
 * instantiated and cached on globalThis so dev hot-reloads don't open a new
 * pool on every change. Throws a clear error if DATABASE_URL is unset.
 */
declare global {
  var __dsa_db__: ReturnType<typeof createDb> | undefined;
}

function createDb() {
  const url = requireEnv(serverEnv.DATABASE_URL, "DATABASE_URL");
  const client = postgres(url, { prepare: false });
  return drizzle(client, { schema });
}

export const db = globalThis.__dsa_db__ ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalThis.__dsa_db__ = db;
}
