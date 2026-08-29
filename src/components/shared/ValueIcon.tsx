/** Minimal inline icon set for Core Values cards — no icon library dependency. */
const PATHS: Record<string, string> = {
  heart:
    "M12 21s-7.5-4.6-10-9.1C.6 8.7 2 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5 18 5 19.4 8.7 22 11.9 19.5 16.4 12 21 12 21z",
  shield: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z",
  wallet:
    "M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM16 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  sparkles:
    "M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z",
  star: "M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9 5.8 20.3l1.6-6.8L2.2 8.9l6.9-.6L12 2z",
  compass: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM15 9l-2 6-6 2 2-6 6-2z",
  gem: "M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12",
  leaf: "M4 20C4 10 10 4 20 4c0 10-6 16-16 16zM4 20c3-6 8-10 14-13",
};

export default function ValueIcon({ name, className = "h-7 w-7" }: { name?: string; className?: string }) {
  const path = (name && PATHS[name]) || PATHS.sparkles;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
