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
  { id: "p7", title: "Palace Festivities", category: "Destination", location: "Jodhpur", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=70&auto=format&fit=crop" },
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
  isFeatured?: boolean;
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

export type Value = { icon?: string; title: string; description: string };

export const values: Value[] = [
  { icon: "heart", title: "Personal, not templated", description: "Every celebration starts from your story — never a copy-paste package." },
  { icon: "shield", title: "Calm under pressure", description: "Years of on-ground experience mean nothing rattles us on the day." },
  { icon: "wallet", title: "Transparent budgets", description: "Clear pricing and honest advice, so there are no surprises." },
  { icon: "sparkles", title: "Detail obsessed", description: "From the first flower to the last farewell, the small things get our full attention." },
];

// Used specifically by the About page's animated counters.
export const aboutStats: { label: string; value: string; prefixSuffix?: string }[] = [
  { label: "Celebrations planned", value: "250", prefixSuffix: "+" },
  { label: "Years of experience", value: "10", prefixSuffix: "+" },
  { label: "Destination events", value: "40", prefixSuffix: "+" },
  { label: "Average client rating", value: "5.0" },
];

// [PLACEHOLDER] press mentions / award citations shown on the About page.
export const recognitions: string[] = [
  "Featured Wedding Planner 2026 — WeddingWire India",
  "Rising Star in Destination Weddings — WedMeGood",
  "Top-Rated Planner, Client Choice — WeddingSutra",
];

export type Destination = { name: string; region: "Domestic" | "International" };
// [PLACEHOLDER] the real cities/countries the client actually serves.
export const destinations: Destination[] = [
  { name: "Jaipur", region: "Domestic" },
  { name: "Udaipur", region: "Domestic" },
  { name: "Goa", region: "Domestic" },
  { name: "Delhi NCR", region: "Domestic" },
  { name: "Chandigarh", region: "Domestic" },
  { name: "Shimla", region: "Domestic" },
  { name: "Dubai", region: "International" },
  { name: "Bali", region: "International" },
  { name: "Maldives", region: "International" },
  { name: "Thailand", region: "International" },
];

export type HowItWorksStepItem = {
  heading: string;
  body: string;
  image?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type HowItWorksStep = {
  title: string;
  slug: string;
  navLabel?: string;
  icon?: string;
  pullQuote?: string;
  items: HowItWorksStepItem[];
};

// The 4-step planning journey shown on /how-it-works. Seed copy supplied
// verbatim by the client's reference brief.
export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Introductory Call",
    slug: "introductory-call",
    icon: "compass",
    items: [
      {
        heading: "We Review Your Enquiry",
        body: "Once you reach out to us, our team carefully reviews and evaluates every detail of your enquiry, including your wedding dates, preferred destination, guest count, budget, and overall vision. This helps us understand your requirements, assess the scope of your celebration, and prepare for a personalized introductory call where we can offer the right guidance and planning approach for your wedding.",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=70&auto=format&fit=crop",
        ctaLabel: "Fill Your Form",
      },
      {
        heading: "Discovery Consultation",
        body: "We schedule a personalized consultation to understand your vision, preferences, and unique requirements in detail. This is an opportunity for you to share your ideas, expectations, and priorities while we answer your questions, offer expert guidance, and discuss how we can bring your dream celebration to life with a planning approach tailored specifically to you.",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=70&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "Onboarding & Planning",
    slug: "onboarding-planning",
    icon: "wallet",
    items: [
      {
        heading: "Personalized Proposal",
        body: "Based on our detailed discussion, we create a customized proposal tailored to your wedding requirements, preferences, and vision. From venue recommendations and planning strategy to estimated investment and curated service options, we suggest every element thoughtfully to match your expectations and create a seamless celebration experience.",
        image:
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&q=70&auto=format&fit=crop",
      },
      {
        heading: "Confirmation & Onboarding",
        body: "Once the contract is signed and your wedding dates are officially confirmed, we begin the onboarding process by reserving your dates, completing the necessary formalities, and introducing you to your dedicated wedding planning team. From this stage onwards, our team works closely with you to ensure a smooth, organized, and seamless planning journey.",
        image:
          "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1000&q=70&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "Design & Execution",
    slug: "design-execution",
    icon: "sparkles",
    pullQuote: "From vision to reality. Every detail is now in expert hands.",
    items: [
      {
        heading: "Vision & Design",
        body: "Together, we bring your wedding vision to life by finalizing the theme, design concepts, décor elements, guest experience, entertainment, hospitality, and every creative detail. Our team thoughtfully curates each aspect to reflect your personality, preferences, and the overall essence of your celebration.",
        image:
          "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1000&q=70&auto=format&fit=crop",
      },
      {
        heading: "Planning & Coordination",
        body: "Our team meticulously manages every aspect of your wedding journey, including timelines, vendor coordination, logistics, permissions, guest management, and all operational details. With seamless planning and constant coordination, we ensure every element comes together perfectly for a stress-free and unforgettable celebration.",
        image:
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=70&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "Wedding Day",
    slug: "wedding-day",
    icon: "star",
    items: [
      {
        heading: "Seamless Execution",
        body: "From the first ceremony to the final farewell, our team takes care of every detail with precision and dedication. We manage on-ground coordination, vendor execution, guest experience, and every moving element behind the scenes, allowing you to be fully present and cherish every moment of your celebration.",
        image:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=70&auto=format&fit=crop",
      },
      {
        heading: "Post-Wedding Wrap-up",
        body: "We take care of the final details after your celebration, including vendor closures, final coordination, and necessary handovers. Our team ensures a smooth conclusion to your wedding journey, allowing you to relive your special moments while we handle the details behind the scenes.",
        image:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1000&q=70&auto=format&fit=crop",
      },
    ],
  },
];

export type HowItWorksTeamRole = { title: string; description: string; icon?: string; image?: string };
export const howItWorksTeamRoles: HowItWorksTeamRole[] = [
  {
    title: "Wedding Consultant",
    icon: "compass",
    description:
      "Your first point of contact, helping you understand our planning process, discussing your vision, recommending venues, and creating a tailored proposal that reflects your celebration.",
  },
  {
    title: "Dedicated Wedding Planner",
    icon: "heart",
    description:
      "Your personal planning expert who oversees every aspect of your wedding—from design and timelines to vendor coordination, guest hospitality, and flawless execution.",
  },
  {
    title: "Client Relations & Finance",
    icon: "wallet",
    description:
      "Your dedicated support for contracts, payment schedules, documentation, and seamless coordination, ensuring every administrative detail is handled with complete transparency.",
  },
];

// [PLACEHOLDER] real team info — fallback for the (currently unused) Home
// page team_members table / TeamShowcase component.
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

// [PLACEHOLDER] real founder info — edit from /admin/about-editor
export type Founder = { name: string; role?: string; bio?: string; image?: string };
export const founders: Founder[] = [
  {
    name: "[PLACEHOLDER] Founder Name",
    role: "Founder & Creative Director",
    bio: "[PLACEHOLDER] The founder's story — what led them to start Ashraya Events, their planning philosophy, and what they bring to every celebration.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70&auto=format&fit=crop",
  },
  {
    name: "[PLACEHOLDER] Co-Founder Name",
    role: "Co-Founder & Client Experience",
    bio: "[PLACEHOLDER] The co-founder's story — their role in every celebration, and what they bring to the Ashraya Events team.",
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
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=70&auto=format&fit=crop",
];

export type Award = { name: string; image?: string };
// [PLACEHOLDER] press / award mentions shown in the "As seen in" strip.
export const awards: Award[] = [
  { name: "WeddingWire India" },
  { name: "WedMeGood" },
  { name: "WeddingSutra" },
  { name: "The Knot" },
  { name: "Featured Weddings" },
];

export type WeddingCategory = {
  title: string;
  description: string;
  image: string;
  tint: string; // pastel card background
};

export const weddingCategories: WeddingCategory[] = [
  { title: "Cruise Weddings", description: "Amidst the ocean, celebrate your day of love in the grand cruise.", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=70&auto=format&fit=crop", tint: "#E3D5BC" },
  { title: "Beach Weddings", description: "Beautiful off shores, blue skies, all you desire to tie your note amidst beachy waves.", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=70&auto=format&fit=crop", tint: "#E7C9C4" },
  { title: "Vineyard Weddings", description: "Lush green wineries, to provide you a clique vibe to tie your knot with your soul mate.", image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=700&q=70&auto=format&fit=crop", tint: "#D9E5DE" },
  { title: "Intimate Weddings", description: "Tie the knot with the love of your life in a cozy intimate setting.", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=700&q=70&auto=format&fit=crop", tint: "#DDE2CB" },
  { title: "Fort Weddings", description: "Royalty & aesthetic grandeur to make your wedding a historic memory.", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=70&auto=format&fit=crop", tint: "#E6D2B8" },
  { title: "Mountain Weddings", description: "High hill top chilly weather, special ambience for your celebration.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=70&auto=format&fit=crop", tint: "#DADEEF" },
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
    label: "Festivities",
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

/* ---------------------------------------------------------------------------
 * Destination / city landing pages (e.g. /wedding-planner-in-delhi-ncr).
 * Fallback seed — the client edits these from /admin/destination-pages-editor.
 * ------------------------------------------------------------------------- */

export type DestinationBlock = {
  heading?: string;
  body?: string;
  bullets?: string;
  image?: string;
  layout?: "text" | "image-left" | "image-right" | "bullets" | "highlight";
};

export type DestinationFaq = { question: string; answer: string };

export type DestinationPage = {
  slug: string;
  city: string;
  region?: "Domestic" | "International";
  heroTitle?: string;
  heroBody?: string;
  heroImage?: string;
  galleryImages?: string[];
  officeName?: string;
  officeAddress?: string;
  officePhone?: string;
  seoTitle?: string;
  seoDescription?: string;
  blocks: DestinationBlock[];
  faqs: DestinationFaq[];
};

export const destinationPages: DestinationPage[] = [
  {
    slug: "wedding-planner-in-delhi-ncr",
    city: "Delhi NCR",
    region: "Domestic",
    heroTitle: "Wedding Planners in Delhi NCR — the celebration you've been imagining, handled end to end",
    heroBody:
      "Ashraya Events plans and runs weddings across Delhi, Gurugram, Noida, Faridabad and Ghaziabad — from the first venue visit to the last farewell, with every vendor, timeline and detail managed for you.",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=70&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=70&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=70&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=70&auto=format&fit=crop",
    ],
    officeName: "Ashraya Events — Wedding Planners in Delhi NCR",
    officeAddress: "[PLACEHOLDER] Add your Delhi NCR office address from the admin panel.",
    officePhone: "[PLACEHOLDER] +91 00000 00000",
    seoTitle: "Wedding Planners in Delhi NCR | Ashraya Events",
    seoDescription:
      "Luxury and destination wedding planners in Delhi NCR. Venue sourcing, décor, catering, hospitality and full on-ground execution across Delhi, Gurugram, Noida and Faridabad.",
    blocks: [
      {
        layout: "text",
        heading: "Why hire a wedding planner in Delhi NCR?",
        body: "An Indian wedding is rarely one event — it's three or four days of ceremonies, each with its own guest list, timings, décor and rituals. Doing that alongside a full-time job, in a city where the best venues are booked a year ahead, is genuinely difficult. A planner absorbs the coordination so the months before your wedding feel like anticipation rather than admin.",
      },
      {
        layout: "bullets",
        heading: "The Delhi NCR wedding season, in numbers",
        body: "Planning around the season is half the battle. A few things worth knowing before you set a date:",
        bullets:
          "Peak season runs November through February, and the best venues fill up 8–12 months in advance\nWeekend dates in December go first — mid-week dates often cost meaningfully less\nVendor rates for décor, photography and makeup typically climb 40–50% during peak weeks\nGuest accommodation near popular venues gets scarce on auspicious dates\nBooking early is the single biggest lever you have on both cost and choice",
      },
      {
        layout: "bullets",
        heading: "What you get when you work with us",
        bullets:
          "You stay a guest at your own wedding — we carry the stress, not you\nOne point of contact instead of fifteen vendor WhatsApp groups\nHonest budget guidance, with money moved to what you'll actually remember\nDécor and design built around your story, not a package we reuse\nRituals run on time, because someone is watching the clock so your family doesn't have to",
      },
      {
        layout: "image-right",
        heading: "What makes planning in Delhi NCR different",
        body: "Delhi NCR gives you extraordinary range — farmhouses in Chattarpur, five-star ballrooms in Aerocity, resort lawns in Gurugram, heritage courtyards in Old Delhi. That range is exactly why local knowledge matters. Distances between venues, traffic at ceremony hours, guest movement across multiple functions and society timing restrictions all shape what's actually possible on the day.",
        bullets:
          "Venue logistics across Delhi, Gurugram, Noida and Faridabad\nSeasonality, auspicious dates and how they move pricing\nLarge guest lists, traffic windows and multi-event schedules\nOn-ground relationships that get problems solved quietly",
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=70&auto=format&fit=crop",
      },
      {
        layout: "bullets",
        heading: "Wedding planning across Delhi NCR",
        body: "We work across the whole region, and each part of it offers something different:",
        bullets:
          "Gurugram — luxury hotels, premium banquets and contemporary venues for polished, modern celebrations\nNoida — spacious banquet halls, farmhouses and newer event venues with easier access and parking\nFaridabad — resorts, open lawns and well-priced banquets for larger guest lists\nGhaziabad — banquet halls and party lawns that are well connected across the NCR\nCentral Delhi — heritage properties and five-star ballrooms for intimate, formal celebrations",
      },
      {
        layout: "image-left",
        heading: "Your dream wedding starts here",
        body: "A wedding is not a single day — it's a story your family will retell for decades. No two couples are the same, so no two weddings we plan look the same either. We start by understanding what matters to you, then design everything around that: the venue, the palette, the flow of each function, the small details your closest guests will notice.",
        image:
          "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1000&q=70&auto=format&fit=crop",
      },
      {
        layout: "bullets",
        heading: "How we work — simple, structured, calm",
        body: "Planning should feel exciting, not overwhelming. Our process keeps you informed and involved without burying you in decisions:",
        bullets:
          "Understanding your vision — we learn your must-haves, your traditions and what you'd rather skip\nDesign & planning — theme, layout, vendor selection and budget, all mapped out with clear timelines\nExecution & management — on the days themselves, our team runs vendors, timings and logistics so you simply celebrate",
      },
      {
        layout: "bullets",
        heading: "Weddings for every style and scale",
        body: "Whatever shape your celebration takes, the level of care stays the same:",
        bullets:
          "Traditional weddings with full ceremonial detail\nContemporary celebrations with modern design and styling\nMulti-day weddings with distinct events and looks\nDestination-style weddings in and around Delhi NCR\nIntimate gatherings where every guest is someone you love",
      },
      {
        layout: "bullets",
        heading: "Our complete wedding planning services in Delhi NCR",
        body: "Take the whole thing off your plate, or just the parts you'd rather not handle:",
        bullets:
          "Concept, theme and overall design direction\nVenue scouting, site visits, negotiation and booking\nDécor, florals, lighting, stage and tablescapes\nCatering curation and menu tastings\nPhotography and videography coordination\nEntertainment — DJs, live bands and performers\nInvitations, hampers and guest communication\nGuest hospitality, travel and accommodation\nMehendi, haldi and sangeet planning\nDay-of logistics, timelines and on-ground management",
      },
      {
        layout: "bullets",
        heading: "Trending wedding themes in Delhi NCR",
        body: "What couples in the region are asking us for right now:",
        bullets:
          "Softer palettes — blush, lavender and sage replacing the default red-and-gold\nMughal-inspired arches, draping and candlelit pathways, still as popular as ever\nGarden and daytime weddings with pastel florals and natural light\nRooftop and industrial-chic venues in Gurugram and Noida\nLocally grown flowers and lower-waste setups for eco-conscious couples",
      },
      {
        layout: "highlight",
        heading: "Start your planning early",
        body: "The couples who get the venue they wanted, on the date they wanted, at a price that made sense, are almost always the ones who started early. If your wedding is in the next 8–18 months, now is the right time for a first conversation — even if nothing else is decided yet.",
      },
    ],
    faqs: [
      {
        question: "What does a wedding planner in Delhi NCR actually do?",
        answer:
          "We manage the celebration end to end — venue selection, budget planning, décor design, catering, entertainment, vendor sourcing, guest hospitality, travel and accommodation, timelines and on-ground execution. In practice, you make the decisions that matter to you, and we handle everything required to make them happen.",
      },
      {
        question: "Which are the best wedding venues in Delhi NCR?",
        answer:
          "It depends entirely on your guest count, style and budget — five-star ballrooms, heritage properties, farmhouses, resort lawns and banquet spaces all work for different weddings. We shortlist venues that genuinely fit your brief, arrange site visits, compare real quotes and negotiate on your behalf.",
      },
      {
        question: "How much does a wedding planner in Delhi cost?",
        answer:
          "There's no single fee, because no two weddings are the same size or scope. Cost depends on guest count, number of functions, venue, décor ambition and how much of the planning you want us to carry. We'll give you a clear, itemised proposal built around your budget before you commit to anything.",
      },
      {
        question: "How far in advance should I book a wedding planner?",
        answer:
          "Eight to twelve months before the wedding is ideal, and earlier still for peak-season dates or destination weddings. Booking early gives you real access to the best venues and vendors, and far more room to negotiate. That said, we've successfully planned weddings on much shorter timelines — talk to us and we'll tell you honestly what's achievable.",
      },
      {
        question: "Can you plan both luxury and budget-conscious weddings?",
        answer:
          "Yes. The professionalism and attention to detail stay identical regardless of budget — what changes is where the money goes. With a tighter budget we're simply more deliberate about prioritising the things you and your guests will actually remember.",
      },
      {
        question: "Do you plan destination weddings from Delhi?",
        answer:
          "We do — Jaipur, Udaipur, Goa, Shimla, Mussoorie, Jim Corbett and international destinations included. We handle venue selection, guest travel and accommodation, vendor coordination, décor and full on-site execution, so a wedding far from home still runs as smoothly as one down the road.",
      },
      {
        question: "Can you manage multi-day celebrations?",
        answer:
          "Yes, and most of the weddings we plan are exactly that — engagement, mehendi, haldi, sangeet, the ceremony itself and the reception. Each function gets its own design and timeline while the overall experience stays coherent, and our team is on the ground for all of it.",
      },
      {
        question: "Can I plan my Delhi wedding remotely?",
        answer:
          "Absolutely — many of our couples live in another city or abroad. We run virtual consultations, share venue and vendor shortlists with photos and video walkthroughs, present designs digitally and send regular updates, handling all local coordination in person on your behalf.",
      },
      {
        question: "Do you handle vendor negotiation and payments?",
        answer:
          "Yes. We manage vendor selection, rate negotiation, contracts, payment schedules and day-to-day coordination. Because we work with these vendors repeatedly, we can usually secure better pricing and more reliable service than a one-time booking would get.",
      },
      {
        question: "My venue already provides a coordinator — do I still need a planner?",
        answer:
          "A venue coordinator looks after the venue's own operations — banquet setup, catering schedules, in-house services. A wedding planner works for you across every vendor, function and guest touchpoint, from décor and photography to hospitality, transport and budgets. The two roles complement each other rather than overlap.",
      },
      {
        question: "How do you keep the planning process stress-free?",
        answer:
          "By making sure there's only ever one thing on your plate at a time. We keep a running timeline, chase every vendor, flag decisions before they become urgent, and solve problems on the day without bringing them to you. You should find out about most issues after they've already been fixed.",
      },
      {
        question: "How do I get started?",
        answer:
          "Send us an enquiry with your approximate dates, guest count and the city you're planning in. We'll set up a no-obligation call to understand what you're imagining, and follow up with a clear proposal covering scope, approach and cost.",
      },
    ],
  },
];
