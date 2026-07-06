import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { Ban, Eye, Lock, Server, ShieldOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How EXPOZOR protects your data. No bank credentials collected. HTTPS in transit. No data selling. Responsible disclosure.",
  alternates: { canonical: "https://expozor.com/security" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Security", href: "/security" }]);

const pillars = [
  {
    icon: ShieldOff,
    title: "No bank credentials collected",
    description:
      "EXPOZOR does not ask for or store your bank login credentials. You add expenses manually, by uploading a receipt or screenshot, or by importing a CSV file.",
    accent: "#7CF5C2",
  },
  {
    icon: Ban,
    title: "No money movement",
    description:
      "EXPOZOR cannot initiate transfers, move funds, or access your bank accounts in any way. It is an expense tracking and organization tool only.",
    accent: "#F87171",
  },
  {
    icon: Lock,
    title: "HTTPS in transit",
    description:
      // TLS/HSTS/CSP confirmed in next.config.ts — safe to state
      "All data in transit is encrypted via HTTPS with HSTS and a strict Content Security Policy enforced at the server level.",
    accent: "#60a5fa",
  },
  {
    icon: Eye,
    title: "No data selling",
    description:
      "We do not sell, rent, or share your personal or financial data with third parties for advertising or marketing purposes. Period.",
    accent: "#a78bfa",
  },
  {
    icon: Server,
    title: "Infrastructure (in progress)",
    description:
      // TODO: document storage encryption, RLS status, and infra hardening before public launch
      "Additional infrastructure security details — including database row-level security and storage encryption — will be documented and published before public launch.",
    accent: "#FFB36B",
  },
];

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <div className="container-site py-16 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Security
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Built with your privacy in mind.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            EXPOZOR tracks expenses — it does not connect to banks, move money, or collect bank
            credentials. Here is what we do to protect your data.
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
                        background: `${pillar.accent}1A`,
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
        <section
          className="section-py border-t border-[var(--border)]"
          aria-labelledby="disclosure-heading"
        >
          <div className="container-site max-w-2xl text-center">
            <h2 id="disclosure-heading" className="text-3xl font-bold mb-4">
              Responsible disclosure
            </h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              Found a security vulnerability? We take all reports seriously and aim to respond
              within 48 hours. Please email{" "}
              <a
                href="mailto:security@expozor.com"
                className="text-[var(--accent)] hover:underline"
              >
                {/* TODO: confirm security@expozor.com is a live and monitored mailbox before launch */}
                security@expozor.com
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
