import { getAllBlogPosts } from "@/lib/mdx";
import type { MetadataRoute } from "next";

const BASE_URL = "https://expozor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/features", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/demo", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/security", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/careers", priority: 0.5, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/download", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/legal/subprocessors", priority: 0.3, changeFrequency: "monthly" as const },
    { url: "/legal/cookies", priority: 0.2, changeFrequency: "yearly" as const },
    { url: "/legal/refund", priority: 0.2, changeFrequency: "yearly" as const },
    { url: "/legal/disclaimer", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...blogPosts];
}
