import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bedroomOptions, priceBounds, properties, regions } from "../../data/villas";
import { formatINR } from "../../lib/format";
import { Button } from "../ui/Button";

const budgets = [
  { value: priceBounds.max, label: "Any budget" },
  { value: 12000, label: `Up to ${formatINR(12000)} / night` },
  { value: 20000, label: `Up to ${formatINR(20000)} / night` },
  { value: 30000, label: `Up to ${formatINR(30000)} / night` },
];

/** Compact search strip that hands the visitor to the filtered collection. */
export function QuickSearch() {
  const navigate = useNavigate();
  const [region, setRegion] = useState("all");
  const [bedrooms, setBedrooms] = useState(0);
  const [guests, setGuests] = useState(0);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);

  return (
    <form
      className="quick"
      aria-label="Search the collection"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (region !== "all") params.set("region", region);
        if (bedrooms) params.set("bedrooms", String(bedrooms));
        if (guests) params.set("guests", String(guests));
        if (maxPrice !== priceBounds.max) params.set("maxPrice", String(maxPrice));
        navigate(`/villas${params.toString() ? `?${params.toString()}` : ""}`);
      }}
    >
      <div className="quick__head">
        <p className="eyebrow eyebrow--plain">Find a house</p>
        <p className="quick__count body-sm">
          {properties.length} private-pool homes, {regions.length - 1} coasts
        </p>
      </div>

      <div className="quick__fields">
        <label className="quick__field">
          <span>Coast</span>
          <select className="control" value={region} onChange={(e) => setRegion(e.target.value)}>
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <label className="quick__field">
          <span>Bedrooms</span>
          <select
            className="control"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
          >
            {bedroomOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <label className="quick__field">
          <span>Guests</span>
          <select className="control" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            <option value={0}>Any group size</option>
            {[2, 4, 6, 8, 10, 12].map((n) => (
              <option key={n} value={n}>
                {n}+ guests
              </option>
            ))}
          </select>
        </label>

        <label className="quick__field">
          <span>Budget</span>
          <select
            className="control"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          >
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Button variant="primary" type="submit" arrow className="quick__go">
        Show matching houses
      </Button>
    </form>
  );
}
