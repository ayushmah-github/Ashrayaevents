/** Simple gold star rating row. */
export default function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 text-gold ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < count ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}
