import { useState } from "react";
import type { Property } from "../../data/villas";
import { addDays, formatINR, nightsBetween, prettyDate, todayISO } from "../../lib/format";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";

export type BookingRequest = { checkIn: string; checkOut: string; guests: string };

type BookingWidgetProps = {
  property: Property;
  onRequest: (request: BookingRequest) => void;
};

/** Live rate estimate. Rates are indicative sample figures for this build. */
export function BookingWidget({ property: p, onRequest }: BookingWidgetProps) {
  const today = todayISO();
  const [checkIn, setCheckIn] = useState(addDays(today, 14));
  const [checkOut, setCheckOut] = useState(addDays(today, 14 + p.minNights));
  const [guests, setGuests] = useState(Math.min(2, p.sleeps));
  const [touched, setTouched] = useState(false);

  const nights = nightsBetween(checkIn, checkOut);
  const tooShort = nights > 0 && nights < p.minNights;
  const overCapacity = guests > p.sleeps;
  const invalid = nights === 0 || tooShort || overCapacity || checkIn < today;
  const subtotal = p.ratePerNight * nights;

  return (
    <aside className="book" aria-label={`Rate and availability for ${p.name}`}>
      <header className="book__head">
        <p className="price book__price">
          {formatINR(p.ratePerNight)} <span className="price__unit">/ night</span>
        </p>
        <p className="book__sub body-sm">
          Sleeps {p.sleeps} · {p.minNights}-night minimum · GST included
        </p>
      </header>

      <div className="book__fields">
        <Field id="book-in" label="Arrival" required>
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                const v = e.target.value;
                setCheckIn(v);
                setTouched(true);
                if (nightsBetween(v, checkOut) <= 0) setCheckOut(addDays(v, p.minNights));
              }}
            />
          )}
        </Field>

        <Field id="book-out" label="Departure" required>
          {(aria) => (
            <input
              {...aria}
              className="control"
              type="date"
              min={addDays(checkIn, 1)}
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setTouched(true);
              }}
            />
          )}
        </Field>

        <Field
          id="book-guests"
          label="Guests"
          hint={overCapacity ? undefined : `This house sleeps up to ${p.sleeps}.`}
          error={overCapacity ? `Please keep the group to ${p.sleeps} guests, or ask us about a larger villa.` : undefined}
        >
          {(aria) => (
            <select
              {...aria}
              className="control"
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value));
                setTouched(true);
              }}
            >
              {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      {nights > 0 ? (
        <dl className="book__calc">
          <div>
            <dt>
              {formatINR(p.ratePerNight)} × {nights} {nights === 1 ? "night" : "nights"}
            </dt>
            <dd>{formatINR(subtotal)}</dd>
          </div>
          <div>
            <dt>Refundable deposit</dt>
            <dd>{formatINR(p.deposit)}</dd>
          </div>
          <div className="book__total">
            <dt>Estimated total</dt>
            <dd>{formatINR(subtotal)}</dd>
          </div>
        </dl>
      ) : (
        <p className="book__empty body-sm">Choose your dates to see a rate for the stay.</p>
      )}

      {touched && tooShort ? (
        <p className="book__notice" role="status">
          {p.name} has a {p.minNights}-night minimum. Add {p.minNights - nights} more{" "}
          {p.minNights - nights === 1 ? "night" : "nights"} or ask us about shorter stays.
        </p>
      ) : null}

      <Button
        variant="primary"
        block
        arrow
        disabled={invalid}
        onClick={() => onRequest({ checkIn, checkOut, guests: String(guests) })}
      >
        Request these dates
      </Button>

      <p className="book__fine body-sm">
        No payment now. We confirm availability by email or WhatsApp, usually within a few hours.
        {nights > 0 ? ` Your stay: ${prettyDate(checkIn)} – ${prettyDate(checkOut)}.` : ""}
      </p>
    </aside>
  );
}
