/**
 * Company narrative & marketing content — single source of truth for the
 * About page, stats bands, timeline, values, team and FAQ. Edit here.
 */

export type Stat = {
  /** Numeric value for the count-up animation. */
  value: number;
  /** Optional suffix rendered after the number (e.g. "+", "k", "/5"). */
  suffix?: string;
  /** Optional prefix (e.g. "★"). */
  prefix?: string;
  label: string;
  /** Decimal places to display (for ratings like 4.9). */
  decimals?: number;
};

export const companyStats: Stat[] = [
  { value: 25000, suffix: "+", label: "Adventures delivered" },
  { value: 19000, suffix: "+", label: "Happy riders" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average rating" },
  { value: 11, suffix: " yrs", label: "In the dunes" },
];

export const aboutStats: Stat[] = [
  { value: 25000, suffix: "+", label: "Bookings completed" },
  { value: 19000, suffix: "+", label: "Satisfied customers" },
  { value: 38, suffix: "", label: "Certified guides" },
  { value: 12, suffix: "", label: "Machines in the fleet" },
  { value: 1500, suffix: "+", label: "5-star reviews" },
  { value: 100, suffix: "%", label: "Safety record" },
];

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export const milestones: Milestone[] = [
  {
    year: "2014",
    title: "Three quads and a dream",
    body: "Founded in the Lahbab red dunes with a handful of quad bikes and an obsession for doing desert tours the right way — safe, premium, unforgettable.",
  },
  {
    year: "2016",
    title: "The fleet grows",
    body: "Added our first dune buggies and crossed 1,000 riders. Word spread fast across Dubai's adventure scene.",
  },
  {
    year: "2018",
    title: "Sunset safaris & camp",
    body: "Launched the signature Sunset Desert Safari with a Bedouin-style camp, camel rides and live-fire BBQ under the stars.",
  },
  {
    year: "2020",
    title: "Resilience & reinvention",
    body: "Weathered a quiet world by going private — bespoke family and small-group experiences with the dunes all to yourself.",
  },
  {
    year: "2022",
    title: "Big-bore era",
    body: "Brought in the Can-Am Maverick X3 Turbo and big-bore Polaris machines, plus a dedicated MX track for experienced riders.",
  },
  {
    year: "2024",
    title: "20,000th rider",
    body: "Welcomed our 20,000th guest and launched a slick new booking platform — slot, slide, ride in under a minute.",
  },
  {
    year: "Today",
    title: "The desert standard",
    body: "12 machines, 38 certified guides and a 4.9★ rating across 1,500+ reviews. We're just getting started.",
  },
];

export type Value = {
  icon: "shield" | "gem" | "compass" | "leaf";
  title: string;
  body: string;
};

export const values: Value[] = [
  {
    icon: "shield",
    title: "Safety, always first",
    body: "Certified guides, fully-maintained machines, full safety gear and a thorough briefing before every ride. A 100% safety record we guard fiercely.",
  },
  {
    icon: "gem",
    title: "A premium fleet",
    body: "From 250cc starter quads to the turbocharged X3, every machine is meticulously serviced and replaced on a strict schedule.",
  },
  {
    icon: "compass",
    title: "Local expertise",
    body: "A decade reading these dunes. Our guides know every crest, bowl and golden-hour line in the Lahbab and Al Qudra deserts.",
  },
  {
    icon: "leaf",
    title: "Respect for the desert",
    body: "We tread lightly — designated trails, leave-no-trace camps and a genuine love for the landscape that gives us everything.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Unsplash photo id (portrait). */
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Khalid Al-Rashid",
    role: "Founder & Lead Guide",
    bio: "Started with three quads in 2014. Still leads the toughest sunrise rides personally.",
    photo: "1500648767791-00dcc994a43e",
  },
  {
    name: "Sara Mendoza",
    role: "Head of Operations",
    bio: "Keeps 38 guides and 12 machines running like clockwork, seven days a week.",
    photo: "1494790108377-be9c29b29330",
  },
  {
    name: "James Okoro",
    role: "Chief Safety Officer",
    bio: "Ex-motorsport marshal. Owns our 100% safety record and every briefing standard.",
    photo: "1507003211169-0a1dd7228f2d",
  },
  {
    name: "Aisha Khan",
    role: "Guest Experience Lead",
    bio: "Makes sure every rider leaves with a story and a reason to come back.",
    photo: "1438761681033-6461ffad8d80",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need a licence or experience?",
    a: "Not for our beginner and intermediate experiences — full training is included and our guides lead every ride. Advanced quad/buggy sessions and the MX track require prior experience, which is noted clearly on each experience page.",
  },
  {
    q: "What should I wear and bring?",
    a: "Closed-toe shoes, comfortable clothing you don't mind getting dusty, and sunglasses. We provide helmets, goggles and gloves. Bring sunscreen and a sense of adventure.",
  },
  {
    q: "Is hotel pickup included?",
    a: "Yes — most experiences include complimentary pickup and drop-off across Dubai zones. You'll confirm your pickup point during booking.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Free rescheduling up to 24 hours before your slot. Cancellations within 24 hours are non-refundable. Weather disruptions are always rescheduled or refunded in full.",
  },
  {
    q: "Are the experiences safe for families?",
    a: "Absolutely. Our beginner quads, camel rides, sandboarding and sunset safaris are family favourites. Minimum age and participant ranges are listed on each experience.",
  },
  {
    q: "How do payments work?",
    a: "Secure checkout via Stripe — card, Apple Pay and Google Pay. You'll get instant confirmation by email with all your booking and pickup details.",
  },
];

export type Partner = { name: string };

/** Trust / press strip — rendered as styled wordmarks. */
export const partners: Partner[] = [
  { name: "TripAdvisor" },
  { name: "GetYourGuide" },
  { name: "Visit Dubai" },
  { name: "Viator" },
  { name: "Klook" },
  { name: "Expedia" },
];

export const pressQuotes: { quote: string; source: string }[] = [
  { quote: "The gold standard for desert adventures in Dubai.", source: "Time Out Dubai" },
  { quote: "A flawless, adrenaline-packed afternoon.", source: "TripAdvisor · Travellers' Choice" },
  { quote: "Premium machines, world-class guides.", source: "Visit Dubai" },
];
