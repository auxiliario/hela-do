import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StaticMap } from "@/components/StaticMap";
import { ShopFilters } from "@/components/ShopFilters";
import { ScoutCTA } from "@/components/ScoutCTA";
import { getRegionForCity } from "@/data/regions";
import citiesData from "@/data/cities.json";
import shopsData from "@/data/shops.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return citiesData.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesData.find((c) => c.slug === slug);
  if (!city) return {};
  const shops = shopsData.filter((s) => slugify(s.city) === slug);
  return {
    title: `Heladerías en ${city.name} — hela.do`,
    description: `Descubre ${shops.length} heladerías en ${city.name}, República Dominicana. Ratings, horarios, direcciones y más.`,
    openGraph: {
      title: `Heladerías en ${city.name} 🍦`,
      description: `${shops.length} heladerías en ${city.name}. La guía más completa.`,
    },
  };
}

function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[-\s]+/g, "-")
    .trim();
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = citiesData.find((c) => c.slug === slug);
  if (!city) notFound();

  const shops = shopsData
    .filter((s) => slugify(s.city) === slug)
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0));

  const allTags = [...new Set(shops.flatMap((s) => s.tags))];
  const regionName = getRegionForCity(slug);

  const mapPins = shops.map((s) => ({
    lat: s.lat,
    lng: s.lng,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-hela-dark/40 mb-6">
        <Link href="/" className="hover:text-hela-pink transition-colors">
          hela.do
        </Link>
        <span className="mx-2">→</span>
        <span className="text-hela-dark/50">{regionName}</span>
        <span className="mx-2">→</span>
        <span className="text-hela-dark/70">{city.name}</span>
      </nav>

      {/* Header */}
      <div className="animate-fade-up mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-hela-dark">
          Heladerías en{" "}
          <span className="bg-gradient-to-r from-hela-pink to-hela-peach bg-clip-text text-transparent">
            {city.name}
          </span>
        </h1>
        <p className="text-hela-dark/50 mt-2 text-lg">
          {shops.length} {shops.length === 1 ? "heladería" : "heladerías"} · {regionName}
        </p>
      </div>

      {/* Map */}
      {mapPins.length > 0 && (
        <div className="animate-fade-up delay-1 mb-8">
          <StaticMap
            pins={mapPins}
            centerLat={city.lat}
            centerLng={city.lng}
            zoom={shops.length > 5 ? 12 : 14}
          />
        </div>
      )}

      {/* Filterable shop list */}
      <ShopFilters shops={shops} allTags={allTags} />

      {/* Scout CTA */}
      <div className="mt-12 max-w-lg mx-auto">
        <ScoutCTA />
      </div>

      {/* Leaderboard Teaser */}
      <div className="mt-12 bg-white rounded-2xl border border-hela-dark/5 p-6 md:p-8 text-center">
        <span className="text-3xl mb-2 block">🏆</span>
        <h3 className="font-display font-bold text-xl text-hela-dark mb-2">
          Leaderboard de {city.name}
        </h3>
        <p className="text-hela-dark/40 text-sm mb-4">
          ¿Cuál es la mejor heladería de {city.name}? La comunidad decide. Pronto.
        </p>
        <div className="space-y-2 max-w-xs mx-auto">
          {shops.slice(0, 3).map((shop, i) => (
            <div
              key={shop.slug}
              className="flex items-center gap-3 bg-hela-dark/[0.02] rounded-xl px-4 py-2.5"
            >
              <span className="font-display font-bold text-hela-dark/30">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-hela-dark/70 truncate flex-1 text-left">
                {shop.name}
              </span>
              {shop.score && (
                <span className="text-xs font-bold text-hela-dark/40">
                  {shop.score}
                </span>
              )}
            </div>
          ))}
          {shops.length > 3 && (
            <div className="flex items-center gap-3 bg-hela-dark/[0.02] rounded-xl px-4 py-2.5 blur-[2px]">
              <span className="font-display font-bold text-hela-dark/30">4</span>
              <span className="text-sm font-medium text-hela-dark/40 truncate flex-1 text-left">
                ???
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
