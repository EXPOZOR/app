import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Changelog — EXPOZOR",
  description: "What's new in EXPOZOR. Product updates, bug fixes, and improvements.",
};

const entries = [
  {
    version: "0.1.0",
    date: "June 2026",
    tag: "Launch",
    tagColor: "#7CF5C2",
    changes: [
      "Marketing website launched with waitlist",
      "Interactive demo available at /demo",
      "6 locales: en, fr, ar, es, de, ja",
      "Privacy policy and security documentation published",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site section-py max-w-2xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">Changelog</p>
          <h1 className="text-4xl font-bold tracking-tight mb-10">What's new</h1>

          <div className="space-y-12">
            {entries.map((entry) => (
              <article key={entry.version} className="relative pl-8 border-l border-[var(--border)]">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" aria-hidden="true" />
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: entry.tagColor + "1A", color: entry.tagColor, border: `1px solid ${entry.tagColor}33` }}
                  >
                    {entry.tag}
                  </span>
                  <time className="text-sm text-[var(--text-tertiary)]">{entry.date}</time>
                  <span className="text-sm font-mono text-[var(--text-tertiary)]">v{entry.version}</span>
                </div>
                <ul className="space-y-2 list-none">
                  {entry.changes.map((change) => (
                    <li key={change} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent)] mt-1 shrink-0" aria-hidden="true">+</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-tertiary)]">
              Subscribe to the{" "}
              <a href="/changelog.rss" className="text-[var(--accent)] hover:underline">RSS feed</a>{" "}
              to get updates in your reader.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
