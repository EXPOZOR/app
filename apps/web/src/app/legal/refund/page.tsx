import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "EXPOZOR refund policy. Billing is not active and no payments are currently collected.",
  alternates: { canonical: "https://expozor.com/legal/refund" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/refund" },
  { name: "Refund Policy", href: "/legal/refund" },
]);

export default function RefundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site measure-prose section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
          <p className="text-text-tertiary text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-text-secondary leading-relaxed">
            <section aria-labelledby="refund-status">
              <h2 id="refund-status" className="text-xl font-semibold text-text-primary mb-3">
                Current status
              </h2>
              <p>
                EXPOZOR is waitlist-only today. Billing is not active, paid plans are not available,
                and EXPOZOR does not currently collect payments. Because there are no active
                payments, there are no refunds to process at this stage.
              </p>
            </section>

            <section aria-labelledby="refund-future">
              <h2 id="refund-future" className="text-xl font-semibold text-text-primary mb-3">
                Future paid plans
              </h2>
              <p>
                If EXPOZOR launches paid plans, subscription, cancellation, and refund terms will be
                published before paid billing becomes available. Those terms will identify the
                payment processor, cancellation flow, refund eligibility, and any timing limits that
                apply.
              </p>
            </section>

            <section aria-labelledby="refund-contact">
              <h2 id="refund-contact" className="text-xl font-semibold text-text-primary mb-3">
                Contact
              </h2>
              <p>
                Billing or refund questions:{" "}
                <a href="/contact" className="text-accent hover:underline">
                  Contact us
                </a>{" "}
                or email{" "}
                <a href="mailto:support@expozor.com" className="text-accent hover:underline">
                  support@expozor.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
