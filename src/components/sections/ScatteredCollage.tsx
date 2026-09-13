/**
 * Pinterest-style photo collage — images keep their natural aspect ratio and
 * stack into balanced columns (CSS multi-column, no JS/layout library),
 * matching the reference site's staggered, uneven photo arrangement instead
 * of a uniform same-size grid.
 */
export default function ScatteredCollage({ images }: { images: string[] }) {
  if (!images.length) return null;
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-2 xl:columns-3">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- natural aspect ratio for masonry; dimensions unknown ahead of time
        <img
          key={i}
          src={src}
          alt="Ashraya Events celebration"
          loading={i < 2 ? "eager" : "lazy"}
          className="mb-4 block w-full break-inside-avoid rounded-sm"
        />
      ))}
    </div>
  );
}
