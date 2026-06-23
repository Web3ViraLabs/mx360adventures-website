import { unsplash, PHOTOS } from "@/lib/images";
import type { Category, Difficulty } from "./schema";

export type SeedSlot = {
  startTime: string; // "06:00"
  label: string;
  capacity: number;
};

export type SeedExperience = {
  slug: string;
  title: string;
  category: Category;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  basePriceAed: number; // per participant / rider
  durationMins: number;
  difficulty: Difficulty;
  minParticipants: number;
  maxParticipants: number;
  location: string;
  heroImage: string;
  gallery: string[];
  included: string[];
  excluded: string[];
  vehicles: { model: string; cc: number }[];
  rating: string;
  reviewCount: number;
  featured: boolean;
  sortOrder: number;
  slots: SeedSlot[];
};

// Common slot sets — desert tours run early/late to dodge midday heat.
const RIDE_SLOTS: SeedSlot[] = [
  { startTime: "06:30", label: "Sunrise", capacity: 12 },
  { startTime: "09:00", label: "Morning", capacity: 12 },
  { startTime: "16:00", label: "Golden hour", capacity: 12 },
  { startTime: "17:30", label: "Sunset", capacity: 10 },
];

const SAFARI_SLOTS: SeedSlot[] = [
  { startTime: "14:30", label: "Afternoon → Sunset", capacity: 20 },
  { startTime: "15:30", label: "Late afternoon", capacity: 20 },
];

const STD_INCLUDED = [
  "Pickup & drop-off (Dubai zones)",
  "Safety briefing & training lap",
  "Helmet, goggles & gloves",
  "Fully-insured certified guide",
  "Bottled water",
];

/**
 * Tiered placeholder pricing scaled by vehicle power — EDIT THESE.
 * All prices are whole AED per participant/rider.
 */
export const seedExperiences: SeedExperience[] = [
  // ---------------------------------------------------------------- QUAD
  {
    slug: "quad-dune-rookie",
    title: "Dune Rookie Quad Safari",
    category: "quad",
    tagline: "Your first throttle in the sand",
    shortDescription:
      "An easy-going intro on automatic 250–300cc quads. No experience needed — just grip and grin.",
    longDescription:
      "The perfect first taste of the dunes. After a hands-on safety briefing and a training lap on the flats, your guide leads you on a gentle loop through rolling sand on automatic quad bikes. Ideal for families, beginners and anyone who wants the desert thrill without the intensity.",
    basePriceAed: 150,
    durationMins: 30,
    difficulty: "beginner",
    minParticipants: 1,
    maxParticipants: 6,
    location: "Al Qudra Desert, Dubai",
    heroImage: unsplash(PHOTOS.dunesWarm),
    gallery: [unsplash(PHOTOS.offroad), unsplash(PHOTOS.dunesTracks), unsplash(PHOTOS.dunesRipple)],
    included: STD_INCLUDED,
    excluded: ["Personal insurance upgrade", "Photos & videos (add-on)"],
    vehicles: [
      { model: "Kimco", cc: 250 },
      { model: "Loyunsin", cc: 300 },
    ],
    rating: "4.8",
    reviewCount: 214,
    featured: false,
    sortOrder: 10,
    slots: RIDE_SLOTS,
  },
  {
    slug: "quad-grizzly-trail",
    title: "Grizzly Trail Quad Ride",
    category: "quad",
    tagline: "Step up the power",
    shortDescription:
      "A 60-minute guided ride on 350cc quads with bigger dunes and faster lines.",
    longDescription:
      "For riders ready to graduate from the basics. The Yamaha Grizzly 350 and Cobra 350 give you real torque to climb steeper faces and carry speed through the bowls. Your guide reads the terrain and opens up the throttle on the safe stretches.",
    basePriceAed: 260,
    durationMins: 60,
    difficulty: "intermediate",
    minParticipants: 1,
    maxParticipants: 6,
    location: "Lahbab Desert, Dubai",
    heroImage: unsplash(PHOTOS.dunesTracks),
    gallery: [unsplash(PHOTOS.offroad), unsplash(PHOTOS.dunesShadow), unsplash(PHOTOS.dunesVast)],
    included: STD_INCLUDED,
    excluded: ["Personal insurance upgrade", "Photos & videos (add-on)"],
    vehicles: [
      { model: "Yamaha Grizzly", cc: 350 },
      { model: "Cobra", cc: 350 },
    ],
    rating: "4.9",
    reviewCount: 156,
    featured: false,
    sortOrder: 20,
    slots: RIDE_SLOTS,
  },
  {
    slug: "quad-raptor-rush",
    title: "Raptor 700 Rush",
    category: "quad",
    tagline: "The sport quad that bites",
    shortDescription:
      "60 minutes of pure adrenaline on the legendary Yamaha Raptor 700 sport quad.",
    longDescription:
      "Our flagship quad experience. The Raptor 700 is a true sport machine — light, vicious and built to fly across the crest of a dune. Reserved for confident riders, this session is all about throttle, air and the kind of grin that lasts for days.",
    basePriceAed: 350,
    durationMins: 60,
    difficulty: "advanced",
    minParticipants: 1,
    maxParticipants: 4,
    location: "Lahbab Desert, Dubai",
    heroImage: unsplash(PHOTOS.offroad),
    gallery: [unsplash(PHOTOS.dunesAerial), unsplash(PHOTOS.dunesTracks), unsplash(PHOTOS.dunesSunset)],
    included: STD_INCLUDED,
    excluded: ["Beginners (intermediate+ only)", "Photos & videos (add-on)"],
    vehicles: [{ model: "Yamaha Raptor", cc: 700 }],
    rating: "5.0",
    reviewCount: 98,
    featured: true,
    sortOrder: 30,
    slots: RIDE_SLOTS,
  },

  // --------------------------------------------------------------- BUGGY
  {
    slug: "buggy-maverick-storm",
    title: "Maverick Storm Dune Buggy",
    category: "buggy",
    tagline: "Two seats, one storm",
    shortDescription:
      "Side-by-side 1000cc buggy with roll cage and harnesses. Drive it yourself, no licence needed off-road.",
    longDescription:
      "Climb into a Can-Am Maverick or Polaris RZR 1000, strap into the four-point harness and take the wheel. These caged side-by-sides are forgiving enough for first-timers yet fast enough to thrill. Bring a passenger — the second seat is included.",
    basePriceAed: 600,
    durationMins: 60,
    difficulty: "intermediate",
    minParticipants: 1,
    maxParticipants: 2,
    location: "Lahbab Desert, Dubai",
    heroImage: unsplash(PHOTOS.desertRoad),
    gallery: [unsplash(PHOTOS.offroad), unsplash(PHOTOS.dunesWide), unsplash(PHOTOS.dunesShadow)],
    included: [...STD_INCLUDED, "Up to 2 seats per buggy"],
    excluded: ["Fuel surcharge on extended routes", "Photos & videos (add-on)"],
    vehicles: [
      { model: "Can-Am Maverick", cc: 1000 },
      { model: "Polaris RZR", cc: 1000 },
    ],
    rating: "4.9",
    reviewCount: 132,
    featured: false,
    sortOrder: 40,
    slots: RIDE_SLOTS,
  },
  {
    slug: "buggy-x3-apex",
    title: "Can-Am X3 Apex Turbo",
    category: "buggy",
    tagline: "Turbocharged dune domination",
    shortDescription:
      "The turbo Can-Am Maverick X3 — the most capable buggy in our fleet. For drivers who want it all.",
    longDescription:
      "The Maverick X3 Turbo is the apex predator of the dunes: factory turbo power, long-travel suspension and a chassis that eats big jumps for breakfast. This is the buggy the pros choose. Confident drivers only — and yes, it's as fast as it looks.",
    basePriceAed: 780,
    durationMins: 60,
    difficulty: "advanced",
    minParticipants: 1,
    maxParticipants: 2,
    location: "Lahbab Desert, Dubai",
    heroImage: unsplash(PHOTOS.dunesAerial),
    gallery: [unsplash(PHOTOS.desertRoad), unsplash(PHOTOS.dunesSunset), unsplash(PHOTOS.dunesVast)],
    included: [...STD_INCLUDED, "Up to 2 seats per buggy"],
    excluded: ["Beginners (advanced only)", "Fuel surcharge on extended routes"],
    vehicles: [
      { model: "Can-Am Maverick X3", cc: 1000 },
      { model: "Can-Am Maverick Turbo", cc: 1000 },
    ],
    rating: "5.0",
    reviewCount: 87,
    featured: true,
    sortOrder: 50,
    slots: RIDE_SLOTS,
  },
  {
    slug: "buggy-polaris-beast",
    title: "Polaris Beast 2500",
    category: "buggy",
    tagline: "Big-bore family firepower",
    shortDescription:
      "A 2000–2500cc Polaris built for up to four. Maximum power, maximum seats, maximum desert.",
    longDescription:
      "When you want to bring the whole crew and still feel the shove of serious displacement, the big-bore Polaris is the answer. Up to four seats inside a full roll cage, with enough grunt to power up the tallest faces in the Lahbab dune belt.",
    basePriceAed: 950,
    durationMins: 90,
    difficulty: "advanced",
    minParticipants: 1,
    maxParticipants: 4,
    location: "Lahbab Desert, Dubai",
    heroImage: unsplash(PHOTOS.dunesWide),
    gallery: [unsplash(PHOTOS.desertRoad), unsplash(PHOTOS.dunesShadow), unsplash(PHOTOS.offroad)],
    included: [...STD_INCLUDED, "Up to 4 seats per buggy"],
    excluded: ["Fuel surcharge on extended routes", "Photos & videos (add-on)"],
    vehicles: [
      { model: "Polaris", cc: 2000 },
      { model: "Polaris", cc: 2500 },
      { model: "CFMoto", cc: 1000 },
    ],
    rating: "4.9",
    reviewCount: 64,
    featured: true,
    sortOrder: 60,
    slots: RIDE_SLOTS,
  },

  // ------------------------------------------------------------------ MX
  {
    slug: "mx-open-desert",
    title: "Open Desert MX Session",
    category: "mx",
    tagline: "Bring your skills — we bring the bikes",
    shortDescription:
      "90 minutes of open desert on a 450cc motocross bike. Experienced riders only.",
    longDescription:
      "No training wheels here. Pick your weapon — KTM, Gas Gas, Yamaha YZ or Honda CRF 450 — and ride open desert tracks with a lead rider who knows every line. This session is strictly for riders who already know how to handle a dirt bike. A 300cc Progasi is available for lighter riders.",
    basePriceAed: 450,
    durationMins: 90,
    difficulty: "expert",
    minParticipants: 1,
    maxParticipants: 5,
    location: "Al Faya Desert, Sharjah",
    heroImage: unsplash(PHOTOS.dunesShadow),
    gallery: [unsplash(PHOTOS.offroad), unsplash(PHOTOS.dunesTracks), unsplash(PHOTOS.dunesVast)],
    included: [
      "450cc motocross bike",
      "Helmet, goggles, gloves & body armour",
      "Lead rider / guide",
      "Bottled water",
    ],
    excluded: ["Beginners (expert riders only)", "Pickup (meet at staging area)"],
    vehicles: [
      { model: "KTM", cc: 450 },
      { model: "Gas Gas", cc: 450 },
      { model: "Yamaha YZ", cc: 450 },
      { model: "Honda CRF", cc: 450 },
      { model: "Progasi", cc: 300 },
    ],
    rating: "4.9",
    reviewCount: 41,
    featured: false,
    sortOrder: 70,
    slots: [
      { startTime: "06:30", label: "Sunrise", capacity: 6 },
      { startTime: "16:30", label: "Golden hour", capacity: 6 },
    ],
  },

  // -------------------------------------------------------------- SAFARI
  {
    slug: "sunset-desert-safari",
    title: "Sunset Desert Safari & BBQ",
    category: "safari",
    tagline: "The timeless desert evening",
    shortDescription:
      "Dune bashing, camel rides, sandboarding and a live-fire BBQ under the stars.",
    longDescription:
      "Our signature evening. A 4x4 dune-bashing thrill ride delivers you to a Bedouin-style camp where you'll ride camels, carve down dunes on a sandboard, watch the sun melt into the sand, then feast on a grilled BBQ buffet beneath the stars with live entertainment.",
    basePriceAed: 250,
    durationMins: 360,
    difficulty: "beginner",
    minParticipants: 2,
    maxParticipants: 20,
    location: "Lahbab Red Dunes, Dubai",
    heroImage: unsplash(PHOTOS.dunesSunset),
    gallery: [unsplash(PHOTOS.camel), unsplash(PHOTOS.campfire), unsplash(PHOTOS.desertNight)],
    included: [
      "Hotel pickup & drop-off",
      "4x4 dune bashing",
      "Camel ride & sandboarding",
      "BBQ buffet dinner (veg & halal)",
      "Live shows & shisha corner",
    ],
    excluded: ["Alcoholic beverages", "Quad/buggy add-ons"],
    vehicles: [],
    rating: "4.8",
    reviewCount: 512,
    featured: true,
    sortOrder: 80,
    slots: SAFARI_SLOTS,
  },
  {
    slug: "morning-camel-sandboard",
    title: "Morning Camel Ride & Sandboarding",
    category: "safari",
    tagline: "Quiet dunes, cool air",
    shortDescription:
      "A calmer morning in the dunes: camel trekking and sandboarding before the heat.",
    longDescription:
      "Beat the crowds and the heat. This relaxed morning experience pairs a guided camel trek across cool dawn sand with a sandboarding session down the soft faces. Perfect for families and photographers chasing the golden morning light.",
    basePriceAed: 180,
    durationMins: 120,
    difficulty: "beginner",
    minParticipants: 2,
    maxParticipants: 15,
    location: "Al Qudra Desert, Dubai",
    heroImage: unsplash(PHOTOS.camel),
    gallery: [unsplash(PHOTOS.dunesWarm), unsplash(PHOTOS.dunesMinimal), unsplash(PHOTOS.dunesPeople)],
    included: ["Hotel pickup & drop-off", "Camel trek", "Sandboard & instruction", "Refreshments"],
    excluded: ["Meals", "Quad/buggy add-ons"],
    vehicles: [],
    rating: "4.7",
    reviewCount: 188,
    featured: false,
    sortOrder: 90,
    slots: [
      { startTime: "06:00", label: "Dawn", capacity: 15 },
      { startTime: "08:00", label: "Early morning", capacity: 15 },
    ],
  },

  // --------------------------------------------------------------- COMBO
  {
    slug: "combo-raptor-safari",
    title: "Raptor Quad + Sunset Safari Combo",
    category: "combo",
    tagline: "The whole desert, one booking",
    shortDescription:
      "A 30-min Raptor 700 quad blast, then the full sunset safari with BBQ. Best value of the day.",
    longDescription:
      "Why choose? Start with a 30-minute adrenaline hit on the Raptor 700 sport quad, then roll straight into our signature Sunset Desert Safari — camel rides, sandboarding, the sunset and a full BBQ feast. The complete desert day, bundled at our best value.",
    basePriceAed: 420,
    durationMins: 420,
    difficulty: "intermediate",
    minParticipants: 2,
    maxParticipants: 10,
    location: "Lahbab Red Dunes, Dubai",
    heroImage: unsplash(PHOTOS.dunesAerial),
    gallery: [unsplash(PHOTOS.offroad), unsplash(PHOTOS.dunesSunset), unsplash(PHOTOS.campfire)],
    included: [
      "30-min Raptor 700 quad session",
      "Full sunset safari + dune bashing",
      "Camel ride & sandboarding",
      "BBQ buffet dinner",
      "Hotel pickup & drop-off",
    ],
    excluded: ["Alcoholic beverages", "Photos & videos (add-on)"],
    vehicles: [{ model: "Yamaha Raptor", cc: 700 }],
    rating: "5.0",
    reviewCount: 73,
    featured: true,
    sortOrder: 100,
    slots: [{ startTime: "15:00", label: "Afternoon → Sunset", capacity: 10 }],
  },
];

/** Stable fallback id for an experience when no DB is connected. */
export const fallbackExperienceId = (slug: string) => slug;
/** Stable fallback id for a slot when no DB is connected. */
export const fallbackSlotId = (slug: string, startTime: string) => `${slug}__${startTime}`;
