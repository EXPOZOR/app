import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the EXPOZOR team. General inquiries, support, privacy requests, and security disclosure.",
  alternates: { canonical: "https://expozor.com/contact" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Contact", href: "/contact" }]);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site section-py max-w-xl">
          <PageHero
            eyebrow="Contact"
            title="Get in touch"
            description="We're a small team. We read every message. We try to respond within one business day."
            descriptionClassName="type-body"
            scale="compact"
            className="mb-10"
          />

          <div className="space-y-4">
            {[
              // TODO: confirm support@expozor.com is live and monitored before launch
              {
                icon: MessageSquare,
                label: "Support",
                email: "support@expozor.com",
                desc: "Questions, feedback, app issues, billing, press",
              },
              {
                icon: Mail,
                label: "Privacy",
                email: "privacy@expozor.com",
                desc: "Data requests, deletion",
              },
              {
                icon: Mail,
                label: "Security",
                email: "security@expozor.com",
                desc: "Vulnerability disclosure",
              },
            ].map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.email}
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-[var(--radius)] bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors"
                    aria-hidden="true"
                  >
                    <Icon
                      size={18}
                      className="text-[var(--accent)] group-hover:text-[var(--text-inverse)]"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{contact.label}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{contact.desc}</p>
                    <p className="text-sm text-[var(--accent)] mt-0.5">{contact.email}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
