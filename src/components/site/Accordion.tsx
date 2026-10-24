import { useState } from "react";
import type { Faq } from "../../data/site";
import { cn } from "../../lib/format";

type AccordionProps = {
  items: Faq[];
  idPrefix?: string;
  defaultOpen?: number | null;
};

/** Single-open disclosure list with proper button/region wiring. */
export function Accordion({ items, idPrefix = "faq", defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const buttonId = `${idPrefix}-button-${i}`;

        return (
          <div className={cn("acc__item", isOpen && "is-open")} key={item.q}>
            <h3 className="acc__heading">
              <button
                type="button"
                id={buttonId}
                className="acc__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="acc__q">{item.q}</span>
                <span className="acc__sign" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="acc__panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="acc__a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
