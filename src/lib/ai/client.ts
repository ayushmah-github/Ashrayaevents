/* ============================================================================
 * Anthropic (Claude) client helper
 * ----------------------------------------------------------------------------
 * Central place for the Claude model + client. If ANTHROPIC_API_KEY is not set,
 * getClient() returns null so the site still works with graceful fallbacks.
 *
 * MODEL: defaults to Claude Opus 4.8 (most capable). To reduce cost on a busy
 * marketing site you can switch to "claude-sonnet-5" or "claude-haiku-4-5"
 * here — it's the only place the model is referenced.
 * ========================================================================== */
import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-opus-4-8";

export function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
}

/** Pull the concatenated text out of a Claude message response. */
export function textFromMessage(message: Anthropic.Message): string {
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
}
