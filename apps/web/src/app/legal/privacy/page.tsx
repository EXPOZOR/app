import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EXPOZOR collects, uses, and protects your data. No bank credentials collected. No data sold.",
  alternates: { canonical: "https://expozor.com/legal/privacy" },
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
          {/* TODO: update date when this policy is reviewed and approved before launch */}
          <p className="text-[var(--text-tertiary)] text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section aria-labelledby="privacy-overview">
              <h2
                id="privacy-overview"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Overview
              </h2>
              <p>
                EXPOZOR is an expense tracking tool. We collect only what is necessary to provide
                the service. We do not sell your data. We do not collect your bank login
                credentials. We do not move or hold your money.
              </p>
            </section>

            <section aria-labelledby="privacy-what-we-collect">
              <h2
                id="privacy-what-we-collect"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                What we collect
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Account information:</strong> email address, display name (optional),
                  locale, and currency preference.
                </li>
                <li>
                  <strong>Expense data:</strong> transaction amounts, dates, merchant names,
                  categories, notes, and tags that you enter manually or import.
                </li>
                <li>
                  <strong>Uploaded files:</strong> receipt images, screenshots, or CSV files that
                  you choose to upload. These are used to extract expense details and stored
                  associated with your account.
                </li>
                <li>
                  <strong>Usage data:</strong> anonymized product analytics to improve the service.
                  {/* TODO: confirm analytics provider and update this section before launch */}
                </li>
              </ul>
            </section>

            <section aria-labelledby="privacy-what-we-dont">
              <h2
                id="privacy-what-we-dont"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                What we do not collect
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Bank login credentials of any kind.</li>
                <li>Payment card PINs or full card numbers.</li>
                <li>Information about your bank or financial institution accounts.</li>
                <li>Your government-issued identification documents.</li>
              </ul>
            </section>

            <section aria-labelledby="privacy-how-we-use">
              <h2
                id="privacy-how-we-use"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                How we use your data
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and operate the EXPOZOR expense tracking service.</li>
                <li>To improve AI/OCR categorization accuracy.</li>
                <li>To send transactional emails (e.g., account confirmations, if any).</li>
                <li>To respond to support requests.</li>
              </ul>
            </section>

            <section aria-labelledby="privacy-sharing">
              <h2
                id="privacy-sharing"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Data sharing
              </h2>
              <p>
                We do not sell, rent, or share your personal data with third parties for advertising
                or marketing purposes. We share data only with confirmed subprocessors that help us
                operate the service (see our{" "}
                <a href="/legal/subprocessors" className="text-[var(--accent)] hover:underline">
                  Subprocessors page
                </a>
                ).
              </p>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2
                id="privacy-retention"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Data retention
              </h2>
              {/* TODO: have data retention periods reviewed by legal/accounting before public launch */}
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Account data</strong> is retained while your account is active.
                </li>
                <li>
                  <strong>Expense data, uploaded receipts, screenshots, and CSV imports</strong> are
                  retained while your account is active unless deleted earlier by you or by request.
                </li>
                <li>
                  <strong>Account deletion requests</strong> are processed within 30 days where
                  reasonably possible.
                </li>
                <li>
                  <strong>Backups</strong> may persist for up to 90 days before deletion or
                  overwrite.
                </li>
                <li>
                  <strong>Support communications</strong> may be retained for up to 24 months.
                </li>
                <li>
                  <strong>Security logs</strong> may be retained for up to 12 months.
                </li>
                <li>
                  <strong>Billing records</strong> may be retained as required for tax, accounting,
                  fraud prevention, and legal obligations.
                </li>
                <li>
                  <strong>Waitlist emails</strong> are retained until unsubscribe or deletion
                  request.
                </li>
              </ul>
            </section>

            <section aria-labelledby="privacy-controls">
              <h2
                id="privacy-controls"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Privacy Controls
              </h2>
              {/* TODO: replace with self-serve export/deletion wording once implemented */}
              <p>
                Users can request a copy of their data or request account deletion by contacting{" "}
                <a
                  href="mailto:privacy@expozor.com"
                  className="text-[var(--accent)] hover:underline"
                >
                  {/* TODO: confirm privacy@expozor.com is a live and monitored mailbox before launch */}
                  privacy@expozor.com
                </a>
                . We aim to respond within 30 days.
              </p>
            </section>

            <section aria-labelledby="privacy-security">
              <h2
                id="privacy-security"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Security
              </h2>
              <p>
                We use HTTPS for all data in transit. Additional infrastructure and storage security
                details will be documented before public launch. See our{" "}
                <a href="/security" className="text-[var(--accent)] hover:underline">
                  Security page
                </a>{" "}
                for more information.
              </p>
            </section>

            <section aria-labelledby="privacy-cookies">
              <h2
                id="privacy-cookies"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Cookies
              </h2>
              <p>
                We use essential session cookies to keep you signed in. See our{" "}
                <a href="/legal/cookies" className="text-[var(--accent)] hover:underline">
                  Cookie Policy
                </a>{" "}
                for details.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2
                id="privacy-contact"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Contact
              </h2>
              <p>
                Privacy questions:{" "}
                <a
                  href="mailto:privacy@expozor.com"
                  className="text-[var(--accent)] hover:underline"
                >
                  privacy@expozor.com
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
