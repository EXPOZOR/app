import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "EXPOZOR refund policy. Billing is not yet active. Refund terms will be published before paid plans go live.",
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
        <div className="container-site max-w-3xl section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
          {/* TODO: update date and populate this page fully before billing goes live */}
          <p className="text-[var(--text-tertiary)] text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section aria-labelledby="refund-status">
              <h2
                id="refund-status"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Current status
              </h2>
              <p>
                EXPOZOR is currently in early access. Paid plans and billing are not yet active.
                This page will be fully populated with refund terms before any paid plan goes live.
              </p>
            </section>

            <section aria-labelledby="refund-principles">
              <h2
                id="refund-principles"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Our approach
              </h2>
              <p>When billing becomes available, we intend to offer:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>A free plan with no payment required.</li>
                <li>The ability to cancel a paid subscription at any time.</li>
                <li>A fair refund process for billing errors.</li>
              </ul>
              <p className="mt-3">
                {/* TODO: confirm exact refund terms, grace periods, and cancellation flow before launch */}
                Specific terms — including billing grace periods, prorated refunds, and cancellation
                effective dates — will be defined and published before billing goes live.
              </p>
            </section>

            <section aria-labelledby="refund-contact">
              <h2
                id="refund-contact"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Contact
              </h2>
              <p>
                Billing or refund questions:{" "}
                <a href="/contact" className="text-[var(--accent)] hover:underline">
                  Contact us
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:support@expozor.com"
                  className="text-[var(--accent)] hover:underline"
                >
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
