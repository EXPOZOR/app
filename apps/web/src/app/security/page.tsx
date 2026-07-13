import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { Ban, Eye, Lock, Server, ShieldOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How EXPOZOR protects waitlist data. No bank credentials collected. HTTPS in transit. No data selling.",
  alternates: { canonical: "https://expozor.com/security" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Security", href: "/security" }]);

const pillars = [
  {
    icon: ShieldOff,
    title: "No bank credentials collected",
    description:
      "EXPOZOR does not ask for or store your bank credentials. The current public site collects waitlist signup data only.",
    accent: BRAND_COLORS.lilac,
  },
  {
    icon: Ban,
    title: "Expense tracking only",
    description:
      "EXPOZOR is not a bank or payment service. It does not access accounts, custody funds, or initiate payments.",
    accent: "#F87171",
  },
  {
    icon: Lock,
    title: "HTTPS in transit",
    description:
      "The site is configured with HTTPS, HSTS, Content Security Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.",
    accent: "#60a5fa",
  },
  {
    icon: Eye,
    title: "No data selling",
    description:
      "We do not sell, rent, or share waitlist data with third parties for advertising or marketing purposes.",
    accent: "#a78bfa",
  },
  {
    icon: Server,
    title: "Infrastructure status",
    description:
      "Current subprocessors are listed publicly. Additional production security details will be published as product features move beyond the waitlist stage.",
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
        <div className="container-site measure-section page-hero-py">
          <PageHero
            eyebrow="Security"
            title="Built with your privacy in mind."
            description="EXPOZOR is waitlist-only today. It collects signup data, does not connect to banks, and does not collect bank credentials."
            align="center"
          />
        </div>

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
                    className="glass rounded-lg p-6 border border-border flex flex-col gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center"
                      style={{
                        background: `${pillar.accent}1A`,
                        border: `1px solid ${pillar.accent}33`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: pillar.accent }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-lg mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-py border-t border-border" aria-labelledby="disclosure-heading">
          <div className="container-site measure-prose text-center">
            <h2 id="disclosure-heading" className="text-3xl font-bold mb-4">
              Responsible disclosure
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Found a security vulnerability? Please email{" "}
              <a href="mailto:security@expozor.com" className="text-accent hover:underline">
                security@expozor.com
              </a>{" "}
              with a description of the issue and steps to reproduce.
            </p>
            <p className="text-sm text-text-tertiary">
              We review security reports in good faith and may credit researchers with permission.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
