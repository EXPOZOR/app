import { BRAND_COLORS, BRAND_EFFECTS } from "@/lib/brand-colors";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: 40,
        background: BRAND_EFFECTS.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        fontWeight: 800,
        fontSize: 80,
        color: BRAND_COLORS.background,
        letterSpacing: "-0.04em",
      }}
    >
      E
    </div>,
    { ...size },
  );
}
