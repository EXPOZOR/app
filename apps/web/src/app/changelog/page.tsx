import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllChangelogEntries } from "@/lib/mdx";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What's new in EXPOZOR. Product updates, bug fixes, and improvements.",
  alternates: { canonical: "https://expozor.com/changelog" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Changelog", href: "/changelog" },
]);

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
        <div className="container-site section-py max-w-2xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Changelog
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-10">
            What&apos;s new
          </h1>

          <div className="space-y-12">
            {entries.map((entry) => {
              const tagColor = entry.frontmatter.tagColor || "#7CF5C2";
              return (
                <article
                  key={entry.frontmatter.version}
                  className="relative pl-8 border-l border-[var(--border)]"
                >
                  <div
                    className="absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${tagColor}1A`,
                        color: tagColor,
                        border: `1px solid ${tagColor}33`,
                      }}
                    >
                      {entry.frontmatter.tag}
                    </span>
                    <time className="text-sm text-[var(--text-tertiary)]">
                      {new Date(entry.frontmatter.date).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long" }
                      )}
                    </time>
                    <span className="text-sm font-mono text-[var(--text-tertiary)]">
                      v{entry.frontmatter.version}
                    </span>
                  </div>
                  <div className="changelog-content text-sm text-[var(--text-secondary)]">
                    <MDXRemote
                      source={entry.content}
                      components={{
                        ul: (props) => (
                          <ul className="space-y-2 list-none" {...props} />
                        ),
                        li: (props) => (
                          <li
                            className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                            {...props}
                          >
                            <span
                              className="text-[var(--accent)] mt-0.5 shrink-0"
                              aria-hidden="true"
                            >
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

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-tertiary)]">
              Subscribe to the{" "}
              <a
                href="/changelog/rss.xml"
                className="text-[var(--accent)] hover:underline"
              >
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
