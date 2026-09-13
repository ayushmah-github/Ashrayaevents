import Image from "next/image";

/**
 * Full-width photo band for the top of a page — a single wide banner for one
 * photo, or an even grid for several (matches the reference site's multi-photo
 * gallery above the About page's intro text, in place of one overlaid banner).
 */
export default function PhotoGallery({ images }: { images: string[] }) {
  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <section className="bg-cream">
        <div className="relative aspect-[16/7] w-full sm:aspect-[3/1]">
          <Image src={images[0]} alt="Ashraya Events celebration" fill priority sizes="100vw" className="object-cover" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={src}
              alt="Ashraya Events celebration"
              fill
              priority={i < 3}
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
