import { NextResponse } from "next/server";
import { getClient, MODEL, textFromMessage } from "@/lib/ai/client";
import { chatSystemPrompt } from "@/lib/ai/knowledge";
import { getFaqs } from "@/lib/cms/content";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * AI Chat Concierge endpoint.
 * Body: { messages: Msg[] }  -> { reply: string }
 * Falls back to a helpful canned reply when ANTHROPIC_API_KEY isn't configured.
 */
export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    // Graceful degradation — no API key set yet.
    return NextResponse.json({
      reply:
        "Thanks for reaching out! Our live assistant isn't connected yet, but we'd love to help — please use the Contact page or WhatsApp us and our team will reply quickly.",
      configured: false,
    });
  }

  try {
    const faqs = await getFaqs();
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: chatSystemPrompt(faqs),
      messages: messages.slice(-12).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });
    return NextResponse.json({ reply: textFromMessage(message), configured: true });
  } catch (err) {
    console.error("[/api/chat]", err);
    return NextResponse.json(
      {
        reply:
          "Sorry, I hit a snag. Please try again, or reach us via the Contact page and we'll respond personally.",
      },
      { status: 200 },
    );
  }
}
