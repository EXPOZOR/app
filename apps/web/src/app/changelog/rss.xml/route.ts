import { getAllChangelogEntries } from "@/lib/mdx";

const BASE_URL = "https://expozor.com";

export function GET() {
  const entries = getAllChangelogEntries();

  const items = entries
    .map(
      (entry) => `
    <item>
      <title><![CDATA[EXPOZOR v${entry.frontmatter.version} — ${entry.frontmatter.tag}]]></title>
      <description><![CDATA[${entry.content.trim()}]]></description>
      <link>${BASE_URL}/changelog</link>
      <guid isPermaLink="false">expozor-changelog-v${entry.frontmatter.version}</guid>
      <pubDate>${new Date(entry.frontmatter.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EXPOZOR Changelog</title>
    <description>Product updates, bug fixes, and improvements to EXPOZOR.</description>
    <link>${BASE_URL}/changelog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/changelog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
