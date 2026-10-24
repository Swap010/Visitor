import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems, site } from "../../data/site";
import { useScrollLock, useScrolled } from "../../lib/hooks";
import { cn } from "../../lib/format";
import { ButtonLink } from "../ui/Button";

function Wordmark({ tone }: { tone: "light" | "dark" }) {
  return (
    <span className={cn("brand", `brand--${tone}`)}>
      <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M16 3c6.1 5 9.6 10 9.6 15.1S21.5 26.9 16 29.6c-5.5-2.7-9.6-6.4-9.6-11.5S10 8 16 3Z"
          fill="currentColor"
        />
        <path d="M16 11v15" stroke="var(--c-ink)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="brand__text">
        <span className="brand__name">{site.wordmark}</span>
        <span className="brand__accent">{site.wordmarkAccent}</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const location = useLocation();
  const scrolled = useScrolled(56);
  // The drawer is keyed to the current route, so navigating closes it without
  // needing an effect that reacts to the route change.
  const routeKey = `${location.pathname}${location.search}`;
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === routeKey;
  const setOpen = (value: boolean) => setOpenFor(value ? routeKey : null);

  const isHome = location.pathname === "/";
  const overHero = isHome && !scrolled;
  const tone: "light" | "dark" = overHero ? "light" : "dark";

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (to: string) => {
    const [path, search] = to.split("?");
    if (location.pathname !== path) return false;
    if (!search) return location.search === "";
    return location.search.includes(search);
  };

  return (
    <>
      <header className={cn("nav", overHero && "nav--over-hero", scrolled && "nav--pinned")}>
        <div className="shell shell--wide nav__inner">
          <Link to="/" className="nav__brand" aria-label={`${site.name} — home`}>
            <Wordmark tone={tone} />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn("nav__link", isActive(item.to) && "is-active")}
                aria-current={isActive(item.to) ? "page" : undefined}
              >
                <span className="link-sweep">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__phone" href={site.phoneHref}>
              {site.phoneLabel}
            </a>
            <ButtonLink to="/villas" variant={overHero ? "brass" : "primary"} size="sm">
              Check availability
            </ButtonLink>
          </div>

          <button
            type="button"
            className={cn("nav__burger", open && "is-open")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span className={cn("nav__burger-bars", tone === "light" && "is-light")} aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </header>

      <div
        className={cn("drawer", open && "is-open")}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <div className="drawer__top">
          <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <Wordmark tone="light" />
          </Link>
          <button type="button" className="drawer__close" onClick={() => setOpen(false)}>
            <span aria-hidden="true">&#10005;</span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Mobile">
          {navItems.map((item, i) => (
            <Link key={item.to} to={item.to} className="drawer__link">
              <span className="drawer__num">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="drawer__foot">
          <ButtonLink to="/contact" variant="brass" block arrow>
            Start an enquiry
          </ButtonLink>
          <dl className="drawer__contact">
            <div>
              <dt>Call</dt>
              <dd>
                <a href={site.phoneHref}>{site.phoneLabel}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={site.emailHref}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{site.responseNote}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
