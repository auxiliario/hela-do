# 🍦 hela.do — Tu pasaporte helado dominicano

## Quick Start (copy-paste these commands)

### Step 1: Unzip and enter the project
```bash
cd ~/Downloads
unzip hela-do.zip
cd hela-do
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the hela.do homepage with 360+ shops.

---

## Deploy to Vercel

### Step 4: Push to GitHub
```bash
git init
git add .
git commit -m "hela.do Phase 1: La Vitrina"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hela-do.git
git push -u origin main
```
(Replace `YOUR_USERNAME` with your GitHub username)

### Step 5: Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your `hela-do` repo
3. Vercel will auto-detect it's Next.js
4. In **Environment Variables**, add these:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://zwvvxgdanobgtecnapqg.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_124RrnaEcs9XQwQlqm3HOg_oB8XnAoT`
   - `NEXT_PUBLIC_MAPBOX_TOKEN` = `your_mapbox_token_here`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD` = `dfqvm5mqh`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = your hela.do WhatsApp number
5. Click **Deploy**

### Step 6: Connect your domain (later)
In Vercel dashboard → Settings → Domains → Add `hela.do`

---

## Seed Supabase Database (optional — for Phase 2)

### Step A: Run the schema
1. Go to Supabase dashboard → SQL Editor
2. Open `scripts/schema.sql`
3. Paste and run

### Step B: Seed the data
```bash
SUPABASE_URL=https://zwvvxgdanobgtecnapqg.supabase.co \
SUPABASE_SERVICE_KEY=your_secret_key_here \
npm run seed
```

---

## Project Structure
```
hela-do/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (city grid)
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── sitemap.ts            # Auto-generated sitemap
│   │   ├── robots.ts             # Robots.txt
│   │   ├── not-found.tsx         # 404 page
│   │   ├── que-es-helado/        # About page
│   │   ├── ciudad/[slug]/        # City pages (76)
│   │   └── heladeria/[slug]/     # Shop pages (360)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppFAB.tsx
│   │   ├── CityCard.tsx
│   │   ├── ShopCard.tsx
│   │   ├── PassportTeaser.tsx
│   │   └── ScoutCTA.tsx
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client
│   │   └── utils.ts              # WhatsApp links, formatters
│   └── data/
│       ├── shops.json            # 360 shops
│       └── cities.json           # 76 cities
├── scripts/
│   ├── schema.sql                # Supabase schema
│   └── seed-supabase.mjs         # Data seeder
├── .env.local                    # API keys (don't commit)
└── package.json
```

## Phase 1 Pages
- **/** — Homepage with city grid
- **/ciudad/[slug]** — City page with all shops (76 cities)
- **/heladeria/[slug]** — Individual shop page with SEO (360 shops)
- **/que-es-helado** — About page

Every page has WhatsApp CTAs. No auth. Fully public. SEO-optimized.
