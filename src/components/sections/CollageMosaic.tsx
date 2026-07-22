import Image from "next/image";
import { collageImages } from "@/lib/content";

/**
 * Full-width photo mosaic with a centered "Celebrating Love, the Ashraya Way"
 * tile — echoing Shaandaar's collage band.
 */
export default function CollageMosaic() {
  return (
    <section className="bg-cream">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {collageImages.slice(0, 4).map((src, i) => (
          <Tile key={i} src={src} />
        ))}

        {/* Row 2: two images, a center text tile, one image */}
        <Tile src={collageImages[4]} />
        <Tile src={collageImages[5]} />
        <div className="col-span-2 flex aspect-square items-center justify-center bg-sand p-6 text-center sm:col-span-1">
          <p className="font-serif text-2xl leading-snug text-maroon">
            Celebrating Love,
            <br />
            <span className="italic">the</span>
            <br />
            <span className="text-3xl">&ldquo;Ashraya&rdquo;</span>
            <br />
            <span className="italic">Way</span>
          </p>
        </div>
        <Tile src={collageImages[6]} />
        <Tile src={collageImages[7]} className="sm:hidden" />
      </div>
    </section>
  );
}

function Tile({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`group relative aspect-square overflow-hidden ${className}`}>
      <Image
        src={src}
        alt="Ashraya Events celebration"
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}
