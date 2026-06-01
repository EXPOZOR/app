import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FeaturesSection } from "@/components/marketing/features-section";

export const metadata: Metadata = {
  title: "Features — EXPOZOR",
  description:
    "Receipt scanning, bank sync, AI categorization, budgets, shared expenses, and the EXPOZOR AI agent. Everything your money needs.",
};

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site py-16 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Features
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Everything your money needs
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            Built for the way you actually spend. Not the way a spreadsheet thinks you do.
          </p>
        </div>
        <FeaturesSection />

        {/* Capture section */}
        <section id="capture" className="section-py border-t border-[var(--border)]" aria-labelledby="capture-heading">
          <div className="container-site max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">Capture</p>
                <h2 id="capture-heading" className="text-3xl font-bold mb-4">Snap & done in 2 seconds</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  On-device ML Kit OCR reads your receipt before you've put your phone away.
                  Amount, date, merchant, line items — all extracted and confirmed with one tap.
                </p>
                <ul className="space-y-3 text-[var(--text-secondary)] text-sm">
                  {["On-device OCR (no cloud round-trip for most receipts)", "Server-side vision fallback when confidence < 70%", "Editable confirmation before saving", "Supports 40+ receipt formats"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-surface)] p-8 aspect-square flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40 opacity-60">
                  <rect x="40" y="20" width="120" height="160" rx="10" fill="#18181b" stroke="#7CF5C2" strokeOpacity="0.3" />
                  <rect x="55" y="40" width="90" height="10" rx="5" fill="#7CF5C2" fillOpacity="0.4" />
                  {[60, 78, 96, 114, 132].map((y) => (
                    <g key={y}>
                      <rect x="55" y={y} width={40 + Math.sin(y) * 15} height="7" rx="3.5" fill="#a1a1aa" fillOpacity="0.3" />
                      <rect x="145" y={y} width="22" height="7" rx="3.5" fill="#FFB36B" fillOpacity="0.4" />
                    </g>
                  ))}
                  <line x1="36" y1="100" x2="164" y2="100" stroke="#7CF5C2" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="6 3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* AI section */}
        <section id="ai" className="section-py border-t border-[var(--border)]" aria-labelledby="ai-heading">
          <div className="container-site max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 rounded-[var(--radius-xl)] border border-[var(--border-accent)] bg-[var(--accent-subtle)] p-8 space-y-3" aria-hidden="true">
                {[
                  { label: "Starbucks", cat: "Food & Drink", conf: 98, color: "#7CF5C2" },
                  { label: "Shell Gas", cat: "Transport", conf: 96, color: "#60a5fa" },
                  { label: "Adobe Creative Cloud", cat: "Subscriptions", conf: 99, color: "#a78bfa" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-3 p-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)]">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                    <span className="text-sm text-[var(--text-primary)] flex-1">{t.label}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{t.cat}</span>
                    <span className="text-xs font-medium" style={{ color: t.color }}>{t.conf}%</span>
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2">
                <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">Intelligence</p>
                <h2 id="ai-heading" className="text-3xl font-bold mb-4">AI that defers to your rules</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Your rules run first. Only when no rule matches does the AI step in — and it
                  always shows its work. Confidence below 60% goes to your review queue, never
                  auto-applied.
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
