/* ============================================================================
 * CONTENT — Ashraya Events
 * ----------------------------------------------------------------------------
 * All marketing copy + placeholder imagery lives here so non-technical editors
 * can swap text/images without touching layout code.
 *
 * IMAGES: currently point to free Unsplash placeholders. Replace `image` URLs
 * with the client's real photos (drop files in /public and use "/my-photo.jpg").
 * Everything marked [PLACEHOLDER] needs real client content before launch.
 * ========================================================================== */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "weddings",
    title: "Weddings",
    short: "Full-service planning for the big day, start to vidai.",
    description:
      "From intimate ceremonies to grand multi-day celebrations, we handle every detail — venue, décor, catering, entertainment and guest experience — so you can be fully present for the moments that matter.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=70&auto=format&fit=crop",
    features: [
      "End-to-end wedding management",
      "Vendor curation & coordination",
      "Ceremony & reception design",
      "Guest hospitality & logistics",
    ],
  },
  {
    slug: "destination-weddings",
    title: "Destination Weddings",
    short: "Celebrate in breathtaking locations, planned remotely.",
    description:
      "Beaches, palaces, hillside resorts — we scout, negotiate and execute weddings anywhere, managing travel, stays and every on-ground detail for you and your guests.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=70&auto=format&fit=crop",
    features: [
      "Venue scouting & site visits",
      "Guest travel & accommodation",
      "Local vendor management",
      "On-ground event teams",
    ],
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    short: "Conferences, launches and galas that impress.",
    description:
      "Polished, on-brand corporate experiences — product launches, award nights, offsites and conferences — delivered with precision and measurable impact.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=70&auto=format&fit=crop",
    features: [
      "Product launches & conferences",
      "Award nights & galas",
      "Team offsites & retreats",
      "Brand-aligned production",
    ],
  },
  {
    slug: "private-parties",
    title: "Birthday & Private Parties",
    short: "Milestones and celebrations, beautifully styled.",
    description:
      "Birthdays, anniversaries, baby showers and house parties — thoughtfully themed, styled and catered celebrations for every milestone.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=70&auto=format&fit=crop",
    features: [
      "Themed birthday parties",
      "Anniversaries & showers",
      "Intimate home celebrations",
      "Custom cakes & catering",
    ],
  },
  {
    slug: "decor-styling",
    title: "Décor & Styling",
    short: "Signature florals, sets and tablescapes.",
    description:
      "Our in-house design team creates immersive environments — florals, lighting, stages and tablescapes — tailored to your story and palette.",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=70&auto=format&fit=crop",
    features: [
      "Floral & stage design",
      "Lighting & ambiance",
      "Custom props & installations",
      "Tablescapes & favours",
    ],
  },
  {
    slug: "catering-entertainment",
    title: "Catering & Entertainment",
    short: "Menus and performances your guests remember.",
    description:
      "Curated multi-cuisine menus, live counters, artists, DJs and performers — sourced and coordinated to keep your celebration flowing.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=70&auto=format&fit=crop",
    features: [
      "Multi-cuisine menu curation",
      "Live counters & mixology",
      "Artists, DJs & performers",
      "Sound & stage production",
    ],
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Enquiry",
    description:
      "Tell us your vision, dates and guest count. We listen, then share initial ideas and an honest ballpark.",
  },
  {
    step: "02",
    title: "Consultation",
    description:
      "A deeper session to shape the theme, mood and budget — followed by a tailored proposal and moodboard.",
  },
  {
    step: "03",
    title: "Planning",
    description:
      "We lock venue, vendors and timelines, manage contracts and keep you updated at every milestone.",
  },
  {
    step: "04",
    title: "Execution",
    description:
      "On the day, our team runs the show end-to-end so you and your guests simply celebrate.",
  },
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: "Wedding" | "Destination" | "Corporate" | "Birthday" | "Décor";
  location: string;
  image: string;
};

// [PLACEHOLDER] swap with real event photography + titles
export const portfolio: PortfolioItem[] = [
  { id: "p1", title: "Aarav & Meera", category: "Wedding", location: "Udaipur", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=70&auto=format&fit=crop" },
  { id: "p2", title: "Seaside Vows", category: "Destination", location: "Goa", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=70&auto=format&fit=crop" },
  { id: "p3", title: "Annual Gala", category: "Corporate", location: "Mumbai", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=70&auto=format&fit=crop" },
  { id: "p4", title: "Golden Sixty", category: "Birthday", location: "Delhi", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=70&auto=format&fit=crop" },
  { id: "p5", title: "Marigold Mandap", category: "Décor", location: "Jaipur", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70&auto=format&fit=crop" },
  { id: "p6", title: "Riya & Kabir", category: "Wedding", location: "Jaipur", image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=70&auto=format&fit=crop" },
  { id: "p7", title: "Palace Sangeet", category: "Destination", location: "Jodhpur", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=70&auto=format&fit=crop" },
  { id: "p8", title: "Product Launch", category: "Corporate", location: "Bengaluru", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=70&auto=format&fit=crop" },
  { id: "p9", title: "Little One's First", category: "Birthday", location: "Pune", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=70&auto=format&fit=crop" },
  { id: "p10", title: "Floral Reception", category: "Décor", location: "Hyderabad", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=900&q=70&auto=format&fit=crop" },
  { id: "p11", title: "Ishaan & Tara", category: "Wedding", location: "Agra", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=70&auto=format&fit=crop" },
  { id: "p12", title: "Beach Baraat", category: "Destination", location: "Alibaug", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=70&auto=format&fit=crop" },
];

export const portfolioCategories = [
  "All",
  "Wedding",
  "Destination",
  "Corporate",
  "Birthday",
  "Décor",
] as const;

export type Testimonial = {
  id: string;
  name: string;
  event: string;
  location: string;
  quote: string;
  rating: number;
};

// [PLACEHOLDER] replace with real client reviews (Google/WhatsApp screenshots -> text)
export const testimonials: Testimonial[] = [
  { id: "t1", name: "Priya & Rohan", event: "Wedding", location: "Udaipur", rating: 5, quote: "Ashraya turned our chaos into calm. Every detail — the mandap, the food, the timing — was flawless. Our guests are still talking about it." },
  { id: "t2", name: "Neha Sharma", event: "Corporate Gala", location: "Mumbai", rating: 5, quote: "Professional, creative and unbelievably organised. They made our annual gala feel like a five-star production on a sensible budget." },
  { id: "t3", name: "The Kapoor Family", event: "60th Birthday", location: "Delhi", rating: 5, quote: "They understood exactly the warm, intimate evening we wanted for Papa's birthday. Beautiful décor and not a single hiccup." },
  { id: "t4", name: "Ananya & Vikram", event: "Destination Wedding", location: "Goa", rating: 5, quote: "We planned everything remotely and still felt in control the whole time. The beach ceremony was straight out of a dream." },
  { id: "t5", name: "Rahul Mehta", event: "Product Launch", location: "Bengaluru", rating: 5, quote: "Sharp execution and great taste. The stage, lighting and flow were exactly on brand. We'll be back for every launch." },
  { id: "t6", name: "Sneha & Arjun", event: "Wedding", location: "Jaipur", rating: 5, quote: "Warm, honest and endlessly patient with our big family. It felt like planning with friends who happen to be experts." },
];

export type Value = { title: string; description: string };

export const values: Value[] = [
  { title: "Personal, not templated", description: "Every celebration starts from your story — never a copy-paste package." },
  { title: "Calm under pressure", description: "Years of on-ground experience mean nothing rattles us on the day." },
  { title: "Transparent budgets", description: "Clear pricing and honest advice, so there are no surprises." },
  { title: "Detail obsessed", description: "From the first flower to the last farewell, the small things get our full attention." },
];

// [PLACEHOLDER] real founder / team info
export const team = [
  {
    name: "[PLACEHOLDER] Founder Name",
    role: "Founder & Lead Planner",
    bio: "[PLACEHOLDER] Short founder bio — how Ashraya Events started, years of experience, design philosophy.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70&auto=format&fit=crop",
  },
  {
    name: "[PLACEHOLDER] Team Member",
    role: "Creative Director",
    bio: "[PLACEHOLDER] Short bio for the design/creative lead.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=70&auto=format&fit=crop",
  },
];

export const stats = [
  { value: "250+", label: "Celebrations planned" },
  { value: "10+", label: "Years of experience" },
  { value: "40+", label: "Destination events" },
  { value: "5.0", label: "Average client rating" },
];

/* ---------------------------------------------------------------------------
 * Home-page sections (Shaandaar-style layout). [PLACEHOLDER] imagery + copy.
 * ------------------------------------------------------------------------- */

// Mosaic collage on the home page.
export const collageImages: string[] = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=70&auto=format&fit=crop",
];

export type WeddingCategory = {
  title: string;
  description: string;
  image: string;
  tint: string; // pastel card background
};

export const weddingCategories: WeddingCategory[] = [
  { title: "Destination Weddings", description: "Celebrate anywhere in the world — beaches, palaces and hillside resorts.", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&q=70&auto=format&fit=crop", tint: "#F2E9DC" },
  { title: "Beach Weddings", description: "Blue skies and golden sands for a barefoot celebration by the sea.", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=70&auto=format&fit=crop", tint: "#EDDAD3" },
  { title: "Palace & Fort Weddings", description: "Royal courtyards and heritage grandeur for a timeless affair.", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=70&auto=format&fit=crop", tint: "#E7E0D0" },
  { title: "Intimate Weddings", description: "Tie the knot with your closest few in a warm, cosy setting.", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=700&q=70&auto=format&fit=crop", tint: "#DCE4DA" },
  { title: "Garden Weddings", description: "Lush greenery and open skies for an elegant outdoor celebration.", image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=700&q=70&auto=format&fit=crop", tint: "#E4E7DC" },
  { title: "Mountain Weddings", description: "Say your vows amid breathtaking valleys and misty peaks.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=70&auto=format&fit=crop", tint: "#E7E1EA" },
];

export type Capability = { title: string; image: string };

// "Services We Provide" — the 12-tile overlay grid.
export const capabilities: Capability[] = [
  { title: "Consultation & Planning", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=70&auto=format&fit=crop" },
  { title: "Venue & Destination Selection", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70&auto=format&fit=crop" },
  { title: "Vendor Sourcing & Management", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=70&auto=format&fit=crop" },
  { title: "Design & Décor Management", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=70&auto=format&fit=crop" },
  { title: "Food & Beverage Management", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=70&auto=format&fit=crop" },
  { title: "Budget Management", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70&auto=format&fit=crop" },
  { title: "Guest Hospitality & RSVP", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=70&auto=format&fit=crop" },
  { title: "Wedding Favours & Gifting", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=70&auto=format&fit=crop" },
  { title: "Bridal & Wardrobe Styling", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=70&auto=format&fit=crop" },
  { title: "Logistics Management", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=70&auto=format&fit=crop" },
  { title: "Stationery & Invitations", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=70&auto=format&fit=crop" },
  { title: "Entertainment & Production", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=70&auto=format&fit=crop" },
];

export type InspirationFrame = { title: string; image: string };
export type InspirationTab = { label: string; frames: InspirationFrame[] };

// "Inspiration for Wedding Frames" — tabbed captioned gallery.
export const inspirationTabs: InspirationTab[] = [
  {
    label: "Haldi",
    frames: [
      { title: "Marigold Floral Canopy", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=70&auto=format&fit=crop" },
      { title: "Colourful Lounge Seating", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=70&auto=format&fit=crop" },
      { title: "Marigold Flower Installation", image: "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=800&q=70&auto=format&fit=crop" },
      { title: "Sunlit Floral Arrangement", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=70&auto=format&fit=crop" },
    ],
  },
  {
    label: "Mehndi",
    frames: [
      { title: "Vibrant Lounge Décor", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=70&auto=format&fit=crop" },
      { title: "Floral Swing Setup", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=70&auto=format&fit=crop" },
      { title: "Colourful Umbrellas", image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&q=70&auto=format&fit=crop" },
      { title: "Boho Tablescape", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=70&auto=format&fit=crop" },
    ],
  },
  {
    label: "Sangeet",
    frames: [
      { title: "Grand Stage Design", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=70&auto=format&fit=crop" },
      { title: "Lighting & Ambiance", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=70&auto=format&fit=crop" },
      { title: "Dance Floor Setup", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=70&auto=format&fit=crop" },
      { title: "Statement Entrance", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=70&auto=format&fit=crop" },
    ],
  },
  {
    label: "Wedding",
    frames: [
      { title: "Floral Mandap", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=70&auto=format&fit=crop" },
      { title: "Aisle Décor", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=70&auto=format&fit=crop" },
      { title: "Bougainvillea Entrance", image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=70&auto=format&fit=crop" },
      { title: "Palace Courtyard", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=70&auto=format&fit=crop" },
    ],
  },
  {
    label: "Reception",
    frames: [
      { title: "Elegant Tablescape", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=70&auto=format&fit=crop" },
      { title: "Candlelit Dinner Setup", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=70&auto=format&fit=crop" },
      { title: "Chandelier & Drapes", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=70&auto=format&fit=crop" },
      { title: "Stage & Seating", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=70&auto=format&fit=crop" },
    ],
  },
];
