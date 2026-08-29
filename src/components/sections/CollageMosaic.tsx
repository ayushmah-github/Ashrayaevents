import Image from "next/image";
import { collageImages as fallback } from "@/lib/content";
import { getSiteSettings } from "@/lib/cms/content";

// Where the "Celebrating Love…" text tile sits among the photos (0-indexed,
// left-to-right / top-to-bottom in the 4-column grid) — matches row 2, col 3.
const TEXT_TILE_POSITION = 6;

/**
 * Full-width photo mosaic with a "Celebrating Love, the Ashraya Way" tile
 * fixed in place among the photos. Upload any number of photos in the admin
 * (Site Settings → Home collage photos) — the grid grows to fit them, in the
 * order you add them, just like Shaandaar's collage.
 */
export default async function CollageMosaic() {
  const settings = await getSiteSettings();
  const uploaded = settings.collageImages ?? [];

  // Grid mode as soon as you've uploaded ANY photo — no fixed photo count.
  if (uploaded.length > 0) {
    return <Grid images={uploaded} />;
  }

  // Single ready-made collage banner (only used if no grid photos are set).
  if (settings.collageImage) {
    return (
      <section className="bg-cream">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={settings.collageImage}
            alt="Celebrating love, the Ashraya way"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>
    );
  }

  return <Grid images={fallback} />;
}

function Grid({ images }: { images: string[] }) {
  const textAt = Math.min(TEXT_TILE_POSITION, images.length);
  const cells: (string | "text")[] = [...images.slice(0, textAt), "text", ...images.slice(textAt)];

  return (
    <section className="bg-cream">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {cells.map((cell, i) =>
          cell === "text" ? (
            <div
              key="text-tile"
              className="col-span-2 flex aspect-square items-center justify-center bg-sand p-6 text-center sm:col-span-1"
            >
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
          ) : (
            <Tile key={i} src={cell} />
          ),
        )}
      </div>
    </section>
  );
}

function Tile({ src }: { src: string }) {
  return (
    <div className="group relative aspect-square overflow-hidden">
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
