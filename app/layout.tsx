import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://sitio-personalizado.lara-hidekel.chatgpt.site"),
  title: "Dra. Denisse | Dentista en Coyoacán",
  description: "Atención dental profesional, cercana y clara en Pedregal de Santa Úrsula, Coyoacán. Agenda tu valoración con la Dra. Denisse.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dra. Denisse | Una sonrisa sana empieza en buenas manos",
    description: "Atención dental profesional, explicaciones claras y trato humano en Coyoacán.",
    type: "website",
    locale: "es_MX",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dra. Denisse — Una sonrisa sana empieza en buenas manos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Denisse | Dentista en Coyoacán",
    description: "Atención profesional, cercana y sin complicaciones.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
