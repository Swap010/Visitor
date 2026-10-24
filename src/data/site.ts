/** Site-wide content: navigation, contact details, editorial copy and FAQs. */

export const site = {
  name: "Villa Rentals Goa",
  wordmark: "Villa Rentals",
  wordmarkAccent: "Goa",
  tagline: "Private-pool stays in North & South Goa",
  phoneLabel: "+91 98600 12345",
  phoneHref: "tel:+919860012345",
  whatsappHref: "https://wa.me/919860012345",
  email: "stay@villarentalsgoa.com",
  emailHref: "mailto:stay@villarentalsgoa.com",
  addressLine: "Office off Fort Aguada Road, Candolim, Bardez, North Goa 403515",
  responseNote: "Enquiries answered 8am – 10pm IST, every day",
} as const;

export type NavItem = { label: string; to: string };

export const navItems: NavItem[] = [
  { label: "Villas & Apartments", to: "/villas" },
  { label: "North Goa", to: "/villas?region=north" },
  { label: "South Goa", to: "/villas?region=south" },
  { label: "How we work", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export type Destination = {
  name: string;
  region: "north" | "south";
  blurb: string;
  detail: string;
  photoKey:
    | "lane"
    | "southBeach"
    | "beach"
    | "terrace"
    | "portico"
    | "streetscooter"
    | "garden"
    | "apartmentBlock";
};

export const destinations: Destination[] = [
  {
    name: "Candolim & Nerul",
    region: "north",
    blurb: "Fort Aguada, beach shacks, everything walkable.",
    detail:
      "Candolim suits first-time visitors: the beach is wide and swimmable either side of the monsoon, restaurants run from fish thali to wood-fired pizza, and most of our houses are a short walk from the sand.",
    photoKey: "lane",
  },
  {
    name: "Anjuna, Vagator & Assagao",
    region: "north",
    blurb: "Red cliffs, quieter lanes, the best dinners.",
    detail:
      "North of Baga the coast turns to laterite cliffs and the villages slow right down. Assagao has become the dining belt of Goa, and homes here sit among mango trees yet stay twenty minutes from the beach.",
    photoKey: "portico",
  },
  {
    name: "Cavelossim & Varca",
    region: "south",
    blurb: "Long empty sand, river on one side.",
    detail:
      "The Sal river meets the sea here, so you get a wide quiet beach, backwater boat trips at sunset, and traffic that never really appears. Ideal for families and anyone who wants distance from the party belt.",
    photoKey: "southBeach",
  },
  {
    name: "Patnem & Agonda",
    region: "south",
    blurb: "Slow south, casuarina and empty mornings.",
    detail:
      "Southernmost Canacona is the Goan coast at walking pace — beachfront cafes that close when they feel like it, turtles nesting in season, and little else to do besides swim, read and eat well.",
    photoKey: "beach",
  },
];

/** Approximate centre points of the areas we cover, used for the maps. */
export const areaCoords: Record<string, { lat: number; lng: number }> = {
  Candolim: { lat: 15.5158, lng: 73.7709 },
  Anjuna: { lat: 15.586, lng: 73.7407 },
  Assagao: { lat: 15.5965, lng: 73.771 },
  Siolim: { lat: 15.62, lng: 73.76 },
  Baga: { lat: 15.5553, lng: 73.7517 },
  Vagator: { lat: 15.6, lng: 73.735 },
  Cavelossim: { lat: 15.172, lng: 73.941 },
  Betalbatim: { lat: 15.283, lng: 73.925 },
  Varca: { lat: 15.223, lng: 73.933 },
  Patnem: { lat: 15.013, lng: 73.918 },
  Agonda: { lat: 15.043, lng: 73.989 },
};

export type Principle = {
  index: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    index: "01",
    title: "We have been inside every house",
    body: "Each property on this site has been visited and slept in by our team. We check the mattress, the water pressure, the air conditioning and how far the beach actually is on foot — before it is listed.",
  },
  {
    index: "02",
    title: "One rate, written down",
    body: "The nightly rate you see includes GST and housekeeping. Security deposit, extra guest charges and the minimum stay are stated on each property page, so nothing arrives as a surprise at check-out.",
  },
  {
    index: "03",
    title: "A local person answers",
    body: "Enquiries reach the Candolim team, not a call centre. The same people who confirm your dates meet you at the gate, hand over the keys and stay reachable on WhatsApp for the length of your stay.",
  },
  {
    index: "04",
    title: "Matched to your group",
    body: "Tell us who is travelling — three couples, two families with toddlers, a group of twelve — and we will steer you towards the houses that work, and politely away from the ones that do not.",
  },
];

export type Step = {
  index: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    index: "01",
    title: "Send an enquiry",
    body: "Share your dates, the number of guests and the area you have in mind. The form takes a minute; a WhatsApp message takes less.",
  },
  {
    index: "02",
    title: "We check the calendar",
    body: "You get a written answer within a few hours — availability, the nightly rate with GST, deposit terms and two or three alternatives if your first choice is booked.",
  },
  {
    index: "03",
    title: "Confirm and pay",
    body: "A 30% advance holds the dates, the balance 48 hours before arrival. UPI, bank transfer or an international card link, whichever suits you.",
  },
  {
    index: "04",
    title: "Arrive and settle in",
    body: "Our local host meets you with the keys and a short walk-through. Someone is on the phone for the rest of the stay, from extra towels to a taxi at 5am.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is included in the nightly rate?",
    a: "The rate shown on each property page covers the whole house, GST, daily housekeeping and pool care. Electricity is included up to a fair-use allowance on the larger villas; anything beyond that is metered and billed at cost.",
  },
  {
    q: "How do I confirm a booking?",
    a: "We hold dates for 24 hours once we have replied to your enquiry. A 30% advance confirms the booking and the remaining balance is due 48 hours before check-in. You receive a written confirmation with the address, host name and contact numbers.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Standard check-in is 2pm and check-out is 11am. Early check-in and late check-out depend on the housekeeper's schedule, so ask and we will tell you honestly whether it is possible.",
  },
  {
    q: "Do you need identification for every guest?",
    a: "Yes. Every adult guest must present a government photo ID at check-in, and foreign nationals must also carry a valid visa. We submit the guest register as required by the local authorities.",
  },
  {
    q: "Is a security deposit required?",
    a: "A refundable deposit of ₹10,000 to ₹25,000 applies depending on the size of the house. It is returned by bank transfer within three working days of check-out, less any damage or metered overage.",
  },
  {
    q: "Can we hold a party or a small event?",
    a: "Some houses allow dinners and small celebrations and some do not — it also depends on neighbours and the sound rules after 10pm. Tell us the plan and we will point you to the properties that can host it properly.",
  },
  {
    q: "Do you arrange airport transfers, cabs and a cook?",
    a: "Yes. Airport transfers, self-drive car or scooter rental, a cook for a few meals and a babysitter can all be arranged before you land. These are billed separately and paid directly to the provider.",
  },
  {
    q: "What happens if we cancel?",
    a: "Cancellation terms are listed on the confirmation. As a rule, more than 30 days before arrival is fully refundable less a processing fee, 15 to 30 days refunds half the advance, and inside 15 days the advance is retained.",
  },
];

/** Amenity vocabulary used across the property catalogue. */
export const amenityGroups = [
  "Private pool",
  "Shared pool",
  "Plunge pool",
  "Air conditioning",
  "Housekeeping daily",
  "Wi-Fi 200 Mbps",
  "Power backup",
  "Fully equipped kitchen",
  "Cook on request",
  "Washing machine",
  "Free parking",
  "Caretaker on site",
  "Barbecue",
  "Outdoor shower",
  "Balcony",
  "Sea view",
  "Paddy field view",
  "Gated community",
  "Pet friendly",
  "Wheelchair accessible",
];
