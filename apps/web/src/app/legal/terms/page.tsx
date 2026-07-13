import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "EXPOZOR terms of service for the waitlist-stage expense tracking product. No bank connection required.",
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
        <div className="container-site measure-prose section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-text-tertiary text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-text-secondary leading-relaxed">
            <section aria-labelledby="terms-acceptance">
              <h2 id="terms-acceptance" className="text-xl font-semibold text-text-primary mb-3">
                1. Acceptance of terms
              </h2>
              <p>
                By accessing or using EXPOZOR, including joining the waitlist, you agree to these
                Terms. If you do not agree, do not use the site or submit your information.
              </p>
            </section>

            <section aria-labelledby="terms-service">
              <h2 id="terms-service" className="text-xl font-semibold text-text-primary mb-3">
                2. Current service
              </h2>
              <p>
                EXPOZOR is currently a waitlist-stage software product for personal expense
                tracking. The current public site lets visitors join the waitlist. Product features
                such as receipt upload, CSV import, OCR, AI-assisted categorization, shared expense
                notes, mobile apps, exports, paid plans, and account access may be described as
                planned or early-access features and may change before launch.
              </p>
            </section>

            <section aria-labelledby="terms-not-financial-service">
              <h2
                id="terms-not-financial-service"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                3. Not a financial service
              </h2>
              <p>
                EXPOZOR is not a bank, money transmitter, payment processor, investment adviser, tax
                adviser, lender, credit bureau, or financial institution. EXPOZOR does not connect
                to bank accounts, collect bank credentials, custody funds, initiate payments,
                provide investment advice, provide tax advice, or make credit decisions.
              </p>
            </section>

            <section aria-labelledby="terms-waitlist">
              <h2 id="terms-waitlist" className="text-xl font-semibold text-text-primary mb-3">
                4. Waitlist communications
              </h2>
              <p>
                When you join the waitlist, you authorize EXPOZOR to use your submitted email
                address to send confirmation messages, early-access updates, launch notices, and
                related product communications. You may ask us to remove your waitlist record at any
                time.
              </p>
            </section>

            <section aria-labelledby="terms-acceptable-use">
              <h2
                id="terms-acceptable-use"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                5. Acceptable use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Use the site or service for any unlawful purpose.</li>
                <li>Submit information that you do not have the right to provide.</li>
                <li>Attempt to gain unauthorized access to any part of the site or service.</li>
                <li>Reverse-engineer, scrape, or copy any part of the site without permission.</li>
                <li>Interfere with the security, availability, or integrity of the site.</li>
              </ul>
            </section>

            <section aria-labelledby="terms-data">
              <h2 id="terms-data" className="text-xl font-semibold text-text-primary mb-3">
                6. Your data
              </h2>
              <p>
                You are responsible for the accuracy of information you submit. EXPOZOR may process
                waitlist information to operate the site, avoid duplicate records, send requested
                communications, and respond to support requests. We do not sell your personal data.
                See our{" "}
                <a href="/legal/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </section>

            <section aria-labelledby="terms-ai">
              <h2 id="terms-ai" className="text-xl font-semibold text-text-primary mb-3">
                7. Planned AI and OCR features
              </h2>
              <p>
                AI-assisted categorization and OCR are planned features, not confirmed production
                capabilities today. If these features launch, outputs may be inaccurate and must be
                reviewed by the user before being relied on.
              </p>
            </section>

            <section aria-labelledby="terms-billing">
              <h2 id="terms-billing" className="text-xl font-semibold text-text-primary mb-3">
                8. Billing
              </h2>
              <p>
                Billing is not active. EXPOZOR does not currently collect payments, offer paid
                signup, or operate paid subscriptions. Pricing shown on the site is for planning and
                may change. Billing terms and any payment processor details will be published before
                paid features become available.
              </p>
            </section>

            <section aria-labelledby="terms-refunds">
              <h2 id="terms-refunds" className="text-xl font-semibold text-text-primary mb-3">
                9. Refunds and cancellation
              </h2>
              <p>
                Because billing is not active, there are no paid subscriptions to cancel and no
                payments to refund. See our{" "}
                <a href="/legal/refund" className="text-accent hover:underline">
                  Refund Policy
                </a>{" "}
                for the current billing status.
              </p>
            </section>

            <section aria-labelledby="terms-ip">
              <h2 id="terms-ip" className="text-xl font-semibold text-text-primary mb-3">
                10. Intellectual property
              </h2>
              <p>
                The EXPOZOR name, branding, website, software, and content are owned by EXPOZOR or
                its licensors and are protected by applicable intellectual property laws. You may
                not copy, modify, distribute, or create derivative works without written permission.
              </p>
            </section>

            <section aria-labelledby="terms-disclaimers">
              <h2 id="terms-disclaimers" className="text-xl font-semibold text-text-primary mb-3">
                11. Disclaimers
              </h2>
              <p>
                The site and any early-access service are provided "as is" and "as available"
                without warranties of any kind, express or implied. We do not guarantee that planned
                features will launch, that early-access availability will be uninterrupted, or that
                any product roadmap will remain unchanged.
              </p>
            </section>

            <section aria-labelledby="terms-liability">
              <h2 id="terms-liability" className="text-xl font-semibold text-text-primary mb-3">
                12. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, EXPOZOR will not be liable for indirect,
                incidental, special, consequential, exemplary, or punitive damages arising from your
                use of the site or service. Because billing is not active, our aggregate liability
                for claims related to the current waitlist site is limited to 100 USD.
              </p>
            </section>

            <section aria-labelledby="terms-indemnity">
              <h2 id="terms-indemnity" className="text-xl font-semibold text-text-primary mb-3">
                13. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless EXPOZOR and its officers, employees,
                contractors, and agents from claims arising from your use of the site, information
                you submit, or violation of these Terms.
              </p>
            </section>

            <section aria-labelledby="terms-changes">
              <h2 id="terms-changes" className="text-xl font-semibold text-text-primary mb-3">
                14. Changes to terms
              </h2>
              <p>
                We may update these Terms from time to time. If changes are material, we may notify
                waitlist members by email or post a notice on the site. Continued use after changes
                take effect means you accept the updated Terms.
              </p>
            </section>

            <section aria-labelledby="terms-governing-law">
              <h2 id="terms-governing-law" className="text-xl font-semibold text-text-primary mb-3">
                15. Governing law
              </h2>
              <p>
                These Terms are governed by the laws of the State of Wyoming, without regard to
                conflict-of-law rules.
              </p>
            </section>

            <section aria-labelledby="terms-disputes">
              <h2 id="terms-disputes" className="text-xl font-semibold text-text-primary mb-3">
                16. Dispute resolution
              </h2>
              <p>
                Please contact us first so we can try to resolve any issue informally. If a formal
                dispute is necessary, venue and process will follow the governing-law section above.
              </p>
            </section>

            <section aria-labelledby="terms-contact">
              <h2 id="terms-contact" className="text-xl font-semibold text-text-primary mb-3">
                17. Contact
              </h2>
              <p>
                Legal questions:{" "}
                <a href="mailto:legal@expozor.com" className="text-accent hover:underline">
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
