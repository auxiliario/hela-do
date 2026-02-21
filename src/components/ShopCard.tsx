import Link from "next/link";
import { formatScore, formatReviews } from "@/lib/utils";

interface ShopCardProps {
  name: string;
  slug: string;
  city: string;
  score: number | null;
  reviews: number;
  priceTier: string;
  address: string | null;
  tags: string[];
  tier: string | null;
}

const tagColors: Record<string, string> = {
  cadena: "bg-blue-50 text-blue-700",
  independiente: "bg-purple-50 text-purple-700",
  internacional: "bg-amber-50 text-amber-700",
  gelato: "bg-emerald-50 text-emerald-700",
  paletas: "bg-pink-50 text-pink-700",
  artesanal: "bg-orange-50 text-orange-700",
  rolled: "bg-cyan-50 text-cyan-700",
};

export function ShopCard({
  name,
  slug,
  city,
  score,
  reviews,
  priceTier,
  address,
  tags,
  tier,
}: ShopCardProps) {
  const isHot = tier === "🔥 HOT";

  return (
    <Link href={`/heladeria/${slug}`} className="group block">
      <div className="shop-card bg-white rounded-2xl border border-hela-dark/5 overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-hela-pink via-hela-peach to-hela-yellow" />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {isHot && <span className="text-sm" title="Trending">🔥</span>}
                <h3 className="font-display font-bold text-hela-dark group-hover:text-hela-pink transition-colors truncate">
                  {name}
                </h3>
              </div>

              {address && (
                <p className="text-xs text-hela-dark/40 mt-1 truncate">
                  {address}
                </p>
              )}
            </div>

            {/* Score badge */}
            {score && (
              <div className="shrink-0 flex flex-col items-center">
                <div className="bg-hela-dark text-hela-cream font-display font-bold text-sm px-2.5 py-1 rounded-lg">
                  {formatScore(score)}
                </div>
                <span className="text-[10px] text-hela-dark/40 mt-0.5">
                  {formatReviews(reviews)}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="tag-pill bg-hela-dark/5 text-hela-dark/60">
              {priceTier}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className={`tag-pill ${tagColors[tag] || "bg-gray-50 text-gray-600"}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Phase 2 teaser */}
          <div className="mt-4 pt-3 border-t border-hela-dark/5 flex items-center justify-between">
            <div className="flex gap-1 opacity-30">
              <span>😐</span><span>😊</span><span>🤩</span><span>🤯</span>
            </div>
            <span className="text-[10px] text-hela-pink/60 font-medium uppercase tracking-wider">
              Ratings pronto
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
