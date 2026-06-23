import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { experiences, timeSlots } from "./schema";
import { seedExperiences } from "./seed-data";

/**
 * Idempotent-ish seed: wipes catalog tables and reinserts from seed-data.
 * Run with `pnpm db:seed` after `pnpm db:push` (requires DATABASE_URL).
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("✗ DATABASE_URL is not set. Add it to .env.local first.");
    process.exit(1);
  }

  const client = postgres(url, { prepare: false, max: 1 });
  const db = drizzle(client);

  console.log("→ Clearing existing catalog…");
  // time_slots cascade from experiences; clear explicitly to be safe.
  await db.delete(timeSlots);
  await db.delete(experiences);

  console.log(`→ Inserting ${seedExperiences.length} experiences…`);
  for (const exp of seedExperiences) {
    const { slots, ...row } = exp;
    const [inserted] = await db.insert(experiences).values(row).returning({ id: experiences.id });

    if (slots.length) {
      await db.insert(timeSlots).values(
        slots.map((s, i) => ({
          experienceId: inserted.id,
          startTime: s.startTime,
          label: s.label,
          capacity: s.capacity,
          sortOrder: i,
        }))
      );
    }
    console.log(`  ✓ ${exp.title} (${slots.length} slots)`);
  }

  await client.end();
  console.log("✔ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
