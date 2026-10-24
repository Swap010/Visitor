import type { ReactNode } from "react";
import { cn } from "../../lib/format";

type SectionHeadProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  align?: "start" | "split";
  className?: string;
  titleClass?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  align = "split",
  className,
  titleClass = "display-lg",
}: SectionHeadProps) {
  return (
    <header className={cn("sec-head", align === "split" && "sec-head--split", className)}>
      <div className="sec-head__main">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className={cn(titleClass, "sec-head__title")}>{title}</h2>
        {lead ? <p className="lead sec-head__lead">{lead}</p> : null}
      </div>
      {action ? <div className="sec-head__action">{action}</div> : null}
    </header>
  );
}
