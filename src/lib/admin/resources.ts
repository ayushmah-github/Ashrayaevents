/* ============================================================================
 * Admin resource definitions — one config per manageable content type.
 * Drives both the API (allow-listed tables) and the auto-generated admin forms.
 * ========================================================================== */

import { CATEGORY_NAMES } from "@/lib/store-data";

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "slug"
  | "date"
  | "select"
  | "image"
  | "list"
  | "imagelist"
  | "statlist"
  | "boolean"
  | "addonlist"
  | "faqlist";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  help?: string;
};

export type Resource = {
  table: string;
  label: string; // plural, for nav
  singular: string;
  singleton?: boolean;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  fields: Field[];
};

const CATEGORIES = ["Wedding", "Destination", "Corporate", "Birthday", "Décor"];
const POST_CATEGORIES = ["Weddings", "Destination", "Corporate", "Birthday", "Décor", "Tips"];

export const RESOURCES: Record<string, Resource> = {
  services: {
    table: "services",
    label: "Services",
    singular: "Service",
    titleField: "title",
    subtitleField: "short",
    imageField: "image",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug (URL id)", type: "slug", help: "lowercase, e.g. weddings" },
      { name: "short", label: "Short summary", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      { name: "features", label: "Key features", type: "list" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  portfolio_items: {
    table: "portfolio_items",
    label: "Portfolio / Stories",
    singular: "Portfolio item",
    titleField: "title",
    subtitleField: "category",
    imageField: "image",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "category", label: "Category", type: "select", options: CATEGORIES },
      { name: "location", label: "Location", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  testimonials: {
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    titleField: "name",
    subtitleField: "event",
    fields: [
      { name: "name", label: "Client name", type: "text" },
      { name: "event", label: "Event type", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "rating", label: "Rating (1–5)", type: "number" },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  faqs: {
    table: "faqs",
    label: "FAQs",
    singular: "FAQ",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "text" },
      { name: "answer", label: "Answer", type: "textarea" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  posts: {
    table: "posts",
    label: "Blog Posts",
    singular: "Blog post",
    titleField: "title",
    subtitleField: "category",
    imageField: "cover_image",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug (URL id)", type: "slug" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "category", label: "Category", type: "select", options: POST_CATEGORIES },
      { name: "cover_image", label: "Cover image", type: "image" },
      { name: "author", label: "Author", type: "text" },
      { name: "published_at", label: "Published date", type: "date" },
      { name: "body", label: "Body (Markdown)", type: "markdown", help: "Tip: use the AI Blog Assistant at /tools/blog-assistant." },
    ],
  },
  decorations: {
    table: "decorations",
    label: "Decorations",
    singular: "Decoration",
    titleField: "title",
    subtitleField: "category",
    imageField: "images",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug (URL id)", type: "slug" },
      { name: "category", label: "Category", type: "select", options: CATEGORY_NAMES },
      { name: "city", label: "City", type: "text" },
      { name: "area", label: "Area", type: "text" },
      { name: "price", label: "Price (₹)", type: "number" },
      { name: "discount", label: "Discount (%)", type: "number" },
      { name: "theme", label: "Theme", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "images", label: "Gallery images", type: "imagelist" },
      { name: "included_items", label: "Included items", type: "list" },
      { name: "addons", label: "Optional add-ons", type: "addonlist" },
      { name: "faqs", label: "FAQs", type: "faqlist" },
      { name: "rating", label: "Rating (0–5)", type: "number" },
      { name: "availability", label: "Available for booking", type: "boolean" },
      { name: "featured", label: "Featured on store home", type: "boolean" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  decoration_categories: {
    table: "decoration_categories",
    label: "Decoration Categories",
    singular: "Category",
    titleField: "name",
    imageField: "image",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "image", label: "Image", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  cities: {
    table: "cities",
    label: "Cities",
    singular: "City",
    titleField: "name",
    imageField: "image",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "slug", label: "Slug", type: "slug" },
      { name: "image", label: "Image (optional)", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  home_categories: {
    table: "home_categories",
    label: "Home · Wedding Categories",
    singular: "Category card",
    titleField: "title",
    subtitleField: "description",
    imageField: "image",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "tint", label: "Card colour (hex, e.g. #F2E9DC)", type: "text" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  service_tiles: {
    table: "service_tiles",
    label: "Home · Service Tiles",
    singular: "Service tile",
    titleField: "title",
    imageField: "image",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  inspiration_frames: {
    table: "inspiration_frames",
    label: "Home · Inspiration Frames",
    singular: "Inspiration frame",
    titleField: "title",
    subtitleField: "tab",
    imageField: "image",
    fields: [
      { name: "title", label: "Caption", type: "text" },
      { name: "tab", label: "Tab", type: "select", options: ["Haldi", "Mehndi", "Festivities", "Wedding", "Reception"] },
      { name: "image", label: "Image", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  team_members: {
    table: "team_members",
    label: "About · Team",
    singular: "Team member",
    titleField: "name",
    subtitleField: "role",
    imageField: "image",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "image", label: "Photo", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  awards: {
    table: "awards",
    label: "Home · Awards / As seen in",
    singular: "Award",
    titleField: "name",
    imageField: "image",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "image", label: "Logo (optional)", type: "image" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  page_banners: {
    table: "page_banners",
    label: "Page Banners",
    singular: "Page banner",
    titleField: "page",
    subtitleField: "title",
    imageField: "image",
    fields: [
      {
        name: "page",
        label: "Page",
        type: "select",
        options: ["About", "How It Works", "Our Work", "Blogs", "Contact", "Services", "Decorations", "Testimonials", "Estimate"],
      },
      { name: "image", label: "Banner image", type: "image" },
      { name: "title", label: "Title (optional override)", type: "text" },
      { name: "subtitle", label: "Subtitle (optional override)", type: "text" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  process_steps: {
    table: "process_steps",
    label: "How It Works · Steps",
    singular: "Step",
    titleField: "title",
    subtitleField: "step",
    fields: [
      { name: "step", label: "Step number (e.g. 01)", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "sort_order", label: "Order", type: "number" },
    ],
  },
  site_settings: {
    table: "site_settings",
    label: "Home / Site Settings",
    singular: "Site settings",
    singleton: true,
    titleField: "tagline",
    fields: [
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "hero_images", label: "Hero slideshow images", type: "imagelist" },
      { name: "intro_title", label: "Intro heading (home)", type: "textarea", help: "The big 'Experience royal elegance…' heading." },
      { name: "intro_body", label: "Intro paragraph (home)", type: "textarea" },
      { name: "intro_image_1", label: "Intro image 1 (top-left)", type: "image" },
      { name: "intro_image_2", label: "Intro image 2 (centre)", type: "image" },
      { name: "story_title", label: "Story heading", type: "text" },
      { name: "story_body", label: "Story text", type: "textarea" },
      { name: "stats", label: "Headline stats", type: "statlist" },
      { name: "collage_image", label: "Home collage image (single, full-width)", type: "image", help: "Upload one ready-made collage banner. Takes priority over the collage photos below." },
      { name: "collage_images", label: "Home collage photos (grid)", type: "imagelist", help: "8 photos to build the tiled grid (only used if no single collage image above)." },
      { name: "about_image", label: "About page image", type: "image" },
      { name: "hero_video", label: "Hero background video URL (optional)", type: "text", help: "e.g. a public .mp4 URL. Leave blank for the photo slideshow." },
      { name: "video_poster", label: "Film band poster image", type: "image" },
      { name: "youtube_ids", label: "Testimonial YouTube videos", type: "list", help: "Paste the full YouTube link (e.g. https://youtu.be/abc123) — one per row." },
      { name: "instagram_posts", label: "Instagram posts", type: "list", help: "Paste Instagram post/reel links (e.g. https://www.instagram.com/p/xxxx/) — one per row." },
      { name: "instagram_embed", label: "Instagram widget embed URL (optional)", type: "text", help: "Advanced: a SnapWidget/Behold embed URL. Leave blank if using the posts above." },
    ],
  },
};

export const TABLES = Object.keys(RESOURCES);
export const isValidTable = (t: string): boolean => TABLES.includes(t);
