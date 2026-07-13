import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FeaturesSection } from "@/components/sections/features-section";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Manual expense tracking today, with receipt capture, CSV import, AI-assisted categorization, and mobile apps planned. No bank connection required.",
  alternates: { canonical: "https://expozor.com/features" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Features", href: "/features" }]);

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site py-16 text-center max-w-3xl">
          <PageHero
            eyebrow="Features"
            title="Expense tracking without bank connections"
            description="Manual entry today, with receipt capture, CSV import, and AI assistance planned for early access."
            align="center"
          />
        </div>
        <FeaturesSection />

        {/* Capture section */}
        <section
          id="capture"
          className="section-py border-t border-[var(--border)]"
          aria-labelledby="capture-heading"
        >
          <div className="container-site max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
                  Capture
                </p>
                <h2 id="capture-heading" className="text-3xl font-bold mb-4">
                  Receipt capture is on the roadmap
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Receipt upload and scanning are planned features. EXPOZOR does not currently
                  advertise a specific OCR provider, speed target, or supported receipt count.
                </p>
                <ul className="space-y-3 text-[var(--text-secondary)] text-sm">
                  {[
                    "Manual entry available first",
                    "Receipt upload planned for early access",
                    "OCR provider not selected yet",
                    "User review before saving extracted details",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-surface)] p-8 aspect-square flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-40 h-40 opacity-60"
                  role="presentation"
                  aria-hidden="true"
                >
                  <rect
                    x="40"
                    y="20"
                    width="120"
                    height="160"
                    rx="10"
                    fill="#18181b"
                    stroke="#7CF5C2"
                    strokeOpacity="0.3"
                  />
                  <rect
                    x="55"
                    y="40"
                    width="90"
                    height="10"
                    rx="5"
                    fill="#7CF5C2"
                    fillOpacity="0.4"
                  />
                  {[60, 78, 96, 114, 132].map((y) => (
                    <g key={y}>
                      <rect
                        x="55"
                        y={y}
                        width={40 + Math.sin(y) * 15}
                        height="7"
                        rx="3.5"
                        fill="#a1a1aa"
                        fillOpacity="0.3"
                      />
                      <rect
                        x="145"
                        y={y}
                        width="22"
                        height="7"
                        rx="3.5"
                        fill="#FFB36B"
                        fillOpacity="0.4"
                      />
                    </g>
                  ))}
                  <line
                    x1="36"
                    y1="100"
                    x2="164"
                    y2="100"
                    stroke="#7CF5C2"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    strokeDasharray="6 3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* AI section */}
        <section
          id="ai"
          className="section-py border-t border-[var(--border)]"
          aria-labelledby="ai-heading"
        >
          <div className="container-site max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className="order-2 md:order-1 rounded-[var(--radius-xl)] border border-[var(--border-accent)] bg-[var(--accent-subtle)] p-8 space-y-3"
                aria-hidden="true"
              >
                {[
                  { label: "Coffee Shop", cat: "Food & Drink", color: "#7CF5C2" },
                  { label: "Gas Station", cat: "Transport", color: "#60a5fa" },
                  {
                    label: "Design Subscription",
                    cat: "Subscriptions",
                    color: "#a78bfa",
                  },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-3 p-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)]"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: t.color }}
                    />
                    <span className="text-sm text-[var(--text-primary)] flex-1">{t.label}</span>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ color: t.color, background: `${t.color}22` }}
                    >
                      {t.cat}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2">
                <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
                  Intelligence
                </p>
                <h2 id="ai-heading" className="text-3xl font-bold mb-4">
                  AI-assisted categorization planned
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  AI category suggestions are planned for early access. The intended workflow keeps
                  user review in the loop and avoids presenting unreviewed suggestions as final.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
