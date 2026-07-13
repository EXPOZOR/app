import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subprocessors",
  description: "Third-party services EXPOZOR uses for the current waitlist-stage public site.",
  alternates: { canonical: "https://expozor.com/legal/subprocessors" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/subprocessors" },
  { name: "Subprocessors", href: "/legal/subprocessors" },
]);

const subprocessors = [
  {
    category: "Database",
    name: "Neon, Inc.",
    purpose: "Serverless PostgreSQL database used to store waitlist records.",
    location: "United States",
    link: "https://neon.tech/privacy",
    linkLabel: "Neon Privacy",
    note: null,
  },
  {
    category: "Transactional Email",
    name: "Resend, Inc.",
    purpose: "Email delivery for optional waitlist confirmation and product update messages.",
    location: "United States",
    link: "https://resend.com/privacy",
    linkLabel: "Resend Privacy",
    note: null,
  },
  {
    category: "Hosting / CDN",
    name: "Vercel Inc.",
    purpose: "Hosting, CDN, and deployment infrastructure for the public site.",
    location: "United States",
    link: "https://vercel.com/legal/privacy-policy",
    linkLabel: "Vercel Privacy",
    note: null,
  },
  {
    category: "AI / OCR",
    name: "None currently in production",
    purpose:
      "AI-assisted categorization and receipt scanning are planned features. No AI/OCR provider is active in production today.",
    location: "Not applicable",
    link: null,
    linkLabel: null,
    note: "To be added when a provider is contracted.",
  },
  {
    category: "Analytics",
    name: "None currently active",
    purpose: "No analytics provider is currently active in the codebase.",
    location: "Not applicable",
    link: null,
    linkLabel: null,
    note: "This list will be updated before any analytics provider is added.",
  },
  {
    category: "Payment Processing",
    name: "None currently active",
    purpose: "Billing is not active and EXPOZOR does not currently collect payments.",
    location: "Not applicable",
    link: null,
    linkLabel: null,
    note: "A payment processor will be listed before paid billing launches.",
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
        <div className="container-site measure-wide section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Subprocessors</h1>
          <p className="text-text-tertiary text-sm mb-4">Last updated: July 2026</p>
          <p className="text-text-secondary mb-10 leading-relaxed max-w-2xl">
            EXPOZOR is currently waitlist-only. This list reflects services confirmed for the public
            site plus explicit notes for provider categories that are not active.
          </p>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border bg-bg-elev-1">
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-text-primary whitespace-nowrap"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-text-primary whitespace-nowrap"
                  >
                    Provider
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-text-primary whitespace-nowrap"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-text-primary whitespace-nowrap"
                  >
                    Privacy / DPA
                  </th>
                </tr>
              </thead>
              <tbody>
                {subprocessors.map((sp) => (
                  <tr
                    key={`${sp.category}-${sp.name}`}
                    className="border-b border-border last:border-0 bg-bg-surface odd:bg-bg-elev-1"
                  >
                    <td className="px-4 py-3 text-text-muted whitespace-nowrap align-top">
                      {sp.category}
                    </td>
                    <td className="px-4 py-3 font-medium text-text-primary whitespace-nowrap align-top">
                      {sp.name}
                    </td>
                    <td className="px-4 py-3 text-text-secondary align-top">
                      {sp.purpose}
                      {sp.note && (
                        <p className="mt-1 text-xs text-text-tertiary italic">{sp.note}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-muted whitespace-nowrap align-top">
                      {sp.location}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {sp.link ? (
                        <a
                          href={sp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline whitespace-nowrap"
                        >
                          {sp.linkLabel}
                        </a>
                      ) : (
                        <span className="text-text-tertiary">Not applicable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-text-secondary space-y-4 text-sm leading-relaxed">
            <p>
              To ask about this list, contact{" "}
              <a href="mailto:privacy@expozor.com" className="text-accent hover:underline">
                privacy@expozor.com
              </a>
              .
            </p>
            <p>
              Note: Drizzle ORM is not listed above. It is an open-source ORM library that runs
              inside EXPOZOR&apos;s server process and does not send data to an external service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
