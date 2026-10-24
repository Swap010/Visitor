import type { PoolKind, Property } from "../data/villas";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (value: number) => inr.format(value);

export const poolLabel: Record<PoolKind, string> = {
  private: "Private pool",
  plunge: "Plunge pool",
  shared: "Shared pool",
};

export function staySummary(p: Property): string {
  const rooms = `${p.bedrooms} bedroom${p.bedrooms > 1 ? "s" : ""}`;
  const beach =
    p.walkToBeach === null ? "beach by road" : `${p.walkToBeach} min to beach`;
  return `${rooms} · sleeps ${p.sleeps} · ${beach}`;
}

export function toISODate(date: Date): string {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(`${checkIn}T00:00:00`).getTime();
  const b = new Date(`${checkOut}T00:00:00`).getTime();
  const nights = Math.round((b - a) / 86_400_000);
  return nights > 0 ? nights : 0;
}

export function prettyDate(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const todayISO = () => toISODate(new Date());

export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");
