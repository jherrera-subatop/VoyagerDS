/**
 * GET /api/vmc-live-url
 * Extrae el JSON embebido en cualquier página VMC que contiene todas las ofertas activas.
 * Filtra: offer_type === "live" + model_year numérico (indica vehículo, no laptop/celular).
 * Cache: 1 hora.
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // nunca cachear — cada request busca en vivo
export const revalidate = 0;

const VMC_BASE = "https://www.vmcsubastas.com";
// La homepage tiene el JSON embebido con todas las ofertas activas
const SEED_PAGES = [
  `${VMC_BASE}/`,
  `${VMC_BASE}/mafperu.html`,
  `${VMC_BASE}/hoy.html`,
];

const FETCH_OPTS = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "es-PE,es;q=0.9",
  },
  signal: AbortSignal.timeout(8000),
} as const;

interface OfferItem {
  id: number;
  state: string;
  offer_type: string;
  name: string;
  model_year: string;
}

interface OfferGroup {
  offers: OfferItem[];
}

interface ListingData {
  groups?: OfferGroup[];
}

/** Extrae el JSON de ofertas embebido en el HTML de VMC */
function extractListingJson(html: string): ListingData | null {
  // Estrategia A: JSON literal en el HTML (server-side render)
  const matchA = html.match(/\{"header":\{[\s\S]*?"groups":\[[\s\S]*?\],"terminated":\[[\s\S]*?\]\}/);
  if (matchA) {
    try { return JSON.parse(matchA[0]) as ListingData; } catch { /* continúa */ }
  }

  // Estrategia B: JSON dentro de value="" de un input (HTML-encoded)
  const inputMatch = html.match(/value="(\{[^"]*groups[^"]*\})"/);
  if (inputMatch?.[1]) {
    try {
      const decoded = inputMatch[1]
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
      return JSON.parse(decoded) as ListingData;
    } catch { /* continúa */ }
  }

  // Estrategia C: extraer IDs de offer_type live con model_year directamente del texto
  // Devuelve una estructura sintética compatible
  const offerRegex = /"id":(\d+),"state":"active","offer_type":"live"[^}]*?"model_year":"(\d{4})"/g;
  const groups: OfferGroup[] = [];
  const offers: OfferItem[] = [];
  let m: RegExpExecArray | null;
  while ((m = offerRegex.exec(html)) !== null) {
    if (m[1] && m[2]) {
      offers.push({ id: parseInt(m[1], 10), state: "active", offer_type: "live", name: "", model_year: m[2] });
    }
  }
  if (offers.length > 0) {
    groups.push({ offers });
    return { groups };
  }

  return null;
}

/** Determina si una oferta es un vehículo por su model_year (año de 4 dígitos) */
function isVehicle(offer: OfferItem): boolean {
  return /^\d{4}$/.test(offer.model_year);
}

/** Busca el primer ID de oferta EN VIVO que sea un vehículo */
function findLiveVehicleId(data: ListingData, exclude: number[] = []): number | null {
  if (!data.groups) return null;
  for (const group of data.groups) {
    if (!group.offers) continue;
    for (const offer of group.offers) {
      if (offer.offer_type === "live" && offer.state === "active" && isVehicle(offer) && !exclude.includes(offer.id)) {
        return offer.id;
      }
    }
  }
  return null;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const excludeParam = searchParams.get("exclude");
  const excludeIds = excludeParam
    ? excludeParam.split(",").map(function toInt(s) { return parseInt(s, 10); })
    : [];
  for (const pageUrl of SEED_PAGES) {
    try {
      const res = await fetch(pageUrl, FETCH_OPTS);
      if (!res.ok) continue;

      const html = await res.text();
      const data = extractListingJson(html);
      if (!data) continue;

      const id = findLiveVehicleId(data, excludeIds);
      if (id) {
        return NextResponse.json({
          url: `${VMC_BASE}/oferta/${id}`,
          ofertaId: id,
          type: "live",
        });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ url: null, ofertaId: null, type: null });
}
