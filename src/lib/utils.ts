const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "18091234567";

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_LINKS = {
  waitlist: waLink("¡Quiero ser de los primeros en hela.do! 🍦"),
  scout: waLink("Encontré una heladería nueva 🔭"),
  checkin: (shop: string) => waLink(`Quiero hacer check-in en ${shop} 📍`),
  notify: waLink("Notifícame cuando lancen hela.do 🚀"),
  info: waLink("Quiero saber más sobre hela.do"),
};

export function formatScore(score: number | null): string {
  if (!score) return "—";
  return score.toFixed(1);
}

export function formatReviews(reviews: number): string {
  if (reviews >= 1000) return `${(reviews / 1000).toFixed(1)}k`;
  return reviews.toString();
}

export function priceTierLabel(tier: string): string {
  switch (tier) {
    case "$": return "Económico";
    case "$$": return "Medio";
    case "$$$": return "Premium";
    default: return tier;
  }
}
