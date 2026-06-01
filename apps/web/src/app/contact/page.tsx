import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, MessageSquare } from "lucide-react";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the EXPOZOR team. General inquiries, support, privacy requests, and security disclosure.",
  alternates: { canonical: "https://expozor.app/contact" },
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
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">Contact</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get in touch</h1>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            We're a small team. We read every message. We try to respond within one business day.
          </p>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "General", email: "hello@expozor.app", desc: "Questions, feedback, press" },
              { icon: MessageSquare, label: "Support", email: "support@expozor.app", desc: "App issues, billing, account" },
              { icon: Mail, label: "Privacy", email: "privacy@expozor.app", desc: "Data requests, GDPR" },
              { icon: Mail, label: "Security", email: "security@expozor.app", desc: "Vulnerability disclosure" },
            ].map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.email}
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all group"
                >
                  <div className="w-10 h-10 rounded-[var(--radius)] bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors" aria-hidden="true">
                    <Icon size={18} className="text-[var(--accent)] group-hover:text-[var(--text-inverse)]" />
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
