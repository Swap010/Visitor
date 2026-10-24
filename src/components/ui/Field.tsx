import type { ReactNode } from "react";
import { cn } from "../../lib/format";

/** Props handed to the control so ids and ARIA stay in sync automatically. */
export type FieldAria = {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  dark?: boolean;
  className?: string;
  children: (aria: FieldAria) => ReactNode;
};

/** Label + control + validation message, wired together with matching ids. */
export function Field({ id, label, required, error, hint, dark, className, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ");

  return (
    <div className={cn("field", dark && "field--dark", className)}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="field__req" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>

      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
      })}

      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}

      {hint ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
