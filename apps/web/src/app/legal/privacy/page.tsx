import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EXPOZOR privacy policy. How we collect, use, and protect your data. GDPR-compliant data handling.",
  alternates: { canonical: "https://expozor.app/legal/privacy" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/privacy" },
  { name: "Privacy Policy", href: "/legal/privacy" },
]);

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site max-w-3xl section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-[var(--text-tertiary)] text-sm mb-10">Last updated: June 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section aria-labelledby="privacy-overview">
              <h2 id="privacy-overview" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Overview</h2>
              <p>
                EXPOZOR is designed with privacy as a first-class requirement. We collect only what
                is necessary to provide the service, we never sell your data, and we give you full
                control to export or delete your information at any time.
              </p>
            </section>

            <section aria-labelledby="privacy-data-collected">
              <h2 id="privacy-data-collected" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Data we collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information: email address, name (optional), locale, currency preference.</li>
                <li>Financial data: transaction amounts, dates, merchants, categories — provided by you or via bank sync with your explicit consent.</li>
                <li>Receipt images: encrypted at rest, used only for OCR, deleted with the parent transaction.</li>
                <li>Usage data: anonymized product analytics (PostHog, first-party reverse-proxied). No third-party trackers in the authenticated app.</li>
              </ul>
            </section>

            <section aria-labelledby="privacy-rights">
              <h2 id="privacy-rights" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Your rights (GDPR)</h2>
              <p>
                You may request a full export or deletion of your personal data at any time from
                Settings → Privacy. We fulfill data export and deletion requests within 24 hours.
                Hard-deletes are permanent; anonymized aggregates may be retained.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2 id="privacy-contact" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Contact</h2>
              <p>
                Privacy questions:{" "}
                <a href="mailto:privacy@expozor.app" className="text-[var(--accent)] hover:underline">
                  privacy@expozor.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
