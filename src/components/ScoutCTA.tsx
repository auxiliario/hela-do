import { WA_LINKS } from "@/lib/utils";

export function ScoutCTA() {
  return (
    <div className="bg-gradient-to-br from-hela-purple to-hela-dark rounded-2xl p-6 md:p-8 text-center">
      <span className="text-3xl mb-2 block">🔭</span>
      <h4 className="font-display font-bold text-lg text-hela-cream mb-2">
        ¿Conoces una heladería que no está aquí?
      </h4>
      <p className="text-hela-cream/50 text-sm mb-4">
        Sé un Scout. Mándanos la ubicación y el nombre por WhatsApp y la
        añadimos al mapa.
      </p>
      <a
        href={WA_LINKS.scout}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-hela-mint text-hela-dark px-5 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all"
      >
        🔭 Reportar heladería nueva
      </a>
    </div>
  );
}
