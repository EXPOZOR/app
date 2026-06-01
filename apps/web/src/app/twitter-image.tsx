import { ImageResponse } from "next/og";

export const alt = "EXPOZOR — Your finances, finally intelligent.";
// Twitter prefers 2:1; 1200×600 works for summary_large_image
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 600,
          background: "#09090B",
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
            background:
              "radial-gradient(ellipse at center, rgba(94,234,212,0.12) 0%, rgba(167,139,250,0.06) 45%, transparent 70%)",
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
            background: "linear-gradient(135deg, #5EEAD4 0%, #A78BFA 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 800,
            color: "#09090B",
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
            color: "#F4F4F5",
            letterSpacing: "-0.04em",
            marginBottom: 4,
          }}
        >
          Your finances,
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            marginBottom: 22,
            background: "linear-gradient(135deg, #5EEAD4 0%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          finally intelligent.
        </div>

        {/* Subhead */}
        <div
          style={{
            display: "flex",
            fontSize: 19,
            color: "#A1A1AA",
            marginBottom: 0,
          }}
        >
          Snap · Sync · AI-categorize · Budget · Split
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
      </div>
    ),
    { ...size }
  );
}
