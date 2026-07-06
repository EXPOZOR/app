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
        background: "linear-gradient(135deg, #5EEAD4 0%, #A78BFA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
        fontWeight: 800,
        fontSize: 16,
        color: "#09090B",
        letterSpacing: "-0.04em",
      }}
    >
      E
    </div>,
    { ...size },
  );
}
