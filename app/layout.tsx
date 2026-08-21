import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getSiteUrl } from "../lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dra. Denisse | Dentista en Coyoacán",
    template: "%s | Dra. Denisse",
  },
  description:
    "Atención dental profesional, cercana y con explicaciones claras en Pedregal de Santa Úrsula, Coyoacán. Solicita una valoración con la Dra. Denisse.",
  applicationName: "Dra. Denisse",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Dra. Denisse | Dentista en Coyoacán",
    description:
      "Atención dental profesional, cercana y con explicaciones claras en Pedregal de Santa Úrsula, Coyoacán. Solicita una valoración con la Dra. Denisse.",
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Dra. Denisse",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dra. Denisse — Dentista en Coyoacán, atención profesional y cercana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Denisse | Dentista en Coyoacán",
    description:
      "Atención dental profesional, cercana y con explicaciones claras en Pedregal de Santa Úrsula, Coyoacán.",
    images: ["/og.png"],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
