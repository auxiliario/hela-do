import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export const metadata: Metadata = {
  title: "hela.do — Tu pasaporte helado dominicano 🍦",
  description:
    "Descubre las mejores heladerías de República Dominicana. 360+ heladerías en 76 ciudades. El mapa más completo del helado dominicano.",
  metadataBase: new URL("https://hela.do"),
  openGraph: {
    title: "hela.do — Tu pasaporte helado dominicano 🍦",
    description:
      "360+ heladerías en 76 ciudades. El mapa más completo del helado dominicano.",
    url: "https://hela.do",
    siteName: "hela.do",
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "hela.do — Tu pasaporte helado dominicano 🍦",
    description: "360+ heladerías en 76 ciudades.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="grain min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
