import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "EXPOZOR terms of service. Account usage, billing, and legal terms. No bank connection required.",
  alternates: { canonical: "https://expozor.com/legal/terms" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/terms" },
  { name: "Terms of Service", href: "/legal/terms" },
]);

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site max-w-3xl section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          {/* TODO: update date when this document is reviewed and approved before launch */}
          <p className="text-[var(--text-tertiary)] text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section aria-labelledby="terms-acceptance">
              <h2
                id="terms-acceptance"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                1. Acceptance of terms
              </h2>
              <p>
                By accessing or using EXPOZOR ("Service"), you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree, do not use the Service.
              </p>
            </section>

            <section aria-labelledby="terms-service">
              <h2
                id="terms-service"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                2. Description of service
              </h2>
              <p>
                EXPOZOR is a software tool for personal expense tracking. The Service allows you to
                manually enter, upload, and import expense data; categorize expenses with
                AI-assisted suggestions; and view spending summaries. EXPOZOR does not connect to
                bank accounts, collect bank login credentials, move money, hold funds, initiate
                transfers, provide investment advice, provide tax advice, or make credit decisions.
              </p>
            </section>

            <section aria-labelledby="terms-not-a-bank">
              <h2
                id="terms-not-a-bank"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                3. Not a financial service
              </h2>
              <p>
                EXPOZOR is not a bank, money transmitter, payment processor, investment adviser, tax
                adviser, or financial institution of any kind. The Service is provided for
                informational and organizational purposes only. Nothing in the Service constitutes
                financial, investment, tax, legal, accounting, or professional advice.
              </p>
            </section>

            <section aria-labelledby="terms-accounts">
              <h2
                id="terms-accounts"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                4. Accounts and security
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials.
                You must notify us immediately if you suspect unauthorized access to your account.
                You are responsible for all activity that occurs under your account.
              </p>
            </section>

            <section aria-labelledby="terms-acceptable-use">
              <h2
                id="terms-acceptable-use"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                5. Acceptable use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Use the Service for any unlawful purpose.</li>
                <li>Upload content you do not have the right to use.</li>
                <li>Attempt to gain unauthorized access to any part of the Service.</li>
                <li>Reverse-engineer or copy any part of the Service.</li>
                <li>Use automated tools to scrape or access the Service without permission.</li>
              </ul>
            </section>

            <section aria-labelledby="terms-user-data">
              <h2
                id="terms-user-data"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                6. Your data
              </h2>
              <p>
                You retain ownership of the expense data you enter into EXPOZOR. By using the
                Service, you grant EXPOZOR a limited license to store and process your data solely
                to provide the Service to you. We do not sell your data. See our{" "}
                <a href="/legal/privacy" className="text-[var(--accent)] hover:underline">
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </section>

            <section aria-labelledby="terms-ai">
              <h2 id="terms-ai" className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                7. AI and OCR accuracy
              </h2>
              <p>
                AI-assisted categorization and OCR features are provided as a convenience and may be
                inaccurate. You are responsible for reviewing and verifying all data extracted or
                suggested by the Service before relying on it.
              </p>
            </section>

            <section aria-labelledby="terms-payment">
              <h2
                id="terms-payment"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                8. Payments and billing
              </h2>
              <p>
                {/* TODO: update legal entity name after LLC formation and EIN issuance */}
                {/* TODO: add Stripe after EIN and Stripe account approval if/when enabled */}
                Billing is not yet active. When paid plans launch, payment processing will be
                handled through PayPal where available. EXPOZOR may add additional payment providers
                before or after public launch. Full billing terms will be published before paid
                features go live.
              </p>
            </section>

            <section aria-labelledby="terms-refunds">
              <h2
                id="terms-refunds"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                9. Refunds and cancellation
              </h2>
              <p>
                {/* TODO: confirm refund policy before billing goes live */}
                Refund and cancellation terms will be specified before paid plans are made
                available. See our{" "}
                <a href="/legal/refund" className="text-[var(--accent)] hover:underline">
                  Refund Policy
                </a>{" "}
                for more information.
              </p>
            </section>

            <section aria-labelledby="terms-intellectual-property">
              <h2
                id="terms-intellectual-property"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                10. Intellectual property
              </h2>
              <p>
                The EXPOZOR software, branding, and content are the property of EXPOZOR and are
                protected by applicable intellectual property laws. You may not copy, modify,
                distribute, or create derivative works without written permission.
              </p>
            </section>

            <section aria-labelledby="terms-termination">
              <h2
                id="terms-termination"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                11. Termination
              </h2>
              <p>
                You may terminate your account at any time by contacting us. We reserve the right to
                suspend or terminate your account if you violate these Terms. Upon termination, you
                may request a copy of your data before deletion.
              </p>
            </section>

            <section aria-labelledby="terms-disclaimers">
              <h2
                id="terms-disclaimers"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                12. Disclaimers
              </h2>
              <p>
                The Service is provided "as is" and "as available" without warranties of any kind,
                express or implied. EXPOZOR does not warrant that the Service will be error-free,
                uninterrupted, or that any data will be retained without loss.
              </p>
            </section>

            <section aria-labelledby="terms-limitation">
              <h2
                id="terms-limitation"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                13. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, EXPOZOR shall not be liable for any
                indirect, incidental, special, or consequential damages arising from your use of the
                Service. Our total liability shall not exceed the amount you paid us in the 12
                months preceding the claim.
              </p>
            </section>

            <section aria-labelledby="terms-indemnification">
              <h2
                id="terms-indemnification"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                14. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless EXPOZOR and its officers, directors,
                employees, and agents from any claims, losses, damages, or expenses arising from
                your use of the Service or violation of these Terms.
              </p>
            </section>

            <section aria-labelledby="terms-changes">
              <h2
                id="terms-changes"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                15. Changes to terms
              </h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes
                by email or by a notice within the Service. Continued use after notice constitutes
                acceptance.
              </p>
            </section>

            <section aria-labelledby="terms-governing-law">
              <h2
                id="terms-governing-law"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                16. Governing law
              </h2>
              <p>
                {/* TODO: update governing law after LLC formation and legal review */}
                These Terms shall be governed by the laws of the applicable jurisdiction, to be
                confirmed before the Service launches publicly.
              </p>
            </section>

            <section aria-labelledby="terms-disputes">
              <h2
                id="terms-disputes"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                17. Dispute resolution
              </h2>
              <p>
                {/* TODO: confirm dispute resolution process (arbitration, courts) after legal review */}
                Dispute resolution terms will be finalized before the Service launches publicly.
                Please contact us first to resolve any issues informally.
              </p>
            </section>

            <section aria-labelledby="terms-contact">
              <h2
                id="terms-contact"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                18. Contact
              </h2>
              <p>
                Legal questions:{" "}
                <a href="mailto:legal@expozor.com" className="text-[var(--accent)] hover:underline">
                  {/* TODO: confirm legal@expozor.com is a live and monitored mailbox before launch */}
                  legal@expozor.com
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
