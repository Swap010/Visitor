import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Property } from "../../data/villas";
import { site } from "../../data/site";
import type { EnquiryResult, EnquiryValues } from "../../lib/enquiry";
import { emptyEnquiry, sendEnquiry, validateEnquiry } from "../../lib/enquiry";
import { addDays, formatINR, nightsBetween, prettyDate, todayISO } from "../../lib/format";
import { Button, ButtonAnchor } from "../ui/Button";
import { Field } from "../ui/Field";

type FormStatus = "idle" | "sending" | "sent" | "error";

type EnquiryFormProps = {
  properties: Property[];
  /** Property id to preselect (detail pages lock the choice). */
  lockedProperty?: string;
  prefill?: Partial<EnquiryValues>;
  /** Bump this number to re-apply `prefill`. */
  prefillToken?: number;
  dark?: boolean;
  idPrefix?: string;
};

export function EnquiryForm({
  properties,
  lockedProperty,
  prefill,
  prefillToken = 0,
  dark,
  idPrefix = "enq",
}: EnquiryFormProps) {
  const today = todayISO();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<EnquiryValues>({
    ...emptyEnquiry,
    checkIn: addDays(today, 21),
    checkOut: addDays(today, 24),
    property: lockedProperty ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [failure, setFailure] = useState(false);
  const [forceFail, setForceFail] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);

  useEffect(() => {
    if (!prefill) return;
    setValues((prev) => ({ ...prev, ...prefill, consent: prev.consent }));
    setErrors({});
    setStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillToken]);

  const set = <K extends keyof EnquiryValues>(key: K, v: EnquiryValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const selectedProperty = properties.find((p) => p.id === values.property);
  const nights = nightsBetween(values.checkIn, values.checkOut);
  const tooShort = selectedProperty && nights > 0 && nights < selectedProperty.minNights;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      const firstBad = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstBad?.focus();
      return;
    }

    setStatus("sending");
    setFailure(false);
    try {
      const res = await sendEnquiry(values, { shouldFail: forceFail });
      setResult(res);
      setStatus("sent");
    } catch {
      setFailure(true);
      setStatus("error");
    }
  }

  if (status === "sent" && result) {
    return (
      <div className="enq enq--done" role="status">
        <p className="eyebrow">Enquiry recorded</p>
        <h3 className="display-md enq__thanks">
          Thank you, {values.name.trim().split(" ")[0] || "there"}. We have your dates.
        </h3>
        <p className="lead enq__lead">
          A member of the Candolim team replies to every enquiry by email, and by WhatsApp when you
          leave a number. Reference <strong>{result.reference}</strong> keeps this thread together.
        </p>

        <dl className="enq__receipt">
          <div>
            <dt>Property</dt>
            <dd>{selectedProperty ? selectedProperty.name : "Not yet decided — please advise"}</dd>
          </div>
          <div>
            <dt>Dates</dt>
            <dd>
              {prettyDate(values.checkIn)} – {prettyDate(values.checkOut)}
              {result.nights > 0 ? ` · ${result.nights} nights` : ""}
            </dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>{values.guests}</dd>
          </div>
          <div>
            <dt>Estimate</dt>
            <dd>
              {selectedProperty && result.nights > 0
                ? `${formatINR(selectedProperty.ratePerNight * result.nights)} plus ${formatINR(
                    selectedProperty.deposit,
                  )} refundable deposit`
                : "Confirmed with our reply"}
            </dd>
          </div>
          <div>
            <dt>We will contact</dt>
            <dd>
              {values.email} · {values.phone}
            </dd>
          </div>
        </dl>

        <div className="demo-note">
          <p>
            <strong>Design reference build.</strong> This form does not send data to a server, so no
            enquiry has reached the office and no reply is coming. The reference above exists only
            in this browser session.
          </p>
          <div className="demo-note__actions">
            <ButtonAnchor href={site.phoneHref} variant="outline" size="sm">
              Call {site.phoneLabel}
            </ButtonAnchor>
            <ButtonAnchor href={site.whatsappHref} newTab variant="outline" size="sm">
              WhatsApp
            </ButtonAnchor>
          </div>
        </div>

        <Button
          variant="ghost"
          className="enq__again"
          onClick={() => {
            setValues({ ...emptyEnquiry, checkIn: addDays(today, 21), checkOut: addDays(today, 24), property: lockedProperty ?? "" });
            setResult(null);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form className={dark ? "enq on-dark" : "enq"} ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="enq__grid">
        <Field
          id={`${idPrefix}-name`}
          label="Full name"
          required
          dark={dark}
          error={errors.name}
          className="span-4"
        >
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Anita Fernandes"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
            />
          )}
        </Field>

        <Field
          id={`${idPrefix}-email`}
          label="Email"
          required
          dark={dark}
          error={errors.email}
          className="span-4"
        >
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
            />
          )}
        </Field>

        <Field
          id={`${idPrefix}-phone`}
          label="Phone / WhatsApp"
          required
          dark={dark}
          error={errors.phone}
          hint="Include the country code if you are outside India."
          className="span-4"
        >
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98600 12345"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          )}
        </Field>

        <Field id={`${idPrefix}-in`} label="Arrival" required dark={dark} error={errors.checkIn} className="span-3">
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="date"
              name="checkIn"
              min={today}
              value={values.checkIn}
              onChange={(e) => {
                const v = e.target.value;
                set("checkIn", v);
                if (nightsBetween(v, values.checkOut) <= 0) set("checkOut", addDays(v, 3));
              }}
            />
          )}
        </Field>

        <Field id={`${idPrefix}-out`} label="Departure" required dark={dark} error={errors.checkOut} className="span-3">
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="date"
              name="checkOut"
              min={addDays(values.checkIn || today, 1)}
              value={values.checkOut}
              onChange={(e) => set("checkOut", e.target.value)}
            />
          )}
        </Field>

        <Field id={`${idPrefix}-guests`} label="Guests" required dark={dark} error={errors.guests} className="span-3">
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="number"
              name="guests"
              min={1}
              max={20}
              value={values.guests}
              onChange={(e) => set("guests", e.target.value)}
            />
          )}
        </Field>

        <Field
          id={`${idPrefix}-property`}
          label="Property"
          dark={dark}
          error={errors.property}
          hint={lockedProperty ? undefined : "Leave as “Help me choose” if you would like advice."}
          className="span-3"
        >
          {(aria) =>
            lockedProperty ? (
              <input
                {...aria}
                className="control"
                type="text"
                value={properties.find((p) => p.id === lockedProperty)?.name ?? ""}
                readOnly
              />
            ) : (
              <select
                {...aria}
                className="control"
                name="property"
                value={values.property}
                onChange={(e) => set("property", e.target.value)}
              >
                <option value="">Help me choose</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.area}
                  </option>
                ))}
              </select>
            )
          }
        </Field>

        <Field
          id={`${idPrefix}-message`}
          label="Anything we should know"
          dark={dark}
          error={errors.message}
          hint={`${values.message.length}/900 characters`}
          className="span-12"
        >
          {(aria) => (
            <textarea
              {...aria}
              className="control"
              name="message"
              placeholder="Travelling with two toddlers, would like a cook for breakfast, arriving on a late flight…"
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
            />
          )}
        </Field>
      </div>

      {tooShort && selectedProperty ? (
        <p className="enq__notice" role="status">
          {selectedProperty.name} has a {selectedProperty.minNights}-night minimum stay. We can still
          check short breaks — just mention it in your message.
        </p>
      ) : null}

      <div className="enq__consent">
        <input
          id={`${idPrefix}-consent`}
          type="checkbox"
          checked={values.consent}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? `${idPrefix}-consent-error` : undefined}
          onChange={(e) => set("consent", e.target.checked)}
        />
        <label htmlFor={`${idPrefix}-consent`}>
          You may contact me about this enquiry by email, phone or WhatsApp.
        </label>
      </div>
      {errors.consent ? (
        <p className="field__error" id={`${idPrefix}-consent-error`} role="alert">
          {errors.consent}
        </p>
      ) : null}

      {status === "error" && failure ? (
        <div className="enq__alert" role="alert">
          <p>
            We could not send that enquiry. Nothing has been lost — your details are still in the
            form. Try again, or call {site.phoneLabel}.
          </p>
          <Button variant="outline" size="sm" type="submit">
            Try again
          </Button>
        </div>
      ) : null}

      <div className="enq__submit">
        <Button variant={dark ? "brass" : "primary"} type="submit" disabled={busy} arrow>
          {busy ? "Sending…" : "Send enquiry"}
        </Button>
        {busy ? <span className="spin" aria-hidden="true" /> : null}
        <p className="enq__fine body-sm">
          {site.responseNote}. We never pass your details to a third party.
        </p>
      </div>

      <div className="demo-note demo-note--slim">
        <label>
          <input
            type="checkbox"
            checked={forceFail}
            onChange={(e) => setForceFail(e.target.checked)}
          />
          <span>Preview the failed-send state (build preview only)</span>
        </label>
      </div>
    </form>
  );
}
