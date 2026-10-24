import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { PhotoKey } from "../../data/images";
import { site } from "../../data/site";
import { properties, propertyById } from "../../data/villas";
import { ButtonAnchor, ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { BookingWidget } from "../site/BookingWidget";
import type { BookingRequest } from "../site/BookingWidget";
import { EnquiryForm } from "../site/EnquiryForm";
import { Gallery } from "../site/Gallery";
import type { GalleryShot } from "../site/Gallery";
import { VillaCard } from "../site/VillaCard";
import { areaMapEmbedUrl, areaMapViewUrl } from "../../lib/map";
import { useDocumentTitle } from "../../lib/hooks";
import { formatINR, prettyDate, poolLabel } from "../../lib/format";
import { NotFound } from "../site/NotFound";

const captions: Record<PhotoKey, string> = {
  heroCourtyard: "The house at dusk",
  poolDay: "Private pool and deck",
  poolEvening: "Pool in the evening",
  living: "Living room",
  bedroom: "Principal bedroom",
  bedroomTwo: "Guest bedroom",
  bath: "Bathroom",
  dining: "Dining and kitchen",
  kitchen: "Kitchen",
  garden: "Garden",
  terrace: "Terrace and outlook",
  balcony: "Balcony",
  lane: "The lane outside",
  portico: "Entrance portico",
  beach: "The nearest beach",
  southBeach: "The South Goa coast",
  welcome: "Welcome provisions",
  streetscooter: "Getting around",
  apartmentBlock: "The building",
  poolNight: "The pool after dark",
};

export function VillaDetail() {
  const { id = "" } = useParams();
  const property = propertyById(id);
  const [prefill, setPrefill] = useState<Partial<BookingRequest> & { property?: string }>({});
  const [token, setToken] = useState(0);

  useDocumentTitle(
    property
      ? `${property.name}, ${property.area} — Villa Rentals Goa`
      : "Property not found — Villa Rentals Goa",
  );

  if (!property) {
    return (
      <NotFound
        title="That house is not in the collection"
        message="The link may be out of date, or the property has been withdrawn. The full collection is a click away."
      />
    );
  }

  const shots: GalleryShot[] = property.gallery.map((key) => ({
    key,
    caption: captions[key],
  }));

  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.region === property.region || Math.abs(p.bedrooms - property.bedrooms) <= 1),
    )
    .sort((a, b) => Math.abs(a.ratePerNight - property.ratePerNight) - Math.abs(b.ratePerNight - property.ratePerNight))
    .slice(0, 3);

  const mapUrl = areaMapEmbedUrl(property.area);

  const facts = [
    { label: "Bedrooms", value: `${property.bedrooms} en-suite` },
    { label: "Sleeps", value: `${property.sleeps} guests` },
    { label: "Pool", value: poolLabel[property.pool] },
    {
      label: "Beach",
      value:
        property.walkToBeach === null
          ? "A short drive away"
          : `${property.walkToBeach} min on foot`,
    },
    { label: "Airport", value: `${property.airportKm} km` },
    { label: "Minimum stay", value: `${property.minNights} nights` },
  ];

  return (
    <>
      <article className="detail">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/villas">Villas &amp; apartments</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{property.name}</span>
          </nav>

          <header className="detail__head">
            <div>
              <p className="detail__loc">
                <span className="chip">{property.area}</span>
                <span className="chip">{property.region === "north" ? "North Goa" : "South Goa"}</span>
                <span className="chip">{property.type}</span>
                <span className="detail__code">Ref {property.code}</span>
              </p>
              <h1 className="display-xl detail__title">{property.name}</h1>
              <p className="lead detail__summary">{property.summary}</p>
            </div>
            <div className="detail__rate">
              <p className="price detail__price">
                {formatINR(property.ratePerNight)} <span className="price__unit">/ night</span>
              </p>
              <p className="body-sm">
                Inclusive of GST, housekeeping and pool care. Refundable deposit{" "}
                {formatINR(property.deposit)}.
              </p>
              <p className="body-sm detail__goodfor">Best for: {property.goodFor}</p>
            </div>
          </header>
        </div>

        <div className="shell detail__gallery">
          <Gallery shots={shots} name={property.name} />
        </div>

        <div className="shell detail__grid">
          <div className="detail__main">
            <Reveal>
              <h2 className="display-md">About the house</h2>
              <div className="prose">
                {property.description.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="display-md detail__sub">At a glance</h2>
              <dl className="facts">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <h2 className="display-md detail__sub">What is in the house</h2>
              <ul className="amen">
                {property.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="display-md detail__sub">House rules</h2>
              <ul className="rules">
                <li>
                  <span>Check-in / check-out</span>
                  <span>2pm / 11am</span>
                </li>
                <li>
                  <span>Minimum stay</span>
                  <span>{property.minNights} nights</span>
                </li>
                <li>
                  <span>Guests</span>
                  <span>Up to {property.sleeps}, registered at check-in</span>
                </li>
                <li>
                  <span>Identification</span>
                  <span>Government photo ID for every adult guest</span>
                </li>
                <li>
                  <span>Events</span>
                  <span>Small dinners allowed; ask before booking a party</span>
                </li>
                <li>
                  <span>Quiet hours</span>
                  <span>10pm – 7am out of respect for neighbours</span>
                </li>
              </ul>
              <p className="body-sm detail__rules-note">
                Full terms, including the cancellation schedule, are sent with your written
                confirmation.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="display-md detail__sub">
                {property.area} on the map
              </h2>
              <p className="body-sm detail__map-note">
                We share the exact address and the host's number once a booking is confirmed. The
                map shows the area, not the front gate.
              </p>
              {mapUrl ? (
                <div className="detail__map">
                  <iframe
                    title={`Map of ${property.area}, Goa`}
                    src={mapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}
              <p className="body-sm">
                <a className="link-sweep" href={areaMapViewUrl(property.area)} target="_blank" rel="noreferrer noopener">
                  Open {property.area} in a larger map
                </a>
              </p>
            </Reveal>
          </div>

          <div className="detail__aside">
            <div className="detail__sticky">
              <BookingWidget
                property={property}
                onRequest={(request) => {
                  setPrefill({ ...request, property: property.id });
                  setToken((t) => t + 1);
                  document
                    .getElementById("enquire")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />

              <div className="detail__host">
                <p className="eyebrow eyebrow--plain">Your host</p>
                <p className="body-sm">
                  Enquiries for {property.area} are handled by the Candolim office. Ask for a written
                  quotation — we do not take payment before you have one.
                </p>
                <ButtonAnchor href={site.phoneHref} variant="outline" size="sm" className="detail__host-btn">
                  {site.phoneLabel}
                </ButtonAnchor>
                <ButtonAnchor href={site.whatsappHref} newTab variant="ghost" size="sm">
                  Message on WhatsApp
                </ButtonAnchor>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="section section--sand enquiry" id="enquire">
        <div className="shell enquiry__grid">
          <div className="enquiry__intro">
            <p className="eyebrow">Enquire</p>
            <h2 className="display-md">
              {prefill.checkIn
                ? `Your dates for ${property.name}`
                : `Ask about ${property.name}`}
            </h2>
            <p className="lead">
              {prefill.checkIn && prefill.checkOut
                ? `${prettyDate(prefill.checkIn)} – ${prettyDate(prefill.checkOut)}, ${prefill.guests} guests. Add anything else we should know and we will confirm availability.`
                : "Send your dates and we will confirm availability, the rate and the deposit in writing."}
            </p>
            <ul className="enquiry__points">
              <li>No payment now — a 30% advance confirms the dates.</li>
              <li>Written confirmation with the address and host contact.</li>
              <li>If it is taken, we will suggest two alternatives.</li>
            </ul>
          </div>
          <div className="enquiry__form">
            <EnquiryForm
              properties={properties}
              lockedProperty={property.id}
              prefill={prefill}
              prefillToken={token}
              idPrefix="detail"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="sec-head sec-head--split">
            <div className="sec-head__main">
              <p className="eyebrow">Also worth a look</p>
              <h2 className="display-lg sec-head__title">Houses at a similar rate</h2>
              <p className="lead sec-head__lead">
                Same coast or a similar size, and within a few thousand rupees a night.
              </p>
            </div>
            <div className="sec-head__action">
              <ButtonLink to="/villas" variant="outline" arrow>
                All {properties.length} properties
              </ButtonLink>
            </div>
          </div>
          <div className="villa-grid villa-grid--three">
            {similar.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <VillaCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mini-cta">
        <div className="shell mini-cta__inner">
          <div>
            <h2 className="display-sm">Not sure this is the right house for your group?</h2>
            <p className="body-sm">
              Tell us who is travelling and we will compare it honestly with two others in the
              collection.
            </p>
          </div>
          <div className="mini-cta__actions">
            <ButtonLink to="/contact" variant="brass" arrow>
              Ask the team
            </ButtonLink>
            <ButtonAnchor href={site.whatsappHref} newTab variant="outline" className="btn--on-image">
              WhatsApp
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
