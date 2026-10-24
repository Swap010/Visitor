import { Link } from "react-router-dom";
import { ButtonLink } from "../ui/Button";
import { useDocumentTitle } from "../../lib/hooks";

type NotFoundProps = {
  title?: string;
  message?: string;
};

export function NotFound({
  title = "That page has wandered off the map",
  message = "The link may be broken or the page may have moved. Nothing else is missing — the houses are all still here.",
}: NotFoundProps) {
  useDocumentTitle("Page not found — Villa Rentals Goa");

  return (
    <section className="notfound">
      <div className="shell notfound__inner">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-lg">{title}</h1>
        <p className="lead">{message}</p>
        <div className="notfound__actions">
          <ButtonLink to="/villas" variant="primary" arrow>
            Browse the collection
          </ButtonLink>
          <ButtonLink to="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
        <p className="body-sm notfound__links">
          Or jump straight to <Link className="link-sweep" to="/villas?region=north">North Goa</Link>,{" "}
          <Link className="link-sweep" to="/villas?region=south">South Goa</Link> or{" "}
          <Link className="link-sweep" to="/contact">the contact form</Link>.
        </p>
      </div>
    </section>
  );
}
