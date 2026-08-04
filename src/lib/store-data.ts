/* ============================================================================
 * Decorations store — types, category constants, and placeholder fallback data.
 * Real content is managed in /admin (Supabase). These samples show until then.
 * ========================================================================== */

export type Addon = { name: string; price: number };
export type DecorationFaq = { question: string; answer: string };

export type Decoration = {
  id: string;
  title: string;
  slug: string;
  category: string;
  city: string;
  area?: string;
  price: number;
  discount: number; // percent off
  theme?: string;
  description?: string;
  includedItems: string[];
  addons: Addon[];
  images: string[];
  faqs: DecorationFaq[];
  rating: number;
  availability: boolean;
  featured?: boolean;
};

export type DecorationCategory = { name: string; slug: string; image?: string };
export type City = { name: string; slug: string; image?: string };

// The 12 categories from the spec.
export const DECORATION_CATEGORIES: DecorationCategory[] = [
  { name: "Birthday Decoration", slug: "birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=70&auto=format&fit=crop" },
  { name: "Anniversary Decoration", slug: "anniversary", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=70&auto=format&fit=crop" },
  { name: "Baby Shower", slug: "baby-shower", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=70&auto=format&fit=crop" },
  { name: "Proposal Decoration", slug: "proposal", image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&q=70&auto=format&fit=crop" },
  { name: "Room Decoration", slug: "room", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=70&auto=format&fit=crop" },
  { name: "Wedding Decoration", slug: "wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=70&auto=format&fit=crop" },
  { name: "Haldi Decoration", slug: "haldi", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=70&auto=format&fit=crop" },
  { name: "Office Decoration", slug: "office", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=70&auto=format&fit=crop" },
  { name: "Kids Theme", slug: "kids-theme", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=70&auto=format&fit=crop" },
  { name: "Balloon Decoration", slug: "balloon", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=70&auto=format&fit=crop" },
  { name: "Cab Decoration", slug: "cab", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=70&auto=format&fit=crop" },
  { name: "Festival Decoration", slug: "festival", image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=600&q=70&auto=format&fit=crop" },
];

export const CATEGORY_NAMES = DECORATION_CATEGORIES.map((c) => c.name);

export const FALLBACK_CITIES: City[] = [
  { name: "Chandigarh", slug: "chandigarh" },
  { name: "Delhi", slug: "delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bengaluru", slug: "bengaluru" },
  { name: "Jaipur", slug: "jaipur" },
];

// [PLACEHOLDER] sample decorations shown until the admin adds real ones.
export const FALLBACK_DECORATIONS: Decoration[] = [
  {
    id: "d1",
    title: "Romantic Room Decoration",
    slug: "romantic-room-decoration",
    category: "Room Decoration",
    city: "Chandigarh",
    area: "Sector 17",
    price: 3499,
    discount: 20,
    theme: "Red & White Roses",
    description:
      "Set the mood with a dreamy candlelit room — rose petals, fairy lights, balloons and a heartfelt welcome for your special someone.",
    includedItems: ["100 rose petals", "Fairy lights", "50 balloons", "Candles", "Setup & cleanup"],
    addons: [
      { name: "Fog effect", price: 1500 },
      { name: "Photographer (1 hr)", price: 2500 },
      { name: "Cake (1 kg)", price: 899 },
    ],
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1000&q=70&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=70&auto=format&fit=crop",
    ],
    faqs: [
      { question: "How long does setup take?", answer: "Our team needs about 60–90 minutes before your slot." },
      { question: "Can I customise the colours?", answer: "Yes — mention it at checkout or add a note in your enquiry." },
    ],
    rating: 4.8,
    availability: true,
    featured: true,
  },
  {
    id: "d2",
    title: "Kids Birthday Balloon Theme",
    slug: "kids-birthday-balloon-theme",
    category: "Birthday Decoration",
    city: "Delhi",
    area: "Dwarka",
    price: 4999,
    discount: 15,
    theme: "Jungle Safari",
    description:
      "A playful jungle-safari balloon setup with a themed backdrop, perfect for your little one's big day.",
    includedItems: ["Themed backdrop", "150 balloons", "Name banner", "Table setup", "Setup & cleanup"],
    addons: [
      { name: "Cartoon mascot", price: 3000 },
      { name: "Return gifts (10)", price: 1200 },
    ],
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1000&q=70&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=70&auto=format&fit=crop",
    ],
    faqs: [{ question: "Do you provide the cake?", answer: "Cake is an optional add-on you can include." }],
    rating: 4.9,
    availability: true,
    featured: true,
  },
  {
    id: "d3",
    title: "Anniversary Terrace Setup",
    slug: "anniversary-terrace-setup",
    category: "Anniversary Decoration",
    city: "Mumbai",
    area: "Bandra",
    price: 8999,
    discount: 10,
    theme: "Golden Candlelight",
    description:
      "A private candlelight dinner setup on your terrace — drapes, fairy lights, a floral table and a romantic pathway.",
    includedItems: ["Table for two", "Drapes & fairy lights", "Floral centrepiece", "Candle pathway", "Setup & cleanup"],
    addons: [
      { name: "Live guitarist", price: 4000 },
      { name: "Champagne", price: 2200 },
    ],
    images: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1000&q=70&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=70&auto=format&fit=crop",
    ],
    faqs: [],
    rating: 5.0,
    availability: true,
    featured: true,
  },
];

/** Price after discount. */
export function finalPrice(d: Pick<Decoration, "price" | "discount">): number {
  return Math.round(d.price * (1 - (d.discount || 0) / 100));
}
