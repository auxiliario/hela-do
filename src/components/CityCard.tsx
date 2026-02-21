import Link from "next/link";

interface CityCardProps {
  name: string;
  slug: string;
  shopCount: number;
  index: number;
}

const cityEmojis: Record<string, string> = {
  "santo-domingo": "🏛️",
  santiago: "⛪",
  "puerto-plata": "🏖️",
  jarabacoa: "🏔️",
  constanza: "❄️",
  "las-terrenas": "🌴",
  samana: "🐋",
  "la-romana": "⛵",
  higuey: "⛪",
  bonao: "🌿",
  "la-vega": "🎭",
  "san-cristobal": "🏰",
  "san-pedro-de-macoris": "⚾",
  "san-francisco-de-macoris": "🌾",
  moca: "☕",
  azua: "🌵",
  bani: "🧂",
  nagua: "🌊",
  cotui: "⛏️",
  sosua: "🤿",
  cabarete: "🪁",
  bayahibe: "🐠",
  "boca-chica": "🏝️",
};

export function CityCard({ name, slug, shopCount, index }: CityCardProps) {
  const emoji = cityEmojis[slug] || "🍦";
  const delayClass = `delay-${Math.min(index + 1, 8)}`;

  return (
    <Link href={`/ciudad/${slug}`} className="group">
      <div
        className={`animate-fade-up ${delayClass} shop-card relative bg-white rounded-2xl p-6 border border-hela-dark/5 overflow-hidden`}
      >
        {/* Decorative corner */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-hela-pink/5 rounded-full group-hover:bg-hela-pink/10 transition-colors" />

        <div className="relative">
          <span className="text-3xl mb-3 block">{emoji}</span>
          <h3 className="font-display font-bold text-lg text-hela-dark group-hover:text-hela-pink transition-colors">
            {name}
          </h3>
          <p className="text-sm text-hela-dark/50 mt-1">
            {shopCount} {shopCount === 1 ? "heladería" : "heladerías"}
          </p>

          {/* Progress bar placeholder */}
          <div className="mt-3 h-1.5 bg-hela-dark/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-hela-pink to-hela-peach rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((shopCount / 20) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
