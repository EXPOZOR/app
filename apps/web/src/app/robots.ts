import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/sign-up", "/app/"],
      },
    ],
    sitemap: "https://expozor.com/sitemap.xml",
    host: "https://expozor.com",
  };
}
