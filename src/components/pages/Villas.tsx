import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { PropertyType, Region } from "../../data/villas";
import { priceBounds, properties } from "../../data/villas";
import type { Filters, SortKey } from "../site/FilterBar";
import { FilterBar, defaultFilters } from "../site/FilterBar";
import { VillaCard, VillaCardSkeleton } from "../site/VillaCard";
import { Button, ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { site } from "../../data/site";
import { useDocumentTitle, useSimulatedLoad } from "../../lib/hooks";
import { cn, formatINR } from "../../lib/format";

const validSorts: SortKey[] = ["featured", "price-asc", "price-desc", "size-desc"];

function filterFromParams(params: URLSearchParams): Filters {
  const region = params.get("region");
  const type = params.get("type");
  const sort = params.get("sort");
  const bedrooms = Number(params.get("bedrooms") ?? 0);
  const guests = Number(params.get("guests") ?? 0);
  const maxPrice = Number(params.get("maxPrice") ?? priceBounds.max);

  return {
    q: params.get("q") ?? "",
    region: region === "north" || region === "south" ? (region as Region) : "all",
    type: type === "Villa" || type === "Apartment" ? (type as PropertyType) : "all",
    bedrooms: Number.isFinite(bedrooms) ? bedrooms : 0,
    guests: Number.isFinite(guests) ? guests : 0,
    maxPrice:
      Number.isFinite(maxPrice) && maxPrice >= priceBounds.min ? maxPrice : priceBounds.max,
    sort: sort && validSorts.includes(sort as SortKey) ? (sort as SortKey) : "featured",
  };
}

function match(list: typeof properties, f: Filters) {
  const q = f.q.trim().toLowerCase();
  const result = list.filter((p) => {
    if (f.region !== "all" && p.region !== f.region) return false;
    if (f.type !== "all" && p.type !== f.type) return false;
    if (f.bedrooms === 5) {
      if (p.bedrooms < 5) return false;
    } else if (f.bedrooms !== 0 && p.bedrooms !== f.bedrooms) {
      return false;
    }
    if (f.guests !== 0 && p.sleeps < f.guests) return false;
    if (p.ratePerNight > f.maxPrice) return false;
    if (q) {
      const hay = [p.name, p.area, p.type, p.summary, p.goodFor, ...p.amenities]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (f.sort) {
    case "price-asc":
      return [...result].sort((a, b) => a.ratePerNight - b.ratePerNight);
    case "price-desc":
      return [...result].sort((a, b) => b.ratePerNight - a.ratePerNight);
    case "size-desc":
      return [...result].sort((a, b) => b.bedrooms - a.bedrooms || b.sleeps - a.sleeps);
    default:
      return [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

const buildChips = (f: Filters) => {
  const chips: { key: keyof Filters; label: string }[] = [];
  if (f.region !== "all") chips.push({ key: "region", label: f.region === "north" ? "North Goa" : "South Goa" });
  if (f.type !== "all") chips.push({ key: "type", label: f.type === "Villa" ? "Villas only" : "Apartments only" });
  if (f.bedrooms) chips.push({ key: "bedrooms", label: f.bedrooms === 5 ? "5+ bedrooms" : `${f.bedrooms} bedrooms` });
  if (f.guests) chips.push({ key: "guests", label: `Sleeps ${f.guests}+` });
  if (f.maxPrice !== priceBounds.max)
    chips.push({ key: "maxPrice", label: `Under ${formatINR(f.maxPrice)}` });
  if (f.q.trim()) chips.push({ key: "q", label: `“${f.q.trim()}”` });
  return chips;
};

export function Villas() {
  useDocumentTitle("Villas & apartments — Villa Rentals Goa");
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => filterFromParams(params), [params]);
  const [view, setView] = useState<"grid" | "row">("grid");
  const loading = useSimulatedLoad(460, params.toString());

  const results = useMemo(() => match(properties, filters), [filters]);
  const chips = buildChips(filters);

  const update = (next: Filters) => {
    const sp = new URLSearchParams();
    if (next.q.trim()) sp.set("q", next.q.trim());
    if (next.region !== "all") sp.set("region", next.region);
    if (next.type !== "all") sp.set("type", next.type);
    if (next.bedrooms) sp.set("bedrooms", String(next.bedrooms));
    if (next.guests) sp.set("guests", String(next.guests));
    if (next.maxPrice !== priceBounds.max) sp.set("maxPrice", String(next.maxPrice));
    if (next.sort !== "featured") sp.set("sort", next.sort);
    setParams(sp, { replace: true });
  };

  const removeChip = (key: keyof Filters) => {
    switch (key) {
      case "maxPrice":
        return update({ ...filters, maxPrice: priceBounds.max });
      case "bedrooms":
        return update({ ...filters, bedrooms: 0 });
      case "guests":
        return update({ ...filters, guests: 0 });
      case "q":
        return update({ ...filters, q: "" });
      case "region":
        return update({ ...filters, region: "all" });
      case "type":
        return update({ ...filters, type: "all" });
      default:
        return update({ ...filters, sort: "featured" });
    }
  };

  return (
    <>
      <header className="page-head">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Villas &amp; apartments</span>
          </nav>
          <div className="page-head__grid">
            <div>
              <p className="eyebrow">The collection</p>
              <h1 className="display-xl page-head__title">
                Every house, with the rate written next to it.
              </h1>
            </div>
            <p className="lead page-head__lead">
              Nothing here is hidden behind a “from” price. Filter by coast, size and budget, then
              tell us your dates — we will confirm what is actually free, usually within a few hours.
            </p>
          </div>
        </div>
      </header>

      <div className="listing">
        <div className="shell">
          <FilterBar
            value={filters}
            onChange={update}
            resultCount={results.length}
            loading={loading}
          />

          {chips.length > 0 ? (
            <div className="active-filters" aria-label="Active filters">
              <span className="active-filters__label">Filtering by</span>
              <ul>
                {chips.map((c) => (
                  <li key={c.key}>
                    <button type="button" onClick={() => removeChip(c.key)}>
                      {c.label}
                      <span aria-hidden="true">&#10005;</span>
                      <span className="sr-only">Remove this filter</span>
                    </button>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" type="button" onClick={() => update(defaultFilters)}>
                Clear all
              </Button>
            </div>
          ) : null}

          <div className="listing__toolbar">
            <p className="body-sm" aria-live="polite">
              {loading
                ? "Matching houses…"
                : `Showing ${results.length} of ${properties.length} houses${
                    filters.region === "north"
                      ? " in North Goa"
                      : filters.region === "south"
                        ? " in South Goa"
                        : ""
                  }`}
            </p>
            <div className="view-toggle" role="group" aria-label="Layout">
              {(["grid", "row"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  className={cn(view === v && "is-on")}
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                >
                  {v === "grid" ? "Grid" : "Detailed"}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="villa-grid villa-grid--three">
              {Array.from({ length: 6 }, (_, i) => (
                <VillaCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="empty">
              <p className="eyebrow">Nothing matches</p>
              <h2 className="display-md">
                No house fits that combination of coast, size and budget.
              </h2>
              <p className="lead">
                Relax one of the filters, or tell us what you need and we will check our waiting
                list of owners across both coasts.
              </p>
              <div className="empty__actions">
                <Button variant="primary" type="button" onClick={() => update(defaultFilters)}>
                  Reset filters
                </Button>
                <ButtonLink to="/contact" variant="outline">
                  Ask us to find one
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className={cn("villa-grid", view === "grid" ? "villa-grid--three" : "villa-grid--list")}>
              {results.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 60}>
                  <VillaCard property={p} variant={view === "row" ? "row" : "grid"} index={i} />
                </Reveal>
              ))}
            </div>
          )}

          <aside className="listing__help">
            <div>
              <h2 className="display-sm">Booking for a group, a wedding or a film crew?</h2>
              <p className="body-sm">
                We regularly hold two or three houses on the same dates for larger groups, and can
                arrange transport between them. Call {site.phoneLabel} and describe the trip.
              </p>
            </div>
            <div className="listing__help-actions">
              <ButtonLink to="/contact" variant="primary" arrow>
                Talk to us
              </ButtonLink>
              <ButtonLink to="/about" variant="ghost">
                How we work
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
