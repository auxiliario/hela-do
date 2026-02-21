import { Metadata } from "next";
import { PassportTeaser } from "@/components/PassportTeaser";
import { WA_LINKS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "¿Qué es hela.do? — Tu pasaporte helado dominicano",
  description:
    "hela.do es la guía más completa de heladerías en República Dominicana. Descubre, califica y colecciona tus heladerías favoritas.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="animate-fade-up text-center mb-12">
        <span className="text-6xl mb-4 block">🍦</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-hela-dark">
          ¿Qué es{" "}
          <span className="bg-gradient-to-r from-hela-pink to-hela-peach bg-clip-text text-transparent">
            hela.do
          </span>
          ?
        </h1>
      </div>

      <div className="animate-fade-up delay-1 prose prose-lg max-w-none">
        <div className="bg-white rounded-2xl border border-hela-dark/5 p-6 md:p-10 space-y-6 text-hela-dark/70 leading-relaxed">
          <p className="text-xl text-hela-dark font-medium">
            hela.do es tu pasaporte helado dominicano.
          </p>

          <p>
            Somos la guía más completa de heladerías en República Dominicana.
            360+ heladerías mapeadas en 76 ciudades. Desde Helados Ivón en
            Jarabacoa hasta los gelatos artesanales de Las Terrenas. Desde las
            paletas de Bajo Cero en la Zona Colonial hasta los helados de
            batata con coco de Bonao.
          </p>

          <p>
            Pero hela.do es mucho más que un directorio. Estamos construyendo
            una plataforma donde puedes:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            {[
              { emoji: "📍", title: "Check-in", desc: "Haz check-in en cada heladería que visitas" },
              { emoji: "🍦", title: "Califica sabores", desc: "Deja tu rating de cada sabor que pruebas" },
              { emoji: "🛂", title: "Colecciona stamps", desc: "Llena tu pasaporte con sellos de cada ciudad" },
              { emoji: "🏆", title: "Compite", desc: "Sube en el leaderboard y gana badges" },
              { emoji: "🔭", title: "Descubre", desc: "Sé un Scout y añade heladerías nuevas al mapa" },
              { emoji: "📱", title: "Comparte", desc: "Publica en IG y TikTok para ganar XP" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-hela-cream rounded-xl p-4 border border-hela-dark/5"
              >
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="font-display font-bold text-hela-dark mt-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-hela-dark/50 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            Todo funciona por WhatsApp. Sin descargas. Sin crear cuenta con
            email. Mandas un mensaje y ya eres parte.
          </p>

          <p className="text-hela-dark font-medium">
            Estamos en construcción. El pasaporte se activa pronto. Mientras
            tanto, explora el mapa completo de heladerías y únete a la lista
            de espera para ser de los primeros.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center animate-fade-up delay-2">
        <a
          href={WA_LINKS.waitlist}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all wa-pulse shadow-lg shadow-[#25D366]/20"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.348-2.672.896.896-2.672-.348-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Únete a la lista de espera
        </a>
      </div>

      <div className="mt-16">
        <PassportTeaser />
      </div>
    </div>
  );
}
