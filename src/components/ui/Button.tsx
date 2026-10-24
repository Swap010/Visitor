import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/format";

type Variant = "primary" | "ink" | "brass" | "outline" | "ghost";
type Size = "md" | "sm";

type Style = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function buttonClass({ variant = "ink", size = "md", block, className }: Omit<Style, "children">) {
  return cn(
    "btn",
    `btn--${variant}`,
    size === "sm" && "btn--small",
    block && "btn--block",
    className,
  );
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="btn__arrow" aria-hidden="true">
          &#8594;
        </span>
      ) : null}
    </>
  );
}

export function Button({
  variant,
  size,
  block,
  arrow,
  className,
  children,
  ...rest
}: Style & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass({ variant, size, block, className })} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({ to, variant, size, block, arrow, className, children }: Style & { to: string }) {
  return (
    <Link to={to} className={buttonClass({ variant, size, block, className })}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function ButtonAnchor({
  href,
  variant,
  size,
  block,
  arrow,
  className,
  children,
  newTab,
}: Style & { href: string; newTab?: boolean }) {
  return (
    <a
      href={href}
      className={buttonClass({ variant, size, block, className })}
      {...(newTab ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}
