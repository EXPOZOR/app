import { BRAND_COLORS, BRAND_EFFECTS } from "@/lib/brand-colors";
import { ImageResponse } from "next/og";

export const alt = "EXPOZOR - Know Where Your Money Is Really Going";
// Twitter prefers 2:1; 1200×600 works for summary_large_image
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 600,
        background: BRAND_COLORS.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: 200,
          width: 800,
          height: 500,
          background: `radial-gradient(ellipse at center, ${BRAND_EFFECTS.mintGlow} 0%, ${BRAND_EFFECTS.lilacGlow} 45%, transparent 70%)`,
          borderRadius: "50%",
          display: "flex",
        }}
      />

      {/* Logo */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: BRAND_EFFECTS.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 800,
          color: BRAND_COLORS.background,
          marginBottom: 28,
        }}
      >
        E
      </div>

      {/* Headline */}
      <div
        style={{
          display: "flex",
          fontSize: 54,
          fontWeight: 800,
          color: BRAND_COLORS.text,
          letterSpacing: "-0.04em",
          marginBottom: 4,
        }}
      >
        Know where your money is
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          marginBottom: 22,
          background: BRAND_EFFECTS.gradient,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        really going.
      </div>

      {/* Subhead */}
      <div
        style={{
          display: "flex",
          fontSize: 19,
          color: BRAND_COLORS.textMuted,
          marginBottom: 0,
        }}
      >
        Manual entry first - upload, import, and AI assistance planned
      </div>

      {/* Wordmark */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          display: "flex",
          fontSize: 15,
          fontWeight: 700,
          color: "#52525B",
        }}
      >
        expozor.app
      </div>
    </div>,
    { ...size },
  );
}
