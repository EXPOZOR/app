import type { MetadataRoute } from "next";

const BASE_URL = "https://expozor.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/features", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/security", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/demo", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/careers", priority: 0.5, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/download", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
