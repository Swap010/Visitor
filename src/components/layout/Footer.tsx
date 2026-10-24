import { Link } from "react-router-dom";
import { destinations, site } from "../../data/site";
import { regions } from "../../data/villas";
import { ButtonAnchor } from "../ui/Button";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="foot">
      <div className="shell shell--wide">
        <div className="foot__top">
          <div className="foot__brand">
            <p className="foot__mark">
              <span className="foot__mark-a">Villa Rentals</span>
              <span className="foot__mark-b">Goa</span>
            </p>
            <p className="foot__blurb">
              A small collection of private-pool villas and apartments on the north and south
              coasts, looked after by a team based in Candolim.
            </p>
            <ButtonAnchor href={site.whatsappHref} newTab variant="brass" size="sm" arrow>
              Message us on WhatsApp
            </ButtonAnchor>
          </div>

          <nav className="foot__col" aria-label="Explore">
            <h2 className="foot__head">Explore</h2>
            <ul className="foot__list">
              <li>
                <Link to="/villas">All properties</Link>
              </li>
              <li>
                <Link to="/villas?region=north">North Goa</Link>
              </li>
              <li>
                <Link to="/villas?region=south">South Goa</Link>
              </li>
              <li>
                <Link to="/villas?type=Villa">Private-pool villas</Link>
              </li>
              <li>
                <Link to="/villas?type=Apartment">Apartments</Link>
              </li>
            </ul>
          </nav>

          <nav className="foot__col" aria-label="Destinations">
            <h2 className="foot__head">Areas we cover</h2>
            <ul className="foot__list">
              {destinations.map((d) => (
                <li key={d.name}>
                  <Link to={`/villas?region=${d.region}`}>{d.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot__col">
            <h2 className="foot__head">Enquiries</h2>
            <ul className="foot__list foot__list--contact">
              <li>
                <a href={site.phoneHref}>{site.phoneLabel}</a>
              </li>
              <li>
                <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>{site.addressLine}</li>
              <li>{site.responseNote}</li>
            </ul>
          </div>
        </div>

        <div className="foot__regions">
          {regions.map((r) => (
            <span key={r.value}>{r.label}</span>
          ))}
          <span>Private pools</span>
          <span>Group stays</span>
          <span>Airport transfers</span>
          <span>Cook on request</span>
        </div>

        <div className="foot__base">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="foot__note">
            Design reference build. Property details, rates and contact information shown here
            are illustrative sample content — not live availability.
          </p>
          <a className="foot__top-link" href="#top">
            Back to top <span aria-hidden="true">&#8593;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
