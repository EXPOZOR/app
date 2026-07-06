import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subprocessors",
  description:
    "List of third-party services that EXPOZOR uses to operate the service and may process personal data on our behalf.",
  alternates: { canonical: "https://expozor.com/legal/subprocessors" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/subprocessors" },
  { name: "Subprocessors", href: "/legal/subprocessors" },
]);

/* ──────────────────────────────────────────────────────────────────
   SUBPROCESSORS
   Populated from direct code analysis of apps/web/ and confirmed
   by the founder before launch.
   Only services that handle personal data from real users are listed.
   Drizzle ORM is not listed — it is a local library, not a service.
   TODO: update legal entity name after LLC formation and EIN issuance.
────────────────────────────────────────────────────────────────── */
const subprocessors = [
  {
    category: "Database",
    name: "Neon, Inc.",
    purpose: "Serverless PostgreSQL database. Stores user account and expense data.",
    location: "United States",
    link: "https://neon.tech/privacy",
    linkLabel: "Neon Privacy",
  },
  {
    category: "Transactional Email",
    name: "Resend, Inc.",
    purpose: "Sends transactional emails (e.g., account confirmations, waitlist notifications).",
    location: "United States",
    link: "https://resend.com/privacy",
    linkLabel: "Resend Privacy",
  },
  {
    category: "Hosting / CDN",
    name: "Vercel Inc.",
    purpose: "Web hosting, content delivery, and deployment infrastructure.",
    location: "United States",
    link: "https://vercel.com/legal/privacy-policy",
    linkLabel: "Vercel Privacy",
  },
  {
    category: "Payment Processing",
    name: "PayPal, Inc.",
    purpose:
      "Payment processing for paid plans when billing is enabled. Billing is not yet active.",
    location: "United States",
    link: "https://www.paypal.com/us/legalhub/privacy-full",
    linkLabel: "PayPal Privacy",
    // TODO: add Stripe after EIN and Stripe account approval if/when enabled.
  },
  {
    category: "AI / OCR",
    name: "TBD",
    purpose:
      "AI-assisted categorization and OCR for uploaded receipts and screenshots. Receipt content (merchant name, amount, date) may be processed.",
    location: "TBD",
    link: null,
    linkLabel: null,
    // TODO: confirm AI/OCR provider before launch. Add provider details and DPA link here.
    note: "To be confirmed before launch. Provider details and DPA will be added here.",
  },
];

export default function SubprocessorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site max-w-4xl section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Subprocessors</h1>
          {/* TODO: update date when this list is reviewed before launch */}
          <p className="text-[var(--text-tertiary)] text-sm mb-4">Last updated: July 2026</p>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed max-w-2xl">
            EXPOZOR uses the following third-party services (&quot;subprocessors&quot;) that may
            process personal data on our behalf. We update this list whenever we add or remove a
            subprocessor. All subprocessors are contractually required to maintain data security
            standards.
          </p>

          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-elev-1)]">
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap"
                  >
                    Provider
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap"
                  >
                    Privacy / DPA
                  </th>
                </tr>
              </thead>
              <tbody>
                {subprocessors.map((sp) => (
                  <tr
                    key={sp.name}
                    className="border-b border-[var(--border)] last:border-0 bg-[var(--bg-surface)] odd:bg-[var(--bg-elev-1)]"
                  >
                    <td className="px-4 py-3 text-[var(--text-muted)] whitespace-nowrap align-top">
                      {sp.category}
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--text-primary)] whitespace-nowrap align-top">
                      {sp.name}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] align-top">
                      {sp.purpose}
                      {sp.note && (
                        <p className="mt-1 text-xs text-[var(--text-tertiary)] italic">{sp.note}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)] whitespace-nowrap align-top">
                      {sp.location}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {sp.link ? (
                        <a
                          href={sp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] hover:underline whitespace-nowrap"
                        >
                          {sp.linkLabel}
                        </a>
                      ) : (
                        <span className="text-[var(--text-tertiary)]">TBD</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-[var(--text-secondary)] space-y-4 text-sm leading-relaxed">
            <p>
              To be notified of changes to this list, contact us at{" "}
              {/* TODO: confirm privacy@expozor.com is live and monitored before public launch */}
              <a href="mailto:privacy@expozor.com" className="text-[var(--accent)] hover:underline">
                privacy@expozor.com
              </a>
              .
            </p>
            <p>
              Note: Drizzle ORM is not listed above. It is an open-source ORM library that runs
              locally within EXPOZOR&apos;s server process and does not send data to any external
              service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
