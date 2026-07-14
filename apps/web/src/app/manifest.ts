import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EXPOZOR",
    short_name: "EXPOZOR",
    description:
      "Manual expense tracking with receipt upload, CSV import, and AI-assisted categorization planned.",
    start_url: "/",
    display: "browser",
    background_color: "#0A0A0B",
    theme_color: "#0A0A0B",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
