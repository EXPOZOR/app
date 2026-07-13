import { BRAND_COLORS, BRAND_EFFECTS } from "@/lib/brand-colors";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: BRAND_EFFECTS.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        fontWeight: 800,
        fontSize: 16,
        color: BRAND_COLORS.background,
        letterSpacing: "-0.04em",
      }}
    >
      E
    </div>,
    { ...size },
  );
}
