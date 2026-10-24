import { Link } from "react-router-dom";
import { photo } from "../../data/images";
import { faqs, site } from "../../data/site";
import { properties } from "../../data/villas";
import { ButtonAnchor } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SafeImage } from "../ui/SafeImage";
import { Accordion } from "../site/Accordion";
import { EnquiryForm } from "../site/EnquiryForm";
import { areaMapEmbedUrl, areaMapViewUrl } from "../../lib/map";
import { useDocumentTitle } from "../../lib/hooks";

export function Contact() {
  useDocumentTitle("Contact — Villa Rentals Goa");

  const mapUrl = areaMapEmbedUrl("Candolim", 0.02);

  return (
    <>
      <header className="page-head">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <div className="page-head__grid">
            <div>
              <p className="eyebrow">Contact the office</p>
              <h1 className="display-xl page-head__title">
                Tell us your dates. We will tell you what is free.
              </h1>
            </div>
            <p className="lead page-head__lead">
              Enquiries reach the Candolim office, not a call centre. {site.responseNote}. Every
              enquiry gets a written reply with the rate, the deposit and the minimum stay.
            </p>
          </div>
        </div>
      </header>

      <section className="section contact">
        <div className="shell contact__grid">
          <Reveal className="contact__form">
            <h2 className="display-md contact__form-title">Send an enquiry</h2>
            <p className="body-sm contact__form-lead">
              Fields marked with an asterisk are required. Nothing is charged at this stage.
            </p>
            <EnquiryForm properties={properties} idPrefix="contact" />
          </Reveal>

          <Reveal className="contact__aside" delay={80}>
            <div className="channels">
              <h2 className="channels__head">Reach us directly</h2>

              <ul className="channels__list">
                <li>
                  <span className="channels__kicker">Telephone</span>
                  <a className="channels__value" href={site.phoneHref}>
                    {site.phoneLabel}
                  </a>
                  <span className="channels__note">8am – 10pm IST, every day</span>
                </li>
                <li>
                  <span className="channels__kicker">WhatsApp</span>
                  <a
                    className="channels__value"
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Message the team
                  </a>
                  <span className="channels__note">Fastest for photographs and short questions</span>
                </li>
                <li>
                  <span className="channels__kicker">Email</span>
                  <a className="channels__value" href={site.emailHref}>
                    {site.email}
                  </a>
                  <span className="channels__note">Best for group bookings and invoices</span>
                </li>
                <li>
                  <span className="channels__kicker">Office</span>
                  <span className="channels__value channels__value--static">{site.addressLine}</span>
                  <a
                    className="channels__note link-sweep"
                    href={areaMapViewUrl("Candolim")}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Get directions
                  </a>
                </li>
              </ul>
            </div>

            <div className="contact__card contact__card--photo">
              <SafeImage
                src={photo("welcome", "landscape_4_3")}
                alt="A welcome tray with coconut water and towels being placed on a teak table"
                width={1000}
                height={750}
              />
              <p className="body-sm">
                Arriving late? Tell us the flight number and we will arrange the transfer and leave
                the lights on.
              </p>
            </div>

            <div className="contact__card contact__card--note">
              <p className="eyebrow eyebrow--plain">Note on this build</p>
              <p className="body-sm">
                This is a design reference. The enquiry form validates and confirms in the browser,
                but it is not connected to a booking system, so no message leaves this page. For a
                live conversation, use the phone number or WhatsApp link above.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sand" id="faq">
        <div className="shell faq__grid">
          <Reveal className="faq__intro">
            <p className="eyebrow">Good to know</p>
            <h2 className="display-md">Terms, deposits and the practical bits.</h2>
            <p className="body-sm">
              These are the questions that come up before every booking. If yours is not here,
              a quick call usually sorts it.
            </p>
            <ButtonAnchor href={site.phoneHref} variant="outline" size="sm" className="faq__mail">
              Call {site.phoneLabel}
            </ButtonAnchor>
          </Reveal>
          <Reveal className="faq__list" delay={80}>
            <Accordion items={faqs} idPrefix="contact-faq" defaultOpen={null} />
          </Reveal>
        </div>
      </section>

      <section className="section findus">
        <div className="shell findus__grid">
          <div className="findus__copy">
            <p className="eyebrow">Finding us</p>
            <h2 className="display-md">The office, and where we cover.</h2>
            <p className="lead">
              We are on the first floor of a small building off Fort Aguada Road, five minutes from
              Candolim beach. Both coasts are within an hour's drive, which is why we keep everything
              in-house.
            </p>
            <ul className="findus__list">
              <li>
                <span>North Goa</span>
                <span>Candolim, Nerul, Baga, Anjuna, Vagator, Siolim, Assagao</span>
              </li>
              <li>
                <span>South Goa</span>
                <span>Betalbatim, Colva, Varca, Cavelossim, Patnem, Agonda</span>
              </li>
              <li>
                <span>Airports</span>
                <span>
                  Dabolim (GOI) 38 km north · Mopa (GOX) 32 km south — the closest depends on which
                  house you take
                </span>
              </li>
            </ul>
          </div>
          <div className="findus__map">
            {mapUrl ? (
              <div className="map-frame">
                <iframe
                  title="Map showing the office area in Candolim, Goa"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
            <p className="body-sm">
              Exact addresses are shared with your written confirmation, along with the host's mobile
              number.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
