const BASE_URL = "https://expozor.com";

/* ── Breadcrumb ────────────────────────────────────────────── */

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Build a JSON-LD BreadcrumbList from an ordered list of items.
 * The homepage is prepended automatically.
 */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}

/* ── WebPage ───────────────────────────────────────────────── */

export function webPageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${BASE_URL}${url}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

/* ── Helper: render script tag ─────────────────────────────── */

/**
 * Returns a stringified JSON-LD ready to inject via
 * `dangerouslySetInnerHTML`. Accepts one or more schemas.
 */
export function jsonLdString(
  ...schemas: Record<string, unknown>[]
): string {
  if (schemas.length === 1) return JSON.stringify(schemas[0]);
  return JSON.stringify(schemas);
}
