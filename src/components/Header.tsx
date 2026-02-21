"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WA_LINKS } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const ciudadesHref = pathname === "/" ? "#ciudades" : "/#ciudades";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-hela-cream/80 border-b border-hela-dark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🍦</span>
          <span className="font-display font-bold text-xl text-hela-dark tracking-tight">
            hela<span className="text-hela-pink">.do</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href={ciudadesHref}
            className="font-body text-sm text-hela-dark/70 hover:text-hela-pink transition-colors"
          >
            Ciudades
          </a>
          <Link
            href="/que-es-helado"
            className="font-body text-sm text-hela-dark/70 hover:text-hela-pink transition-colors"
          >
            ¿Qué es hela.do?
          </Link>
          <a
            href={WA_LINKS.waitlist}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-hela-dark text-hela-cream px-4 py-2 rounded-full text-sm font-medium hover:bg-hela-purple transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.348-2.672.896.896-2.672-.348-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Únete
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-hela-dark"
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-hela-cream border-t border-hela-dark/5 px-4 py-4 space-y-3 animate-fade-up">
          <a
            href={ciudadesHref}
            onClick={() => setMenuOpen(false)}
            className="block font-body text-hela-dark/70 py-2"
          >
            🗺️ Ciudades
          </a>
          <Link
            href="/que-es-helado"
            onClick={() => setMenuOpen(false)}
            className="block font-body text-hela-dark/70 py-2"
          >
            🍦 ¿Qué es hela.do?
          </Link>
          <a
            href={WA_LINKS.waitlist}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#25D366] text-white text-center px-4 py-3 rounded-xl font-medium"
          >
            Únete por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
