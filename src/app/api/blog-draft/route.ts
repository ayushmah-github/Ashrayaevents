import { NextResponse } from "next/server";
import { getClient, MODEL, textFromMessage } from "@/lib/ai/client";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * AI Blog Assistant (internal tool).
 * Body: { notes: string, category?: string }
 * Returns a polished draft blog post the client can refine and publish.
 */
export async function POST(req: Request) {
  let body: { notes?: string; category?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body.notes?.trim()) {
    return NextResponse.json({ error: "Please provide some notes." }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json({
      draft: "AI drafting isn't configured yet — set ANTHROPIC_API_KEY in .env.local to enable this tool.",
      configured: false,
    });
  }

  const system = `You are a warm, elegant content writer for ${site.name}, a wedding & event planning studio. Turn the client's rough notes (and any photo captions) into a polished, publish-ready blog post. Voice: warm, tasteful, celebratory, helpful — never salesy. Structure with a compelling title, a short intro, 2-4 sections with H2 headings, and a gentle closing invitation to get in touch. Return clean Markdown only (start with an H1 title).`;

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system,
      messages: [
        {
          role: "user",
          content: `Category: ${body.category || "General"}\n\nNotes / key points:\n${body.notes}`,
        },
      ],
    });
    return NextResponse.json({ draft: textFromMessage(message), configured: true });
  } catch (err) {
    console.error("[/api/blog-draft]", err);
    return NextResponse.json({ error: "Draft generation failed — please try again." }, { status: 200 });
  }
}
