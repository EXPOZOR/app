import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, Lock, Eye, Server, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Security — EXPOZOR",
  description:
    "How EXPOZOR protects your financial data. AES-256-GCM encryption, per-user envelope keys, row-level security, TLS 1.3, GDPR compliance, and responsible disclosure.",
};

const pillars = [
  {
    icon: Lock,
    title: "Encryption at rest",
    description:
      "All data encrypted with AES-256-GCM via managed KMS. Sensitive fields (notes, raw bank descriptions, OCR output) use per-user envelope encryption — your key, your data.",
    accent: "#7CF5C2",
  },
  {
    icon: ShieldCheck,
    title: "Row-Level Security",
    description:
      "Every user-scoped table in Postgres enforces RLS. Even if a bug exists in application logic, the database enforces that users can only see their own data.",
    accent: "#60a5fa",
  },
  {
    icon: Eye,
    title: "Zero trackers in the app",
    description:
      "No third-party trackers inside the authenticated experience. Analytics are first-party (PostHog, reverse-proxied). Your spending habits stay private.",
    accent: "#a78bfa",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description:
      "TLS 1.3 everywhere. HSTS preload. Strict CSP. SRI for any third-party script. Environment separation: real data never appears in local or preview environments.",
    accent: "#FFB36B",
  },
  {
    icon: FileCheck,
    title: "GDPR & data rights",
    description:
      "Export or delete your data in under 24 hours. Inactive accounts are warned after 24 months then auto-deleted. Audit logs retained 13 months.",
    accent: "#4ade80",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <div className="container-site py-16 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Security
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Your money data is sacred.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            We designed EXPOZOR from the ground up with privacy and security as first-class
            requirements — not afterthoughts.
          </p>
        </div>

        {/* Pillars grid */}
        <section className="section-py" aria-labelledby="security-pillars-heading">
          <div className="container-site">
            <h2 id="security-pillars-heading" className="sr-only">
              Security pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className="glass rounded-[var(--radius-xl)] p-6 border border-[var(--border)] flex flex-col gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-[var(--radius)] flex items-center justify-center"
                      style={{
                        background: pillar.accent + "1A",
                        border: `1px solid ${pillar.accent}33`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: pillar.accent }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Responsible disclosure */}
        <section className="section-py border-t border-[var(--border)]" aria-labelledby="disclosure-heading">
          <div className="container-site max-w-2xl text-center">
            <h2 id="disclosure-heading" className="text-3xl font-bold mb-4">
              Responsible disclosure
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              Found a security vulnerability? We take all reports seriously and aim to respond
              within 48 hours. Please email{" "}
              <a
                href="mailto:security@expozor.app"
                className="text-[var(--accent)] hover:underline"
              >
                security@expozor.app
              </a>{" "}
              with a description of the issue and steps to reproduce.
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              We follow a 90-day coordinated disclosure policy. Researchers who report valid
              vulnerabilities will be credited (with permission).
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
