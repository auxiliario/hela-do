/**
 * Seed Supabase with shop and city data
 * Usage: node scripts/seed-supabase.mjs
 * 
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_KEY env vars
 * (Use the service_role key, NOT the anon key — this bypasses RLS)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars");
  console.error("   SUPABASE_SERVICE_KEY is the secret key from Settings → API → Secret keys");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {
  console.log("🍦 Seeding hela.do database...\n");

  // Load data
  const cities = JSON.parse(readFileSync(join(__dirname, "../src/data/cities.json"), "utf-8"));
  const shops = JSON.parse(readFileSync(join(__dirname, "../src/data/shops.json"), "utf-8"));

  // Seed cities
  console.log(`📍 Inserting ${cities.length} cities...`);
  const { error: cityErr } = await supabase
    .from("cities")
    .upsert(
      cities.map((c) => ({
        name: c.name,
        slug: c.slug,
        lat: c.lat,
        lng: c.lng,
        shop_count: c.shop_count,
      })),
      { onConflict: "slug" }
    );
  if (cityErr) console.error("  City error:", cityErr.message);
  else console.log("  ✅ Cities done");

  // Seed shops
  console.log(`🏪 Inserting ${shops.length} shops...`);
  const { error: shopErr } = await supabase
    .from("shops")
    .upsert(
      shops.map((s) => ({
        name: s.name,
        slug: s.slug,
        city: s.city,
        address: s.address,
        lat: s.lat,
        lng: s.lng,
        phone: s.phone,
        website: s.website,
        hours: s.hours,
        score: s.score,
        reviews: s.reviews,
        price_tier: s.price_tier,
        tier: s.tier,
        tags: s.tags,
        has_ig: s.has_ig,
        place_id: s.place_id,
      })),
      { onConflict: "slug" }
    );
  if (shopErr) console.error("  Shop error:", shopErr.message);
  else console.log("  ✅ Shops done");

  console.log("\n🎉 Seeding complete!");
}

seed().catch(console.error);
