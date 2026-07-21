import { NextResponse } from "next/server";
import { getClient, MODEL, textFromMessage } from "@/lib/ai/client";
import { buildKnowledgeBase } from "@/lib/ai/knowledge";

export const runtime = "nodejs";

export type EstimateInput = {
  eventType?: string;
  guestCount?: string;
  city?: string;
  style?: string;
  mustHaves?: string;
  budgetRange?: string;
  name?: string;
  contact?: string;
  eventDate?: string;
};

export type EstimateResult = {
  priceRange: string;
  recommendedPackage: string;
  styleDirection: string;
  inclusions: string[];
  matchedCategories: string[]; // used for smart portfolio/testimonial matching
  leadSummary: string; // AI lead card for the client's team
  message: string; // friendly note shown to the visitor
};

// Deterministic fallback so the estimator works even without an API key.
function fallback(input: EstimateInput): EstimateResult {
  return {
    priceRange: "We'll share a tailored quote shortly",
    recommendedPackage: "Bespoke Signature Package",
    styleDirection:
      "An elegant, warm celebration tailored to your taste — refined florals, thoughtful lighting and a seamless guest experience.",
    inclusions: [
      "Full planning & coordination",
      "Venue & vendor curation",
      "Décor & styling",
      "On-day event management",
    ],
    matchedCategories: [input.eventType?.toLowerCase().includes("corp") ? "Corporate" : "Wedding"],
    leadSummary: `New estimate request — ${input.eventType || "event"} in ${input.city || "TBD"}, ~${input.guestCount || "?"} guests, budget ${input.budgetRange || "unspecified"}. Contact: ${input.name || "?"} / ${input.contact || "?"} for ${input.eventDate || "date TBD"}.`,
    message:
      "Thank you! Our live estimator isn't connected yet, but we've noted your details and our team will send a personalised estimate soon.",
    configured: false,
  } as EstimateResult & { configured: boolean };
}

/**
 * AI Budget/Package Estimator.
 * Body: EstimateInput -> EstimateResult (+ echoes input for the lead email)
 */
export async function POST(req: Request) {
  let input: EstimateInput = {};
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json({ ...fallback(input), input });
  }

  const system = `You are the senior planner at an elegant wedding & event studio. Given a visitor's requirements, produce a realistic, encouraging personalised estimate. Prices are in Indian Rupees (INR); give a sensible RANGE, never a single number, and keep it grounded for the Indian market. Recommend ONE package and a short style direction. Also produce a concise internal lead summary for our sales team.

Respond with ONLY valid minified JSON (no markdown, no code fences) matching exactly this shape:
{"priceRange":string,"recommendedPackage":string,"styleDirection":string,"inclusions":string[],"matchedCategories":string[],"leadSummary":string,"message":string}
- matchedCategories: 1-3 of ["Wedding","Destination","Corporate","Birthday","Décor"] best matching this enquiry.
- message: 2-3 warm sentences addressed to the visitor.
- leadSummary: one dense line for our team (event type, guests, city, budget signal, urgency, contact).

--- KNOWLEDGE BASE ---
${buildKnowledgeBase()}`;

  const userContent = `Requirements:
- Event type: ${input.eventType || "?"}
- Guest count: ${input.guestCount || "?"}
- City / location: ${input.city || "?"}
- Style preferences: ${input.style || "?"}
- Must-haves: ${input.mustHaves || "?"}
- Budget range: ${input.budgetRange || "not specified"}
- Name: ${input.name || "?"}
- Contact: ${input.contact || "?"}
- Event date: ${input.eventDate || "?"}`;

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 900,
      system,
      messages: [{ role: "user", content: userContent }],
    });
    const raw = textFromMessage(message);
    const parsed = JSON.parse(raw) as EstimateResult;
    return NextResponse.json({ ...parsed, input, configured: true });
  } catch (err) {
    console.error("[/api/estimate]", err);
    return NextResponse.json({ ...fallback(input), input });
  }
}
