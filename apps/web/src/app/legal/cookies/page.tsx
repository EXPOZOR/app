import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How EXPOZOR uses cookies on the waitlist-stage public site. No advertising or analytics cookies are currently active.",
  alternates: { canonical: "https://expozor.com/legal/cookies" },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Legal", href: "/legal/cookies" },
  { name: "Cookie Policy", href: "/legal/cookies" },
]);

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site measure-prose section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Cookie Policy</h1>
          <p className="text-[var(--text-tertiary)] text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section aria-labelledby="cookies-overview">
              <h2
                id="cookies-overview"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Overview
              </h2>
              <p>
                EXPOZOR is currently a waitlist-stage public site. We do not currently operate user
                account sessions, advertising cookies, third-party analytics cookies, or behavioral
                tracking cookies.
              </p>
            </section>

            <section aria-labelledby="cookies-essential">
              <h2
                id="cookies-essential"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Essential technology
              </h2>
              <p>
                The site may use essential browser storage or framework-level mechanisms that are
                necessary to load pages, submit the waitlist form, prevent abuse, maintain security,
                or remember basic presentation preferences. These are not used for advertising.
              </p>
            </section>

            <section aria-labelledby="cookies-analytics">
              <h2
                id="cookies-analytics"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Analytics
              </h2>
              <p>
                No analytics provider is currently active in the codebase. If analytics are added
                later, this policy will be updated to identify the provider, purpose, and available
                controls.
              </p>
            </section>

            <section aria-labelledby="cookies-control">
              <h2
                id="cookies-control"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Your choices
              </h2>
              <p>
                You can control or delete cookies and local storage through your browser settings.
                Blocking essential browser storage may cause some site functionality, such as form
                submission or page preferences, to work incorrectly.
              </p>
            </section>

            <section aria-labelledby="cookies-contact">
              <h2
                id="cookies-contact"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Contact
              </h2>
              <p>
                Questions about cookies:{" "}
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
