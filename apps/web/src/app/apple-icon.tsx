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
        background: "linear-gradient(135deg, #5EEAD4 0%, #A78BFA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        fontWeight: 800,
        fontSize: 80,
        color: "#09090B",
        letterSpacing: "-0.04em",
      }}
    >
      E
    </div>,
    { ...size },
  );
}
