import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Default social-share card. (Blog posts override with their own cover image.)
export const alt = `${site.name} — Wedding & Event Planning`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6e1116 0%, #9b1c22 60%, #bc3a40 100%)",
          color: "#fbf6ee",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 8, color: "#e2cd92", textTransform: "uppercase" }}>
          Weddings · Celebrations · Events
        </div>
        <div style={{ display: "flex", fontSize: 88, marginTop: 24, fontWeight: 600 }}>
          {site.name}
          <span style={{ color: "#c2a24e" }}>.</span>
        </div>
        <div style={{ fontSize: 34, marginTop: 20, color: "#fbf6eecc", maxWidth: 820 }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
