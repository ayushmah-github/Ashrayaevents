import Image from "next/image";

/** Full-bleed photo strip used mid-page on destination/city landing pages. */
export default function PhotoRow({ images }: { images: string[] }) {
  if (!images.length) return null;
  return (
    <section className="bg-cream">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={src}
              alt="Ashraya Events celebration"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
