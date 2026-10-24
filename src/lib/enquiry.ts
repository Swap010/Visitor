import { nightsBetween, todayISO } from "./format";

export type EnquiryValues = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  property: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  property: "",
  message: "",
  consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE = /^[+]?[\d][\d\s-]{6,17}$/;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const today = todayISO();

  if (!values.name.trim()) errors.name = "Please tell us your name.";
  else if (values.name.trim().length < 2) errors.name = "That name looks too short.";

  if (!values.email.trim()) errors.email = "An email address is required for the confirmation.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "Check the email address — it seems incomplete.";

  if (!values.phone.trim()) errors.phone = "A phone number lets us reach you quickly.";
  else if (!PHONE.test(values.phone.trim())) errors.phone = "Use digits only, with an optional country code.";

  if (!values.checkIn) errors.checkIn = "Choose an arrival date.";
  else if (values.checkIn < today) errors.checkIn = "Arrival cannot be in the past.";

  if (!values.checkOut) errors.checkOut = "Choose a departure date.";
  else if (values.checkIn && values.checkOut <= values.checkIn)
    errors.checkOut = "Departure must be after arrival.";

  const guests = Number(values.guests);
  if (!values.guests || Number.isNaN(guests)) errors.guests = "How many guests are travelling?";
  else if (guests < 1) errors.guests = "At least one guest is required.";
  else if (guests > 20) errors.guests = "For more than twenty guests, please call us directly.";

  if (values.message.length > 900) errors.message = "Please keep this under 900 characters.";

  if (!values.consent) errors.consent = "Please confirm we may contact you about this enquiry.";

  return errors;
}

export type EnquiryResult = {
  reference: string;
  nights: number;
};

/**
 * Demo submit handler. There is no backend attached to this build — the call
 * resolves locally so the form's loading, success and error states can be
 * reviewed. Swap the body for a real `fetch` when a service is connected.
 */
export async function sendEnquiry(
  values: EnquiryValues,
  opts: { shouldFail?: boolean } = {},
): Promise<EnquiryResult> {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  if (opts.shouldFail) {
    throw new Error("We could not send that enquiry. Please try again or call the office.");
  }

  const reference = `VRG-${Math.floor(1000 + Math.random() * 8999)}`;
  return { reference, nights: nightsBetween(values.checkIn, values.checkOut) };
}
