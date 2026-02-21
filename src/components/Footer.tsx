import Link from "next/link";
import { WA_LINKS } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-hela-dark text-hela-cream/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍦</span>
              <span className="font-display font-bold text-xl text-hela-cream">
                hela<span className="text-hela-pink">.do</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Tu pasaporte helado dominicano. La guía más completa de heladerías
              en República Dominicana.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-hela-cream mb-3 text-sm uppercase tracking-wider">
              Explora
            </h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm hover:text-hela-peach transition-colors">
                Todas las ciudades
              </Link>
              <Link href="/que-es-helado" className="block text-sm hover:text-hela-peach transition-colors">
                ¿Qué es hela.do?
              </Link>
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <h4 className="font-display font-semibold text-hela-cream mb-3 text-sm uppercase tracking-wider">
              Conecta
            </h4>
            <div className="space-y-2">
              <a
                href={WA_LINKS.scout}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-hela-mint transition-colors"
              >
                🔭 Reportar heladería nueva
              </a>
              <a
                href={WA_LINKS.waitlist}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-hela-mint transition-colors"
              >
                🚀 Únete a la lista de espera
              </a>
              <a
                href={WA_LINKS.info}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-hela-mint transition-colors"
              >
                💬 Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-hela-cream/10 mt-8 pt-6 text-center text-xs">
          <p>© {new Date().getFullYear()} hela.do — Hecho con 🍦 en República Dominicana</p>
        </div>
      </div>
    </footer>
  );
}
