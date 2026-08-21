/** Canonical public site origin (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = "https://www.dradenisse.com";
  const base = raw && raw.length > 0 ? raw : fallback;
  return base.replace(/\/+$/, "");
}

export const mapsPlaceUrl = "https://maps.app.goo.gl/q7Roq5tQ1cKStUnt8";
export const whatsappBookingUrl =
  "https://wa.me/525547211684?text=Hola%20Dra.%20Denisse%2C%20vi%20su%20p%C3%A1gina%20y%20quisiera%20agendar%20una%20valoraci%C3%B3n.";
