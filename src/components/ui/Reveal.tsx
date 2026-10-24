import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../../lib/hooks";
import { cn } from "../../lib/format";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
};

/** Fades and lifts its children into view once, on scroll. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
