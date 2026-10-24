import { Link } from "react-router-dom";
import { areaCoords, destinations, faqs, principles, site, steps } from "../../data/site";
import { photo } from "../../data/images";
import { properties } from "../../data/villas";
import { ButtonAnchor, ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SafeImage } from "../ui/SafeImage";
import { SectionHead } from "../ui/SectionHead";
import { Accordion } from "../site/Accordion";
import { areaMapEmbedUrl } from "../../lib/map";
import { useDocumentTitle } from "../../lib/hooks";

const responsibilities = [
  {
    role: "Reservations",
    detail:
      "Two people in the Candolim office answer enquiries, check the owners' calendars and send written quotations. They are the ones who tell you honestly when a house is not right for your group.",
  },
  {
    role: "Housekeeping",
    detail:
      "A team of eleven looks after the houses between stays and each morning during one. Linen, pool water and air-conditioning filters are on a fixed schedule rather than a complaint list.",
  },
  {
    role: "Guest support",
    detail:
      "Your host meets you at the gate, walks you through the house and stays reachable on WhatsApp from 8am to 10pm. Anything from extra towels to a 5am taxi goes through them.",
  },
];

export function About() {
  useDocumentTitle("How we work — Villa Rentals Goa");

  const mapUrl = areaMapEmbedUrl("Candolim", 0.11);

  return (
    <>
      <header className="page-head">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">How we work</span>
          </nav>
          <div className="page-head__grid">
            <div>
              <p className="eyebrow">How we work</p>
              <h1 className="display-xl page-head__title">
                A small team, living on the coast we rent on.
              </h1>
            </div>
            <p className="lead page-head__lead">
              We look after {properties.length} houses between Candolim and Agonda on behalf of their
              owners, and we are the people guests actually speak to. That is the whole model.
            </p>
          </div>
        </div>
      </header>

      {/* Story ------------------------------------------------------------- */}
      <section className="section story">
        <div className="shell story__grid">
          <Reveal className="story__copy">
            <p className="eyebrow">Where it started</p>
            <h2 className="display-lg">It began with one family house on Fort Aguada Road.</h2>
            <div className="prose">
              <p>
                A three-bedroom house in Candolim, let to friends of friends. Word travelled the way
                it does in Goa — through WhatsApp groups and people who had stayed — and the phone
                started ringing about houses that were not ours.
              </p>
              <p>
                So we started inspecting the ones we were being asked about. Some were excellent and
                badly described. Others were photographed beautifully and had a generator that gave
                up at midnight. Learning to tell the difference is what this business is built on.
              </p>
              <p>
                Today we work directly with owners, keep our own photographs and write our own
                descriptions. If a house disappoints a guest, it is our problem to fix, which is a
                useful incentive to be careful about what we list.
              </p>
            </div>
            <ButtonLink to="/villas" variant="outline" arrow>
              See what made the list
            </ButtonLink>
          </Reveal>

          <Reveal className="story__figures" delay={90}>
            <figure className="plate plate--zoom story__figure story__figure--tall">
              <SafeImage
                className="plate__img"
                src={photo("portico", "portrait_4_3")}
                alt="An arched Portuguese-era portico with potted palms and a brass lantern at a Goan villa"
                width={900}
                height={1200}
              />
            </figure>
            <figure className="plate plate--zoom story__figure story__figure--short">
              <SafeImage
                className="plate__img"
                src={photo("apartmentBlock", "landscape_4_3")}
                alt="A low-rise Goan apartment building with balconies and tropical planting"
                width={1000}
                height={750}
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Principles -------------------------------------------------------- */}
      <section className="section section--sand">
        <div className="shell">
          <SectionHead
            eyebrow="What we promise"
            title="Four commitments, written down."
            lead="These are the rules we hold ourselves to when we add a house to the collection, and when something goes wrong during a stay."
          />
          <ol className="promise">
            {principles.map((p, i) => (
              <Reveal className="promise__item" key={p.index} delay={i * 70}>
                <span className="promise__num">{p.index}</span>
                <h3 className="display-sm">{p.title}</h3>
                <p className="body-sm">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Process ----------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="From enquiry to check-out"
            title="What happens after you press send."
            lead="No booking engine, no automated reply. A person reads your enquiry and answers it."
          />
          <ol className="timeline">
            {steps.map((s, i) => (
              <Reveal className="timeline__item" key={s.index} delay={i * 70}>
                <span className="timeline__dot" aria-hidden="true" />
                <span className="timeline__num">{s.index}</span>
                <h3 className="timeline__title">{s.title}</h3>
                <p className="body-sm">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team functions ---------------------------------------------------- */}
      <section className="section band-dark on-dark">
        <div className="shell">
          <SectionHead
            eyebrow="Who you will deal with"
            title="Three functions, one office in Candolim."
            lead="We have deliberately stayed small. Nobody you speak to has to look up the answer in a system."
          />
          <div className="roles">
            {responsibilities.map((r, i) => (
              <Reveal className="roles__item" key={r.role} delay={i * 80}>
                <h3 className="roles__role">{r.role}</h3>
                <p className="body-sm">{r.detail}</p>
              </Reveal>
            ))}
          </div>

          <div className="roles__strip">
            <div>
              <span className="roles__strip-num">{properties.length}</span>
              <span className="roles__strip-label">houses we look after, both coasts</span>
            </div>
            <div>
              <span className="roles__strip-num">{Object.keys(areaCoords).length}</span>
              <span className="roles__strip-label">villages and beaches we cover</span>
            </div>
            <div>
              <span className="roles__strip-num">24h</span>
              <span className="roles__strip-label">typical time to a written reply</span>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage ---------------------------------------------------------- */}
      <section className="section coverage">
        <div className="shell coverage__grid">
          <Reveal className="coverage__copy">
            <p className="eyebrow">Where we cover</p>
            <h2 className="display-md">From the party belt to the quiet south.</h2>
            <p className="lead">
              We concentrate on the villages we can reach within an hour, so that check-ins,
              maintenance and emergencies are all handled by our own people rather than a partner.
            </p>
            <ul className="coverage__list">
              {Object.entries(areaCoords).map(([area, point]) => (
                <li key={area}>
                  <span className="coverage__area">{area}</span>
                  <span className="coverage__count">
                    {properties.filter((p) => p.area === area).length || "—"}
                  </span>
                  <span className="coverage__coords">
                    {point.lat.toFixed(2)}°N {point.lng.toFixed(2)}°E
                  </span>
                </li>
              ))}
            </ul>
            <p className="body-sm coverage__fine">
              Houses are also listed by coast:{" "}
              {destinations.map((d, i) => (
                <span key={d.name}>
                  <Link className="link-sweep" to={`/villas?region=${d.region}`}>
                    {d.name}
                  </Link>
                  {i < destinations.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal className="coverage__map" delay={80}>
            {mapUrl ? (
              <div className="map-frame">
                <iframe
                  title="Map of the North Goa coast around Candolim"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
            <p className="body-sm">
              Our office sits off Fort Aguada Road in Candolim. Visitors are welcome, but please call
              ahead so somebody is there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ --------------------------------------------------------------- */}
      <section className="section section--sand" id="faq">
        <div className="shell faq__grid">
          <Reveal className="faq__intro">
            <p className="eyebrow">The full list</p>
            <h2 className="display-md">Every question, answered plainly.</h2>
            <p className="body-sm">
              If something is missing, ask us: {site.email} or {site.phoneLabel}.
            </p>
            <ButtonAnchor href={site.emailHref} variant="outline" size="sm" className="faq__mail">
              Email the office
            </ButtonAnchor>
          </Reveal>
          <Reveal className="faq__list" delay={80}>
            <Accordion items={faqs} idPrefix="about-faq" defaultOpen={null} />
          </Reveal>
        </div>
      </section>

      <section className="mini-cta">
        <div className="shell mini-cta__inner">
          <div>
            <h2 className="display-sm">Own a house in Goa and want it looked after properly?</h2>
            <p className="body-sm">
              We take on a handful of new properties each year, and only ones we can service from
              Candolim. Send us the details and we will come and see it.
            </p>
          </div>
          <div className="mini-cta__actions">
            <ButtonAnchor href={site.emailHref} variant="brass" arrow>
              Talk to the office
            </ButtonAnchor>
            <ButtonLink to="/contact" variant="outline" className="btn--on-image">
              Contact page
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
