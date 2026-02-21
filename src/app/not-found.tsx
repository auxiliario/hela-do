import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-6xl block mb-4">🍦</span>
        <h1 className="font-display font-extrabold text-4xl text-hela-dark mb-2">
          404
        </h1>
        <p className="text-hela-dark/50 mb-6">
          Este helado no existe... todavía.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-hela-dark text-hela-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-hela-purple transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
