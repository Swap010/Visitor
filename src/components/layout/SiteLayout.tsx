import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { site } from "../../data/site";
import { useScrolled } from "../../lib/hooks";
import { cn } from "../../lib/format";

function WhatsAppFloat() {
  const shown = useScrolled(700);
  return (
    <a
      className={cn("wa-float", shown && "is-shown")}
      href={site.whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      tabIndex={shown ? 0 : -1}
      aria-hidden={shown ? undefined : true}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.55 3.75 1.5 5.28L2 22l5.03-1.65a9.8 9.8 0 0 0 5.01 1.37c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm5.72 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-2.9-.6-2.28-1.02-3.7-3.4-3.82-3.56-.12-.16-.9-1.28-.9-2.44s.6-1.72.83-1.96c.22-.24.48-.3.64-.3l.46.01c.15 0 .35-.06.54.41.2.48.68 1.68.74 1.8.06.12.1.26.01.42-.09.16-.17.26-.33.44-.16.18-.34.4-.44.5-.12.12-.24.25-.1.5.14.24.62 1.02 1.32 1.65.9.8 1.66 1.05 1.9 1.17.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.6-.18 1.27Z"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

export function SiteLayout() {
  return (
    <div className="site" id="top">
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
