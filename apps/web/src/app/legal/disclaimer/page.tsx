import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "EXPOZOR is not a bank, financial institution, or advisor. It is a personal expense tracking tool for informational and organizational purposes only.",
  alternates: { canonical: "https://expozor.com/legal/disclaimer" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/disclaimer" },
  { name: "Disclaimer", href: "/legal/disclaimer" },
]);

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site measure-prose section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Disclaimer</h1>
          <p className="text-text-tertiary text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-text-secondary leading-relaxed">
            <section aria-labelledby="disclaimer-not-a-bank">
              <h2
                id="disclaimer-not-a-bank"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                Not a bank or financial institution
              </h2>
              <p>
                EXPOZOR is not a bank, financial institution, credit union, payment processor, money
                transmitter, investment adviser, broker-dealer, tax adviser, accounting firm, or any
                other licensed financial service provider. EXPOZOR is a software tool for personal
                expense tracking and organization.
              </p>
            </section>

            <section aria-labelledby="disclaimer-no-money">
              <h2 id="disclaimer-no-money" className="text-xl font-semibold text-text-primary mb-3">
                Expense tracking only
              </h2>
              <p>
                EXPOZOR is not a payment service. It does not access accounts, custody funds, or
                initiate payments on behalf of any user or third party.
              </p>
            </section>

            <section aria-labelledby="disclaimer-no-credentials">
              <h2
                id="disclaimer-no-credentials"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                No bank credentials collected
              </h2>
              <p>
                EXPOZOR does not collect, request, store, or transmit your bank login credentials,
                banking passwords, PINs, or any other authentication credentials for any financial
                institution. Manual entry is the first workflow; upload and import workflows are
                planned for early access.
              </p>
            </section>

            <section aria-labelledby="disclaimer-no-advice">
              <h2
                id="disclaimer-no-advice"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                No financial, tax, or professional advice
              </h2>
              <p>
                Nothing in the EXPOZOR application, website, or any related content constitutes
                financial advice, investment advice, tax advice, legal advice, accounting advice,
                credit advice, or any other form of professional advice. All information and
                features provided by EXPOZOR are for personal organization and informational
                purposes only. You should consult a qualified professional before making any
                financial, legal, tax, or investment decisions.
              </p>
            </section>

            <section aria-labelledby="disclaimer-ai-accuracy">
              <h2
                id="disclaimer-ai-accuracy"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                AI and OCR accuracy
              </h2>
              <p>
                AI-assisted categorization and OCR are planned features. If they launch, outputs may
                be inaccurate, incomplete, or incorrect. You will be responsible for reviewing,
                correcting, and verifying extracted, categorized, or suggested data before relying
                on it for any purpose.
              </p>
            </section>

            <section aria-labelledby="disclaimer-purpose">
              <h2 id="disclaimer-purpose" className="text-xl font-semibold text-text-primary mb-3">
                Informational and organizational purposes only
              </h2>
              <p>
                EXPOZOR is provided solely for personal expense tracking, expense organization, and
                spending analysis. Any spending summaries, category breakdowns, or trend insights
                produced by EXPOZOR reflect the data you have entered and are for your personal
                reference only. They are not audited financial records and should not be used as
                such.
              </p>
            </section>

            <section aria-labelledby="disclaimer-no-warranty">
              <h2
                id="disclaimer-no-warranty"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                No warranty
              </h2>
              <p>
                EXPOZOR is provided &quot;as is&quot; and &quot;as available&quot; without any
                warranty of any kind, express or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose, or non-infringement. EXPOZOR does
                not warrant that the service will be uninterrupted, error-free, or that any data
                will be retained without loss.
              </p>
            </section>

            <section aria-labelledby="disclaimer-limitation">
              <h2
                id="disclaimer-limitation"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, EXPOZOR and its officers,
                directors, employees, and agents shall not be liable for any direct, indirect,
                incidental, special, consequential, or punitive damages arising out of your use of,
                or inability to use, the Service, including but not limited to reliance on any AI or
                OCR output, any spending summary, or any other information produced by the Service.
              </p>
            </section>

            <section aria-labelledby="disclaimer-changes">
              <h2 id="disclaimer-changes" className="text-xl font-semibold text-text-primary mb-3">
                Changes to this disclaimer
              </h2>
              <p>
                We may update this Disclaimer from time to time. Continued use of the Service after
                any changes constitutes your acceptance of the updated Disclaimer. We recommend
                reviewing this page periodically.
              </p>
            </section>

            <section aria-labelledby="disclaimer-contact">
              <h2 id="disclaimer-contact" className="text-xl font-semibold text-text-primary mb-3">
                Contact
              </h2>
              <p>
                Questions about this Disclaimer:{" "}
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
