import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ScoutCTA } from "@/components/ScoutCTA";
import { WA_LINKS, formatScore, formatReviews, priceTierLabel } from "@/lib/utils";
import shopsData from "@/data/shops.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return shopsData.map((shop) => ({ slug: shop.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shop = shopsData.find((s) => s.slug === slug);
  if (!shop) return {};
  return {
    title: `${shop.name} — Heladería en ${shop.city} | hela.do`,
    description: `${shop.name} en ${shop.city}, República Dominicana. ${shop.score ? `Rating: ${shop.score}/5.` : ""} ${shop.address || ""} Horarios, sabores y más en hela.do.`,
    openGraph: {
      title: `${shop.name} 🍦 ${shop.city}`,
      description: `Heladería en ${shop.city}. ${shop.score ? `${shop.score}/5` : ""} — hela.do`,
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

function parseHours(hoursStr: string | null): { day: string; time: string }[] {
  if (!hoursStr) return [];
  const dayMap: Record<string, string> = {
    lunes: "Lunes",
    martes: "Martes",
    miércoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sábado: "Sábado",
    domingo: "Domingo",
  };
  return hoursStr.split(",").map((h) => {
    const parts = h.trim().split(":");
    const dayKey = parts[0]?.trim().toLowerCase();
    const time = parts.slice(1).join(":").trim();
    return {
      day: dayMap[dayKey] || parts[0]?.trim() || "",
      time: time || "",
    };
  });
}

export default async function ShopPage({ params }: Props) {
  const { slug } = await params;
  const shop = shopsData.find((s) => s.slug === slug);
  if (!shop) notFound();

  const citySlug = slugify(shop.city);
  const nearbyShops = shopsData
    .filter((s) => slugify(s.city) === citySlug && s.slug !== shop.slug)
    .slice(0, 4);

  const hours = parseHours(shop.hours);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${shop.lat},${shop.lng}&navigate=yes`;

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: shop.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address,
      addressLocality: shop.city,
      addressCountry: "DO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.lat,
      longitude: shop.lng,
    },
    telephone: shop.phone,
    url: shop.website,
    aggregateRating: shop.score
      ? {
          "@type": "AggregateRating",
          ratingValue: shop.score,
          reviewCount: shop.reviews,
          bestRating: 5,
        }
      : undefined,
    priceRange: shop.price_tier,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-hela-dark/40 mb-6">
          <Link href="/" className="hover:text-hela-pink transition-colors">
            hela.do
          </Link>
          <span className="mx-2">→</span>
          <Link
            href={`/ciudad/${citySlug}`}
            className="hover:text-hela-pink transition-colors"
          >
            {shop.city}
          </Link>
          <span className="mx-2">→</span>
          <span className="text-hela-dark/70">{shop.name}</span>
        </nav>

        {/* Header */}
        <div className="animate-fade-up">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {shop.tier === "🔥 HOT" && <span title="Trending">🔥</span>}
                <span className="tag-pill bg-hela-dark/5 text-hela-dark/60 text-xs">
                  {shop.price_tier} · {priceTierLabel(shop.price_tier)}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-hela-dark">
                {shop.name}
              </h1>
              <p className="text-hela-dark/50 mt-1">
                Heladería en {shop.city}
              </p>
            </div>

            {shop.score && (
              <div className="shrink-0 text-center">
                <div className="bg-hela-dark text-hela-cream font-display font-bold text-2xl px-4 py-2 rounded-xl">
                  {formatScore(shop.score)}
                </div>
                <span className="text-xs text-hela-dark/40">
                  {formatReviews(shop.reviews)} reviews
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {shop.tags.map((tag) => (
              <span
                key={tag}
                className="tag-pill bg-hela-pink/5 text-hela-pink text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Info Block */}
        <div className="animate-fade-up delay-1 mt-8 bg-white rounded-2xl border border-hela-dark/5 divide-y divide-hela-dark/5">
          {/* Address */}
          {shop.address && (
            <div className="p-5 flex items-start gap-3">
              <span className="text-lg mt-0.5">📍</span>
              <div>
                <p className="text-sm text-hela-dark">{shop.address}</p>
                <div className="flex gap-3 mt-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-hela-pink font-medium hover:underline"
                  >
                    Google Maps →
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-hela-pink font-medium hover:underline"
                  >
                    Waze →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Phone */}
          {shop.phone && (
            <div className="p-5 flex items-center gap-3">
              <span className="text-lg">📞</span>
              <a
                href={`tel:${shop.phone}`}
                className="text-sm text-hela-dark hover:text-hela-pink transition-colors"
              >
                {shop.phone}
              </a>
            </div>
          )}

          {/* Website */}
          {shop.website && (
            <div className="p-5 flex items-center gap-3">
              <span className="text-lg">🌐</span>
              <a
                href={shop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-hela-pink hover:underline truncate"
              >
                {shop.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            </div>
          )}

          {/* Hours */}
          {hours.length > 0 && (
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🕐</span>
                <span className="text-sm font-medium text-hela-dark">Horarios</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-hela-dark/60">{h.day}</span>
                    <span className={`font-medium ${
                      h.time.toLowerCase().includes("cerrado")
                        ? "text-red-400"
                        : "text-hela-dark"
                    }`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Check-in CTA */}
        <div className="animate-fade-up delay-2 mt-6">
          <a
            href={WA_LINKS.checkin(shop.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-hela-pink to-hela-peach text-white py-4 rounded-2xl font-display font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-hela-pink/20"
          >
            📍 Check-in — Pronto
          </a>
          <p className="text-center text-xs text-hela-dark/30 mt-2">
            El sistema de check-in llega pronto. Únete a la lista de espera.
          </p>
        </div>

        {/* Flavor Menu Placeholder */}
        <div className="animate-fade-up delay-3 mt-8 bg-white rounded-2xl border border-hela-dark/5 p-6 text-center">
          <span className="text-3xl mb-2 block">🍦</span>
          <h3 className="font-display font-bold text-lg text-hela-dark mb-1">
            Menú de sabores
          </h3>
          <p className="text-hela-dark/40 text-sm mb-4">
            Calificaciones de la comunidad vienen pronto
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {["😐", "😊", "🤩", "🤯"].map((e) => (
              <span key={e} className="text-2xl opacity-20">
                {e}
              </span>
            ))}
          </div>
          <a
            href={WA_LINKS.notify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-hela-pink font-medium hover:underline"
          >
            Notifícame cuando lancen →
          </a>
        </div>

        {/* Social Feed Placeholder */}
        <div className="mt-6 bg-white rounded-2xl border border-hela-dark/5 p-6 text-center">
          <span className="text-3xl mb-2 block">📱</span>
          <h3 className="font-display font-bold text-lg text-hela-dark mb-1">
            Posts de la comunidad
          </h3>
          <p className="text-hela-dark/40 text-sm">
            Los posts de Instagram y TikTok de la comunidad aparecerán aquí pronto.
          </p>
        </div>

        {/* Nearby Shops */}
        {nearbyShops.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display font-bold text-xl text-hela-dark mb-4">
              Más heladerías en {shop.city}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nearbyShops.map((s) => (
                <Link
                  key={s.slug}
                  href={`/heladeria/${s.slug}`}
                  className="group block"
                >
                  <div className="shop-card bg-white rounded-xl border border-hela-dark/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-hela-dark group-hover:text-hela-pink transition-colors truncate">
                        {s.name}
                      </span>
                      {s.score && (
                        <span className="shrink-0 bg-hela-dark/5 text-xs font-bold px-2 py-0.5 rounded-md">
                          {s.score}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-hela-dark/40 mt-1 truncate">
                      {s.address}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Scout CTA */}
        <div className="mt-12">
          <ScoutCTA />
        </div>
      </div>
    </>
  );
}
