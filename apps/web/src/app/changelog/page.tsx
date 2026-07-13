import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { getAllChangelogEntries } from "@/lib/mdx";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in EXPOZOR. Product updates, bug fixes, and improvements.",
  alternates: { canonical: "https://expozor.com/changelog" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Changelog", href: "/changelog" }]);

export default function ChangelogPage() {
  const entries = getAllChangelogEntries();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site measure-section section-py">
          <PageHero eyebrow="Changelog" title="What's new" scale="compact" className="mb-10" />

          <div className="space-y-12">
            {entries.map((entry) => {
              const tagColor = entry.frontmatter.tagColor || BRAND_COLORS.lilac;
              return (
                <article
                  key={entry.frontmatter.version}
                  className="relative pl-8 border-l border-border"
                >
                  <div
                    className="absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-decorative bg-bg"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{
                        background: `${tagColor}1A`,
                        color: tagColor,
                        border: `1px solid ${tagColor}33`,
                      }}
                    >
                      {entry.frontmatter.tag}
                    </span>
                    <time className="text-sm text-text-tertiary">
                      {new Date(entry.frontmatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                    <span className="text-sm font-mono text-text-tertiary">
                      v{entry.frontmatter.version}
                    </span>
                  </div>
                  <div className="changelog-content text-sm text-text-secondary">
                    <MDXRemote
                      source={entry.content}
                      components={{
                        ul: (props) => <ul className="space-y-2 list-none" {...props} />,
                        li: (props) => (
                          <li
                            className="flex items-start gap-2 text-sm text-text-secondary"
                            {...props}
                          >
                            <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                              +
                            </span>
                            <span>{props.children}</span>
                          </li>
                        ),
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-text-tertiary">
              Subscribe to the{" "}
              <a href="/changelog/rss.xml" className="text-accent hover:underline">
                RSS feed
              </a>{" "}
              to get updates in your reader.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
