"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Instagram's official embed script — loaded once, then re-run for every post.
let scriptPromise: Promise<void> | null = null;
function loadEmbedScript(): Promise<void> {
  if (window.instgrm) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Renders a real, live Instagram post/reel using Meta's official public embed
 * (embed.js) — works for any public post URL with no login or API key. This
 * is the supported alternative to a bare <iframe src=".../embed">, which
 * Instagram frequently blocks with X-Frame-Options.
 */
export default function InstagramEmbedPost({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={ref} className="flex justify-center overflow-hidden rounded-2xl bg-white">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ width: "100%", minWidth: "270px", margin: 0 }}
      />
    </div>
  );
}
