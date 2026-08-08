/** Tiny classnames joiner — filters out falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** wa.me deep link with an optional prefilled message. */
export function whatsappLink(digits: string, message?: string): string {
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Extract an 11-char YouTube video ID from a full URL, or return the input if
 *  it already looks like an ID. Handles youtu.be, watch?v=, /embed/, /shorts/. */
export function youtubeId(input: string): string {
  const s = (input || "").trim();
  if (!s) return "";
  const m = s.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // already an ID?
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  return s;
}

/** Turn an Instagram post/reel URL into its embeddable iframe URL. */
export function instagramEmbedUrl(input: string): string {
  const s = (input || "").trim().replace(/\/$/, "");
  if (!s) return "";
  return `${s}/embed`;
}
