import { BRAND_COLORS, BRAND_EFFECTS } from "@/lib/brand-colors";
import { ImageResponse } from "next/og";

export const alt = "EXPOZOR - Know Where Your Money Is Really Going";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function OgImageContent() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
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
      {/* Ambient glow layer */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: 200,
          width: 800,
          height: 600,
          background: `radial-gradient(ellipse at center, ${BRAND_EFFECTS.mintGlow} 0%, ${BRAND_EFFECTS.lilacGlow} 45%, transparent 70%)`,
          borderRadius: "50%",
          display: "flex",
        }}
      />

      {/* Logo mark */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: BRAND_EFFECTS.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 800,
          color: BRAND_COLORS.background,
          marginBottom: 32,
        }}
      >
        E
      </div>

      {/* Headline line 1 */}
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 800,
          color: BRAND_COLORS.text,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: 6,
        }}
      >
        Know where your money is
      </div>

      {/* Headline line 2 — gradient word */}
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: 24,
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
          fontSize: 21,
          color: BRAND_COLORS.textMuted,
          textAlign: "center",
          maxWidth: 660,
          lineHeight: 1.5,
          marginBottom: 40,
        }}
      >
        Manual entry first - upload, import, and AI assistance planned
      </div>

      {/* Beta chip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 24px",
          borderRadius: 9999,
          border: `1px solid ${BRAND_EFFECTS.mintBorder}`,
          background: BRAND_EFFECTS.mintSurface,
          color: BRAND_COLORS.mint,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: BRAND_COLORS.mint,
            display: "flex",
          }}
        />
        Join the waitlist
      </div>

      {/* Bottom wordmark */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          display: "flex",
          fontSize: 17,
          fontWeight: 700,
          color: "#52525B",
          letterSpacing: "-0.02em",
        }}
      >
        expozor.app
      </div>
    </div>
  );
}

export default function OgImage() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
