import { ImageResponse } from "next/og";

// Branded favicon — "A | E" monogram on crimson. Overrides the default favicon.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#9b1c22",
          color: "#fbf6ee",
          fontSize: 34,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          borderRadius: 14,
          gap: 6,
        }}
      >
        A
        <div style={{ width: 2, height: 30, background: "#c2a24e" }} />
        E
      </div>
    ),
    { ...size },
  );
}
