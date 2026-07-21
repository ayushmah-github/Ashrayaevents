/* ============================================================================
 * Admin resource definitions — one config per manageable content type.
 * Drives both the API (allow-listed tables) and the auto-generated admin forms.
 * ========================================================================== */

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
  | "statlist";

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
  site_settings: {
    table: "site_settings",
    label: "Home / Site Settings",
    singular: "Site settings",
    singleton: true,
    titleField: "tagline",
    fields: [
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "hero_images", label: "Hero slideshow images", type: "imagelist" },
      { name: "story_title", label: "Story heading", type: "text" },
      { name: "story_body", label: "Story text", type: "textarea" },
      { name: "stats", label: "Headline stats", type: "statlist" },
    ],
  },
};

export const TABLES = Object.keys(RESOURCES);
export const isValidTable = (t: string): boolean => TABLES.includes(t);
