import { Link } from "react-router-dom";
import type { Property } from "../../data/villas";
import { photo } from "../../data/images";
import { cn, formatINR, poolLabel, staySummary } from "../../lib/format";
import { SafeImage } from "../ui/SafeImage";

type VillaCardProps = {
  property: Property;
  variant?: "grid" | "row";
  /** Position in the collection, shown as an editorial index. */
  index?: number;
};

export function VillaCard({ property: p, variant = "grid", index }: VillaCardProps) {
  const href = `/villas/${p.id}`;
  const alt = `${p.name} — ${p.bedrooms}-bedroom ${p.type.toLowerCase()} with a ${poolLabel[
    p.pool
  ].toLowerCase()} in ${p.area}, ${p.region === "north" ? "North" : "South"} Goa`;

  return (
    <article className={cn("vcard", `vcard--${variant}`)}>
      <Link className="vcard__media plate plate--zoom" to={href} tabIndex={-1} aria-hidden="true">
        <SafeImage
          className="plate__img"
          src={photo(p.gallery[0], "landscape_4_3")}
          alt={alt}
          width={1000}
          height={750}
          sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 380px"
        />
        <span className="vcard__chip chip">{poolLabel[p.pool]}</span>
        {index !== undefined ? (
          <span className="vcard__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </Link>

      <div className="vcard__body">
        <p className="vcard__meta">
          <span>
            {p.area} · {p.region === "north" ? "North Goa" : "South Goa"}
          </span>
          <span className="vcard__code">{p.code}</span>
        </p>

        <h3 className="vcard__title display-sm">
          <Link to={href}>
            <span className="link-sweep">{p.name}</span>
          </Link>
        </h3>

        <p className="vcard__facts">{staySummary(p)}</p>

        {variant === "row" ? <p className="vcard__summary body-sm">{p.summary}</p> : null}

        <ul className="vcard__tags">
          {p.amenities.slice(0, 3).map((a) => (
            <li key={a} className="chip">
              {a}
            </li>
          ))}
        </ul>

        <div className="vcard__foot">
          <p className="price">
            {formatINR(p.ratePerNight)} <span className="price__unit">/ night incl. GST</span>
          </p>
          <Link className="vcard__cta" to={href}>
            View house <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VillaCardSkeleton() {
  return (
    <div className="vcard vcard--grid" aria-hidden="true">
      <div className="skeleton vcard__media-skeleton" />
      <div className="vcard__body">
        <div className="skeleton" style={{ height: 12, width: "45%" }} />
        <div className="skeleton" style={{ height: 24, width: "75%" }} />
        <div className="skeleton" style={{ height: 12, width: "60%" }} />
        <div className="skeleton" style={{ height: 40, width: "100%" }} />
      </div>
    </div>
  );
}
