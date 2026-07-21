/* ============================================================================
 * AI KNOWLEDGE BASE
 * ----------------------------------------------------------------------------
 * Plain-text context handed to Claude for the concierge chatbot and estimator.
 * Built from the same content.ts data so it stays in sync. Edit content.ts (or
 * add FAQ entries below) and both the website and the AI features update.
 * ========================================================================== */
import { services } from "@/lib/content";
import { site } from "@/lib/site";

// [PLACEHOLDER] Extend/replace these FAQs with the client's real answers.
export const faqs: { q: string; a: string }[] = [
  {
    q: "What areas / cities do you serve?",
    a: "We plan events across India and handle destination weddings anywhere, including abroad. Travel and on-ground teams are arranged for you.",
  },
  {
    q: "How far in advance should we book?",
    a: "For weddings we recommend 6–12 months; for smaller events 1–3 months. We do take on shorter timelines when our calendar allows.",
  },
  {
    q: "What is your pricing / do you have packages?",
    a: "Every celebration is bespoke, so pricing depends on guest count, city, venue and scope. Use our Estimate tool or share your details and we'll send an honest ballpark quickly.",
  },
  {
    q: "Do you offer partial / day-of coordination?",
    a: "Yes — from full end-to-end planning to décor-only or day-of management. We tailor the scope to what you need.",
  },
  {
    q: "How do we get started?",
    a: "Share your event type, date, city and rough guest count via the contact form, WhatsApp, or this chat, and we'll set up a free consultation.",
  },
];

/** The full context string used as the system knowledge for the AI.
 *  Pass live FAQs (from Sanity) to keep the concierge in sync with the admin;
 *  defaults to the built-in FAQ list. */
export function buildKnowledgeBase(faqList: { q: string; a: string }[] = faqs): string {
  const serviceLines = services
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");
  const faqLines = faqList.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  return `# About ${site.name}
${site.description}
Tagline: "${site.tagline}"

## Services
${serviceLines}

## How we work
Enquiry → Consultation → Planning → Execution. We handle venue, décor, catering, entertainment, guest logistics and on-day management.

## Contact
Phone: ${site.contact.phone}
Email: ${site.contact.email}
Instagram: ${site.social.instagramHandle}
Based in: ${site.contact.city}

## Frequently asked questions
${faqLines}`;
}

/** System prompt for the site-wide chat concierge. */
export function chatSystemPrompt(faqList: { q: string; a: string }[] = faqs): string {
  return `You are the friendly, elegant AI concierge for ${site.name}, a wedding & event planning studio. Use ONLY the knowledge base below to answer questions about services, availability, process, locations and rough pricing. Be warm, concise (2-4 sentences), and celebratory in tone — never pushy.

Your secondary goal is gentle lead capture: over the conversation, naturally try to learn the visitor's NAME, PHONE (or email), EVENT TYPE and EVENT DATE so our team can follow up. Ask for at most one detail at a time, only when it fits the flow. Never invent facts, prices, or availability that aren't in the knowledge base — if unsure, offer to connect them with the team.

If asked something outside events/weddings, politely steer back.

--- KNOWLEDGE BASE ---
${buildKnowledgeBase(faqList)}`;
}
