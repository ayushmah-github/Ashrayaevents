import Link from "next/link";
import Container from "@/components/ui/Container";

/** Simple breadcrumb trail, e.g. Home / About / How it works. */
export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="border-b border-maroon/10 bg-cream py-3">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-ink-soft">
          {items.map((item, i) => (
            <span key={item.label}>
              {item.href ? (
                <Link href={item.href} className="hover:text-maroon">
                  {item.label}
                </Link>
              ) : (
                <span className="text-maroon">{item.label}</span>
              )}
              {i < items.length - 1 && <span className="mx-2 text-ink-soft/50">/</span>}
            </span>
          ))}
        </nav>
      </Container>
    </div>
  );
}
