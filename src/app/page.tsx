import { CityCard } from "@/components/CityCard";
import { PassportTeaser } from "@/components/PassportTeaser";
import { ScoutCTA } from "@/components/ScoutCTA";
import { WA_LINKS } from "@/lib/utils";
import citiesData from "@/data/cities.json";
import shopsData from "@/data/shops.json";

export default function HomePage() {
  const totalShops = shopsData.length;
  const totalCities = citiesData.length;

  // Top 20 cities for the main grid, rest in "more"
  const mainCities = citiesData.slice(0, 20);
  const moreCities = citiesData.slice(20);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-hela-pink/10 rounded-full blur-3xl" />
          <div className="absolute top-40 -right-20 w-96 h-96 bg-hela-peach/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-hela-yellow/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-hela-dark/5 rounded-full px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hela-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-hela-pink"></span>
              </span>
              <span className="text-xs font-medium text-hela-dark/60 uppercase tracking-wider">
                Lanzamiento pronto
              </span>
            </div>
          </div>

          <h1 className="animate-fade-up delay-1 font-display font-extrabold text-4xl sm:text-5xl md:text-7xl text-hela-dark leading-[0.95] tracking-tight">
            Cada helado tiene
            <br />
            <span className="bg-gradient-to-r from-hela-pink via-hela-peach to-hela-yellow bg-clip-text text-transparent">
              su historia
            </span>
          </h1>

          <p className="animate-fade-up delay-2 mt-6 text-lg md:text-xl text-hela-dark/60 max-w-xl mx-auto leading-relaxed">
            {totalShops}+ heladerías en {totalCities} ciudades.
            La guía más completa del helado dominicano.
          </p>

          <div className="animate-fade-up delay-3 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WA_LINKS.waitlist}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-medium text-base hover:brightness-110 transition-all wa-pulse shadow-lg shadow-[#25D366]/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.801-6.24-2.144l-.436-.348-2.672.896.896-2.672-.348-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Sé de los primeros
            </a>
            <a
              href="#ciudades"
              className="inline-flex items-center gap-1 text-hela-dark/50 hover:text-hela-pink text-sm font-medium transition-colors"
            >
              Explorar ciudades ↓
            </a>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-up delay-4 mt-12 inline-flex items-center divide-x divide-hela-dark/10 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
            <div className="pr-6 text-center">
              <div className="font-display font-bold text-2xl text-hela-dark">{totalShops}+</div>
              <div className="text-xs text-hela-dark/40">Heladerías</div>
            </div>
            <div className="px-6 text-center">
              <div className="font-display font-bold text-2xl text-hela-dark">{totalCities}</div>
              <div className="text-xs text-hela-dark/40">Ciudades</div>
            </div>
            <div className="pl-6 text-center">
              <div className="font-display font-bold text-2xl text-hela-pink">🍦</div>
              <div className="text-xs text-hela-dark/40">Solo helado</div>
            </div>
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section id="ciudades" className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-hela-dark">
            Explora por ciudad
          </h2>
          <p className="text-hela-dark/50 mt-1">
            Toca una ciudad para ver todas sus heladerías
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mainCities.map((city, i) => (
            <CityCard
              key={city.slug}
              name={city.name}
              slug={city.slug}
              shopCount={city.shop_count}
              index={i}
            />
          ))}
        </div>

        {moreCities.length > 0 && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-hela-pink font-medium hover:underline">
              Ver {moreCities.length} ciudades más →
            </summary>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {moreCities.map((city, i) => (
                <CityCard
                  key={city.slug}
                  name={city.name}
                  slug={city.slug}
                  shopCount={city.shop_count}
                  index={i}
                />
              ))}
            </div>
          </details>
        )}
      </section>

      {/* Passport Teaser */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <PassportTeaser />
      </section>

      {/* Scout CTA */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        <ScoutCTA />
      </section>
    </>
  );
}
