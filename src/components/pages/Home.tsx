import { Link } from "react-router-dom";
import { destinations, faqs, principles, site, steps } from "../../data/site";
import { photo } from "../../data/images";
import { featuredProperties, properties } from "../../data/villas";
import { ButtonAnchor, ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SafeImage } from "../ui/SafeImage";
import { SectionHead } from "../ui/SectionHead";
import { Accordion } from "../site/Accordion";
import { QuickSearch } from "../site/QuickSearch";
import { VillaCard } from "../site/VillaCard";
import { useDocumentTitle } from "../../lib/hooks";
import { formatINR } from "../../lib/format";

const walks = properties.map((p) => p.walkToBeach).filter((n): n is number => n !== null);
const shortestWalk = Math.min(...walks);
const longestWalk = Math.max(...walks);

const included = [
  "Daily housekeeping and fresh linen",
  "Pool cleaning and water treatment",
  "Air conditioning throughout the bedrooms",
  "Wi-Fi fast enough to work on",
  "Welcome provisions — water, coffee, fruit",
  "A local host on call, on WhatsApp",
];

const onRequest = [
  { label: "Airport transfers", note: "Dabolim and Mopa, met at arrivals" },
  { label: "A cook for a few meals", note: "Goan, Konkani and continental menus" },
  { label: "Scooters and self-drive cars", note: "Delivered to the gate" },
  { label: "Babysitting and cots", note: "Booked before you land" },
  { label: "Sunset boat trips", note: "The Sal and Chapora rivers" },
  { label: "In-villa massage", note: "Two therapists, your living room" },
];

const shownFeatured = featuredProperties.slice(0, 5);
const largeFeatured = shownFeatured.slice(0, 2);
const smallFeatured = shownFeatured.slice(2, 5);

export function Home() {
  useDocumentTitle("Villa Rentals Goa — Private-pool villas & apartments in North & South Goa");

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      <section className="hero">
        <div className="hero__media">
          <SafeImage
            src={photo("heroCourtyard", "landscape_16_9")}
            alt="A Goan villa at dusk with a private infinity pool lit by lanterns and coconut palms behind the house"
            width={1920}
            height={1080}
            eager
          />
        </div>
        <div className="hero__veil" aria-hidden="true" />

        <div className="shell shell--wide hero__inner">
          <p className="hero__eyebrow">North &amp; South Goa · Private pools · Since the family took over the keys</p>
          <h1 className="display-xl hero__title">
            A house with its own pool,
            <br />
            <em className="display-italic">minutes from the sand.</em>
          </h1>
          <p className="lead hero__lead">
            Twelve villas and apartments between Candolim and Agonda. We have slept in every one of
            them, and we write the rates down plainly — GST, housekeeping and pool care included.
          </p>
          <div className="hero__actions">
            <ButtonLink to="/villas" variant="brass" arrow>
              See the collection
            </ButtonLink>
            <ButtonAnchor href={site.whatsappHref} newTab variant="outline" className="btn--on-image">
              WhatsApp the Candolim team
            </ButtonAnchor>
          </div>
        </div>

        <p className="hero__rail" aria-hidden="true">
          Candolim · Anjuna · Assagao · Siolim · Vagator · Cavelossim · Varca · Patnem · Agonda
        </p>

        <ul className="shell shell--wide hero__facts">
          <li>
            <span className="hero__fact-num">{properties.length}</span>
            <span className="hero__fact-label">houses in the collection, each one visited</span>
          </li>
          <li>
            <span className="hero__fact-num">
              {shortestWalk}–{longestWalk} min
            </span>
            <span className="hero__fact-label">walk to the nearest beach</span>
          </li>
          <li>
            <span className="hero__fact-num">8am–10pm</span>
            <span className="hero__fact-label">a local person answers, every day</span>
          </li>
        </ul>
      </section>

      {/* ------------------------------------------------------------------ */}
      <div className="home-quick">
        <div className="shell shell--wide">
          <QuickSearch />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      <section className="section intro">
        <div className="shell intro__grid">
          <Reveal className="intro__aside">
            <p className="eyebrow">The collection</p>
            <h2 className="display-lg">
              Twelve houses we would book for our own friends.
            </h2>
          </Reveal>

          <Reveal className="intro__body" delay={90}>
            <p className="lead">
              We started by looking after a handful of family properties in Candolim. Guests kept
              asking whether we knew somewhere else with a pool, a proper kitchen and an honest
              price, so we began keeping a list.
            </p>
            <p className="intro__para">
              Today that list is twelve houses across the two coasts — some a two-minute walk from
              the beach, others set among paddy fields in Siolim or the palms behind Patnem. What
              they share is that we know them properly: which bedroom catches the morning sun, how
              the water pressure behaves in December, whether the lane outside is quiet at night.
            </p>
            <p className="intro__para">
              We are not a listings site. If a house is not right for your group, we will say so and
              suggest a different one. That is the whole service.
            </p>
            <p className="intro__sign">— The team in Candolim</p>
            <ButtonLink to="/about" variant="outline" arrow className="intro__cta">
              How we work
            </ButtonLink>
          </Reveal>

          <Reveal className="intro__figure" delay={140}>
            <figure className="plate plate--zoom">
              <SafeImage
                className="plate__img"
                src={photo("lane", "landscape_16_9")}
                alt="A quiet Goan village lane lined with colourful Portuguese-era houses and bougainvillea"
                width={1600}
                height={900}
              />
            </figure>
            <p className="intro__caption body-sm">
              Siolim, in the north — the lane outside Villa Chikoo, fifteen minutes from the beach
              and another world from the beach road.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section section--sand areas">
        <div className="shell">
          <SectionHead
            eyebrow="Where to stay"
            title="Four stretches of coast, four different holidays."
            lead="Goa is small enough to drive across in two hours and different enough that the choice of coast decides what kind of trip you have. Here is how we describe it to guests."
          />

          <div className="areas__grid">
            {destinations.map((d, i) => (
              <Reveal className={`areas__item areas__item--${i + 1}`} key={d.name} delay={i * 70}>
                <figure className="areas__figure plate plate--zoom">
                  <SafeImage
                    className="plate__img"
                    src={photo(d.photoKey, i === 0 || i === 3 ? "landscape_16_9" : "landscape_4_3")}
                    alt={`${d.name}, Goa — ${d.blurb}`}
                    width={1200}
                    height={800}
                  />
                  <figcaption className="areas__cap">
                    <span className="chip chip--solid">{d.region === "north" ? "North Goa" : "South Goa"}</span>
                  </figcaption>
                </figure>
                <div className="areas__copy">
                  <h3 className="display-sm">{d.name}</h3>
                  <p className="areas__blurb">{d.blurb}</p>
                  <p className="body-sm areas__detail">{d.detail}</p>
                  <Link className="link-sweep areas__link" to={`/villas?region=${d.region}`}>
                    Houses in {d.region === "north" ? "the north" : "the south"} &#8594;
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section featured">
        <div className="shell">
          <SectionHead
            eyebrow="Our pick"
            title="Five houses guests come back to."
            lead="Availability changes weekly. These are the ones we hear about most often from the people who stayed."
            action={
              <ButtonLink to="/villas" variant="outline" arrow>
                All {properties.length} properties
              </ButtonLink>
            }
          />

          <div className="villa-grid villa-grid--two">
            {largeFeatured.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <VillaCard property={p} index={i} />
              </Reveal>
            ))}
          </div>

          <div className="villa-grid villa-grid--three featured__second">
            {smallFeatured.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <VillaCard property={p} index={featuredProperties.indexOf(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section band-dark why on-dark">
        <div className="shell">
          <SectionHead
            eyebrow="Why guests book directly"
            title="Four things we do differently."
            lead="No booking fees, no call centre, no surprises on the final invoice."
            className="why__head"
          />
          <ul className="why__list">
            {principles.map((p, i) => (
              <Reveal className="why__item" key={p.index} delay={i * 80}>
                <span className="why__num" aria-hidden="true">
                  {p.index}
                </span>
                <h3 className="why__title display-sm">{p.title}</h3>
                <p className="body-sm">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section coast">
        <div className="shell">
          <SectionHead
            eyebrow="Two coasts"
            title="Party north, quiet south — or the other way around."
            lead="Both are worth a proper stay. Tell us who is travelling and we will point you the right way."
          />
          <div className="coast__grid">
            <Reveal className="coast__panel">
              <SafeImage
                src={photo("streetscooter", "landscape_4_3")}
                alt="Two scooters parked in the shade beside a Goan village wall in the afternoon"
                width={1200}
                height={900}
              />
              <div className="coast__overlay">
                <p className="eyebrow">North Goa</p>
                <h3 className="display-md">Beach clubs, flea markets and the best dinners on the coast.</h3>
                <p className="body-sm">
                  Candolim, Baga, Anjuna, Vagator, Siolim and Assagao.{" "}
                  {properties.filter((p) => p.region === "north").length} houses, walkable beaches and
                  a twenty-minute drive in any direction to somewhere good to eat.
                </p>
                <ButtonLink to="/villas?region=north" variant="brass" size="sm" arrow>
                  North Goa houses
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal className="coast__panel" delay={100}>
              <SafeImage
                src={photo("southBeach", "landscape_4_3")}
                alt="A wide, empty South Goa beach at sunrise with fishing boats and casuarina trees"
                width={1200}
                height={900}
              />
              <div className="coast__overlay">
                <p className="eyebrow">South Goa</p>
                <h3 className="display-md">Long empty sand, the Sal river and very little traffic.</h3>
                <p className="body-sm">
                  Cavelossim, Varca, Betalbatim, Patnem and Agonda.{" "}
                  {properties.filter((p) => p.region === "south").length} houses for families, golfers
                  and anyone who wants to hear the surf rather than a sound system.
                </p>
                <ButtonLink to="/villas?region=south" variant="brass" size="sm" arrow>
                  South Goa houses
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section section--sand stay">
        <div className="shell stay__grid">
          <Reveal className="stay__media">
            <figure className="plate plate--zoom">
              <SafeImage
                className="plate__img"
                src={photo("welcome", "portrait_4_3")}
                alt="A welcome tray with chilled coconut water, folded towels and frangipani on a teak table"
                width={900}
                height={1200}
              />
            </figure>
          </Reveal>

          <Reveal className="stay__copy" delay={90}>
            <p className="eyebrow">What a stay includes</p>
            <h2 className="display-lg">The boring parts are already handled.</h2>
            <p className="lead">
              A villa is only relaxing if somebody is quietly taking care of it. Housekeeping, pool
              care and a host who picks up the phone are part of the rate — not an upsell at check-in.
            </p>

            <div className="stay__lists">
              <div>
                <h3 className="stay__list-head">Always included</h3>
                <ul className="ticks">
                  {included.map((item) => (
                    <li key={item}>
                      <span className="ticks__mark" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="stay__list-head">Arranged on request</h3>
                <ul className="notes">
                  {onRequest.map((item) => (
                    <li key={item.label}>
                      <span className="notes__label">{item.label}</span>
                      <span className="notes__note">{item.note}</span>
                    </li>
                  ))}
                </ul>
                <p className="body-sm stay__fine">
                  Extras are billed at cost by the provider and settled with them directly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section steps">
        <div className="shell">
          <SectionHead
            eyebrow="How booking works"
            title="Four steps, no booking engine."
            lead="You deal with a person from the first message to the last morning. Here is the whole process."
          />
          <ol className="steps__list">
            {steps.map((s, i) => (
              <Reveal className="steps__item" key={s.index} delay={i * 80}>
                <span className="steps__num">{s.index}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p className="body-sm">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="steps__cta">
            <p className="body-sm">
              Most houses are held for 24 hours once we have replied, so there is no rush. Lowest
              rate is {formatINR(Math.min(...properties.map((p) => p.ratePerNight)))} a night for a
              one-bedroom loft in Baga.
            </p>
            <ButtonLink to="/contact" variant="primary" arrow>
              Start an enquiry
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section faq">
        <div className="shell faq__grid">
          <Reveal className="faq__intro">
            <p className="eyebrow">Before you book</p>
            <h2 className="display-md">Questions we are asked most weeks.</h2>
            <p className="body-sm">
              The full list, including cancellation terms and ID requirements, is on the{" "}
              <Link className="link-sweep" to="/contact#faq">
                contact page
              </Link>
              .
            </p>
          </Reveal>
          <Reveal className="faq__list" delay={80}>
            <Accordion items={faqs.slice(0, 5)} idPrefix="home-faq" />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="closer">
        <div className="shell shell--wide closer__grid">
          <Reveal className="closer__copy on-dark">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="display-lg">
              Tell us the dates. We will tell you what is actually free.
            </h2>
            <p className="lead">
              Send an enquiry or call the office in Candolim. Either way you get a written answer
              with the rate, the deposit and two alternatives if your first choice is taken.
            </p>
            <div className="closer__actions">
              <ButtonLink to="/contact" variant="brass" arrow>
                Send an enquiry
              </ButtonLink>
              <ButtonAnchor href={site.phoneHref} variant="outline" className="btn--on-image">
                {site.phoneLabel}
              </ButtonAnchor>
            </div>
            <p className="body-sm closer__hours">{site.responseNote}</p>
          </Reveal>

          <Reveal className="closer__media" delay={90}>
            <figure className="plate plate--zoom">
              <SafeImage
                className="plate__img"
                src={photo("poolNight", "portrait_4_3")}
                alt="A villa pool lit from within at night with warm garden lighting on the palms"
                width={900}
                height={1200}
              />
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}
