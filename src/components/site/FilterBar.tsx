import { useState } from "react";
import type { PropertyType, Region } from "../../data/villas";
import { bedroomOptions, priceBounds, properties, regions, typeOptions } from "../../data/villas";
import { cn, formatINR } from "../../lib/format";
import { Button } from "../ui/Button";

export type SortKey = "featured" | "price-asc" | "price-desc" | "size-desc";

export type Filters = {
  q: string;
  region: Region | "all";
  type: PropertyType | "all";
  bedrooms: number;
  guests: number;
  maxPrice: number;
  sort: SortKey;
};

export const defaultFilters: Filters = {
  q: "",
  region: "all",
  type: "all",
  bedrooms: 0,
  guests: 0,
  maxPrice: priceBounds.max,
  sort: "featured",
};

export const sortLabels: Record<SortKey, string> = {
  featured: "Our pick",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "size-desc": "Largest first",
};

export const activeFilterCount = (f: Filters) =>
  [
    f.q.trim() !== "",
    f.region !== "all",
    f.type !== "all",
    f.bedrooms !== 0,
    f.guests !== 0,
    f.maxPrice !== priceBounds.max,
  ].filter(Boolean).length;

type FilterBarProps = {
  value: Filters;
  onChange: (next: Filters) => void;
  resultCount: number;
  loading: boolean;
};

export function FilterBar({ value, onChange, resultCount, loading }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const active = activeFilterCount(value);

  const set = <K extends keyof Filters>(key: K, v: Filters[K]) => onChange({ ...value, [key]: v });

  return (
    <section className="filters" aria-label="Filter properties">
      <div className="filters__bar">
        <div className="filters__search">
          <label className="sr-only" htmlFor="filter-q">
            Search by house or area
          </label>
          <svg className="filters__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <circle cx="8.6" cy="8.6" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12.6 12.6 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            id="filter-q"
            className="control filters__input"
            type="search"
            placeholder="Search a house or an area — try “Candolim”"
            value={value.q}
            onChange={(e) => set("q", e.target.value)}
          />
        </div>

        <output className="filters__count" aria-live="polite">
          {loading ? "Checking availability…" : `${resultCount} ${resultCount === 1 ? "stay" : "stays"}`}
        </output>

        <button
          type="button"
          className="filters__toggle"
          aria-expanded={open}
          aria-controls="filter-panel"
          onClick={() => setOpen((v) => !v)}
        >
          Filters
          {active > 0 ? <span className="filters__badge">{active}</span> : null}
        </button>
      </div>

      <div className={cn("filters__panel", open && "is-open")} id="filter-panel">
        <div className="filters__group">
          <span className="filters__label">Coast</span>
          <div className={cn("seg", "seg--stack")}>
            {regions.map((r) => (
              <button
                key={r.value}
                type="button"
                className={cn("seg__item", value.region === r.value && "is-on")}
                aria-pressed={value.region === r.value}
                onClick={() => set("region", r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__group">
          <span className="filters__label">Property type</span>
          <div className={cn("seg", "seg--stack")}>
            {typeOptions.map((t) => (
              <button
                key={t.value}
                type="button"
                className={cn("seg__item", value.type === t.value && "is-on")}
                aria-pressed={value.type === t.value}
                onClick={() => set("type", t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__group">
          <label className="filters__label" htmlFor="filter-beds">
            Bedrooms
          </label>
          <select
            id="filter-beds"
            className="control"
            value={value.bedrooms}
            onChange={(e) => set("bedrooms", Number(e.target.value))}
          >
            {bedroomOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__group">
          <label className="filters__label" htmlFor="filter-guests">
            Guests
          </label>
          <select
            id="filter-guests"
            className="control"
            value={value.guests}
            onChange={(e) => set("guests", Number(e.target.value))}
          >
            <option value={0}>Any group size</option>
            {[2, 4, 6, 8, 10, 12].map((n) => (
              <option key={n} value={n}>
                Sleeps {n}+
              </option>
            ))}
          </select>
        </div>

        <div className="filters__group">
          <label className="filters__label" htmlFor="filter-price">
            Up to <strong>{formatINR(value.maxPrice)}</strong> / night
          </label>
          <input
            id="filter-price"
            className="filters__range"
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={500}
            value={value.maxPrice}
            onChange={(e) => set("maxPrice", Number(e.target.value))}
          />
        </div>

        <div className="filters__group">
          <label className="filters__label" htmlFor="filter-sort">
            Sort by
          </label>
          <select
            id="filter-sort"
            className="control"
            value={value.sort}
            onChange={(e) => set("sort", e.target.value as SortKey)}
          >
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {sortLabels[k]}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__reset">
          <Button
            variant="outline"
            size="sm"
            type="button"
            disabled={active === 0}
            onClick={() => onChange(defaultFilters)}
          >
            Reset filters
          </Button>
        </div>
      </div>

      <p className="filters__note body-sm">
        {properties.length} houses in the collection · rates include GST · minimum stays vary by
        property
      </p>
    </section>
  );
}
