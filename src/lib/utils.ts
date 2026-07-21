/** Tiny classnames joiner — filters out falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** wa.me deep link with an optional prefilled message. */
export function whatsappLink(digits: string, message?: string): string {
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
