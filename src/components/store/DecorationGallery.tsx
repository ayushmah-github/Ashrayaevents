"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Main image + clickable thumbnails. */
export default function DecorationGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) {
    return <div className="aspect-[4/3] w-full rounded-[var(--radius-xl2)] bg-sand" />;
  }
  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-24 flex-none overflow-hidden rounded-xl ring-2 transition",
                i === active ? "ring-gold" : "ring-transparent hover:ring-maroon/30",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
