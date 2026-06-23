import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Desert Adventures`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card. Detail pages override with their own hero image.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #080d17 0%, #142138 45%, #5c220e 80%, #c2410c 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #ec7032, #c2410c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            DS
          </div>
          <span style={{ fontSize: 28, fontWeight: 700 }}>{siteConfig.shortName}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Ride the storm.
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              background: "linear-gradient(135deg, #f2965e, #e25613)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Own the dunes.
          </span>
          <span style={{ marginTop: 24, fontSize: 30, color: "rgba(255,255,255,0.8)" }}>
            Quads · Buggies · MX · Sunset Safaris — Dubai Desert
          </span>
        </div>
      </div>
    ),
    size
  );
}
