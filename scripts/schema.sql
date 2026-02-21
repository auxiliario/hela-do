-- hela.do Phase 1 Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  shop_count INTEGER DEFAULT 0,
  hero_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shops table
CREATE TABLE IF NOT EXISTS shops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city_id UUID REFERENCES cities(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  address TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  phone TEXT,
  website TEXT,
  hours TEXT,
  score DOUBLE PRECISION,
  reviews INTEGER DEFAULT 0,
  price_tier TEXT DEFAULT '$$',
  tier TEXT,
  tags TEXT[] DEFAULT '{}',
  has_ig BOOLEAN DEFAULT FALSE,
  place_id TEXT,
  specialty TEXT,
  must_try TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed flavors (Phase 1: placeholder from research)
CREATE TABLE IF NOT EXISTS flavors_seed (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID REFERENCES shops(id),
  name TEXT NOT NULL,
  is_must_try BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts for SEO
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body_md TEXT,
  city_id UUID REFERENCES cities(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scout log (manual tracking of WhatsApp submissions)
CREATE TABLE IF NOT EXISTS scout_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wa_name TEXT,
  wa_number TEXT,
  shop_name TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  photo_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  shop_id UUID REFERENCES shops(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WhatsApp contacts (CRM backup)
CREATE TABLE IF NOT EXISTS wa_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wa_name TEXT,
  wa_number TEXT,
  label TEXT, -- waitlist, scout, owner_lead
  city TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_shops_city ON shops(city);
CREATE INDEX IF NOT EXISTS idx_shops_slug ON shops(slug);
CREATE INDEX IF NOT EXISTS idx_shops_score ON shops(score DESC);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);

-- Enable Row Level Security (read-only public access)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE flavors_seed ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Cities are publicly readable" ON cities FOR SELECT USING (true);
CREATE POLICY "Shops are publicly readable" ON shops FOR SELECT USING (true);
CREATE POLICY "Flavors are publicly readable" ON flavors_seed FOR SELECT USING (true);
CREATE POLICY "Published blog posts are publicly readable" ON blog_posts FOR SELECT USING (published_at IS NOT NULL);
