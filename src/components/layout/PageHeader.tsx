import Image from "next/image";
import Container from "@/components/ui/Container";

/**
 * Compact banner for inner pages (sits below the fixed navbar).
 * Pass `image` to show a photo banner (managed per page in the admin →
 * Page Banners); otherwise it falls back to the crimson brand band.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-20 text-cream sm:pt-40 sm:pb-24">
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-maroon" />
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        </>
      )}
      <Container className="relative text-center">
        {eyebrow && <p className="eyebrow text-gold-light">{eyebrow}</p>}
        <h1 className="mt-4 text-5xl text-balance sm:text-6xl">{title}</h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/85">{intro}</p>}
        <div className="rule-gold mx-auto mt-8 w-24" />
      </Container>
    </header>
  );
}
