import { ImageResponse } from "next/og";

/*
 * Site-wide OG card. Brand-only (no photography dependency): smoked-glass
 * blue-black field, the device's violet halo, editorial serif wordmark —
 * the same Tungsten & Silver story as the pages themselves.
 */

export const alt = "LUX Mirror — Smart mirrors for modern salons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "#0b0d12",
          color: "#f4f4f6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "3px solid #7c5cff",
            boxShadow: "0 0 80px 20px rgba(124, 92, 255, 0.45)",
            display: "flex",
            marginBottom: 48,
          }}
        />
        <div style={{ fontSize: 76, display: "flex" }}>LUX Mirror</div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9aa0ae",
            marginTop: 18,
            display: "flex",
          }}
        >
          Smart mirrors for modern salons
        </div>
      </div>
    ),
    size,
  );
}
