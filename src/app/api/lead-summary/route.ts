import { NextResponse } from "next/server";
import { getClient, MODEL, textFromMessage } from "@/lib/ai/client";

export const runtime = "nodejs";

export type LeadCard = {
  eventType: string;
  budgetSignal: string;
  urgency: "high" | "medium" | "low" | "unknown";
  score: number; // 1-10 lead quality
  summary: string; // ready-to-call one-liner
  suggestedReply: string;
};

/**
 * Automated Lead Scoring & Summary.
 * Body: { source: "contact"|"chat"|"estimate", content: string, fields?: object }
 * Returns a structured LeadCard the client's team can act on. Attach the JSON
 * to the lead email so every enquiry arrives as a ready-to-call card.
 */
export async function POST(req: Request) {
  let body: { source?: string; content?: string; fields?: Record<string, unknown> } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json({
      card: {
        eventType: "unknown",
        budgetSignal: "unknown",
        urgency: "unknown",
        score: 0,
        summary: "Lead scoring not configured — review the raw enquiry manually.",
        suggestedReply: "",
      } satisfies LeadCard,
      configured: false,
    });
  }

  const system = `You score inbound leads for a wedding & event planning studio. Read the enquiry and return ONLY valid minified JSON (no markdown) of this shape:
{"eventType":string,"budgetSignal":string,"urgency":"high"|"medium"|"low"|"unknown","score":number,"summary":string,"suggestedReply":string}
- score: 1-10 lead quality (event clarity + budget + urgency + contactability).
- summary: one dense line a salesperson can read before calling.
- suggestedReply: a warm 1-2 sentence first response to send the lead.`;

  const content = `Source: ${body.source || "unknown"}
Enquiry:
${body.content || JSON.stringify(body.fields || {}, null, 2)}`;

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 500,
      system,
      messages: [{ role: "user", content }],
    });
    const card = JSON.parse(textFromMessage(message)) as LeadCard;
    return NextResponse.json({ card, configured: true });
  } catch (err) {
    console.error("[/api/lead-summary]", err);
    return NextResponse.json(
      {
        card: {
          eventType: "unknown",
          budgetSignal: "unknown",
          urgency: "unknown",
          score: 0,
          summary: "Could not auto-summarise — review the raw enquiry.",
          suggestedReply: "",
        } satisfies LeadCard,
      },
      { status: 200 },
    );
  }
}
