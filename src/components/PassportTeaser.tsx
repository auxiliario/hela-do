import { WA_LINKS } from "@/lib/utils";

export function PassportTeaser() {
  return (
    <section className="relative overflow-hidden bg-hela-dark rounded-3xl p-8 md:p-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-hela-pink rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-hela-peach rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-hela-mint rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg mx-auto">
        <div className="text-5xl mb-4 animate-float">🛂</div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-hela-cream mb-3">
          Tu Pasaporte Helado
        </h3>
        <p className="text-hela-cream/60 text-sm md:text-base mb-6 leading-relaxed">
          Colecciona stamps, desbloquea badges, compite en el leaderboard.
          Cada heladería visitada es un nuevo sello en tu pasaporte.
        </p>

        {/* Fake passport grid */}
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
          {["🏔️", "🏛️", "🌴", "🏖️", "🐋", "❄️", "🌿", "⛵"].map(
            (emoji, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl flex items-center justify-center text-xl ${
                  i < 3
                    ? "bg-hela-pink/20 border border-hela-pink/30"
                    : "bg-hela-cream/5 border border-hela-cream/10 opacity-40 blur-[1px]"
                }`}
              >
                {emoji}
              </div>
            )
          )}
        </div>

        {/* Badge tracks preview */}
        <div className="flex justify-center gap-3 mb-6 text-2xl opacity-50">
          <span title="Scout">🔭</span>
          <span title="Catador">🍦</span>
          <span title="Influencer">📱</span>
          <span title="Explorador">🗺️</span>
          <span title="Coleccionista">🏆</span>
          <span title="Leyenda">🌟</span>
        </div>

        <a
          href={WA_LINKS.waitlist}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:brightness-110 transition-all wa-pulse"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.348-2.672.896.896-2.672-.348-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Quiero mi pasaporte — Pronto
        </a>
      </div>
    </section>
  );
}
