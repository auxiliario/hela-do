"use client";

import { useState } from "react";
import { ShopCard } from "@/components/ShopCard";

interface Shop {
  name: string;
  slug: string;
  city: string;
  score: number | null;
  reviews: number;
  price_tier: string;
  address: string | null;
  tags: string[];
  tier: string | null;
}

interface ShopFiltersProps {
  shops: Shop[];
  allTags: string[];
}

export function ShopFilters({ shops, allTags }: ShopFiltersProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"reviews" | "score" | "name">("reviews");

  const filtered = shops
    .filter((shop) => !activeTag || shop.tags.includes(activeTag))
    .sort((a, b) => {
      if (sortBy === "score") return (b.score || 0) - (a.score || 0);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b.reviews || 0) - (a.reviews || 0);
    });

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {/* Tag filters */}
        <button
          onClick={() => setActiveTag(null)}
          className={`tag-pill border transition-colors ${
            !activeTag
              ? "bg-hela-dark text-hela-cream border-hela-dark"
              : "bg-white border-hela-dark/10 text-hela-dark/60 hover:border-hela-pink hover:text-hela-pink"
          }`}
        >
          Todas
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`tag-pill border transition-colors ${
              activeTag === tag
                ? "bg-hela-pink text-white border-hela-pink"
                : "bg-white border-hela-dark/10 text-hela-dark/60 hover:border-hela-pink hover:text-hela-pink"
            }`}
          >
            {tag}
          </button>
        ))}

        {/* Sort */}
        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "reviews" | "score" | "name")}
            className="text-xs bg-white border border-hela-dark/10 rounded-lg px-3 py-1.5 text-hela-dark/60 focus:outline-none focus:border-hela-pink"
          >
            <option value="reviews">Más reseñas</option>
            <option value="score">Mejor rating</option>
            <option value="name">A → Z</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-hela-dark/40 mb-4">
        Mostrando {filtered.length} de {shops.length} heladerías
        {activeTag && (
          <>
            {" "}
            con tag{" "}
            <span className="text-hela-pink font-medium">{activeTag}</span>
          </>
        )}
      </p>

      {/* Shop grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((shop) => (
          <ShopCard
            key={shop.slug}
            name={shop.name}
            slug={shop.slug}
            city={shop.city}
            score={shop.score}
            reviews={shop.reviews}
            priceTier={shop.price_tier}
            address={shop.address}
            tags={shop.tags}
            tier={shop.tier}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <span className="text-3xl block mb-2">🍦</span>
          <p className="text-hela-dark/40">
            No hay heladerías con ese filtro. Prueba otro.
          </p>
        </div>
      )}
    </>
  );
}
