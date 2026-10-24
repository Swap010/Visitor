import { areaCoords } from "../data/site";

/**
 * OpenStreetMap embed URL — no API key required, so the maps work in a demo
 * without asking the client for a billing account.
 */
export function areaMapEmbedUrl(area: string, spanDegrees = 0.014, marker?: string): string | null {
  const point = areaCoords[area];
  if (!point) return null;

  const { lat, lng } = point;
  const left = lng - spanDegrees;
  const right = lng + spanDegrees;
  const bottom = lat - spanDegrees * 0.6;
  const top = lat + spanDegrees * 0.6;

  const bbox = [left, bottom, right, top].map((n) => n.toFixed(4)).join("%2C");
  const pin = marker ?? `${lat.toFixed(4)}%2C${lng.toFixed(4)}`;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${pin}`;
}

export function areaMapViewUrl(area: string): string {
  const point = areaCoords[area];
  if (!point) return "https://www.openstreetmap.org/";
  return `https://www.openstreetmap.org/?mlat=${point.lat}&mlon=${point.lng}#map=14/${point.lat}/${point.lng}`;
}
