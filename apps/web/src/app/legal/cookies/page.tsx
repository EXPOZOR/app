import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How EXPOZOR uses cookies. We use only essential session cookies.",
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
        <div className="container-site max-w-3xl section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Cookie Policy</h1>
          {/* TODO: update date when reviewed before launch */}
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
                EXPOZOR uses a minimal number of cookies. We do not use advertising cookies,
                tracking cookies, or third-party analytics cookies inside the authenticated
                application.
              </p>
            </section>

            <section aria-labelledby="cookies-essential">
              <h2
                id="cookies-essential"
                className="text-xl font-semibold text-[var(--text-primary)] mb-3"
              >
                Essential cookies
              </h2>
              {/* TODO: audit actual cookie names from auth/session libraries before public launch */}
              <p>
                EXPOZOR uses essential cookies for security, authentication, and basic site
                functionality. We do not use advertising cookies. Cookie names will be finalized
                before public launch.
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
                {/* TODO: confirm analytics provider and update before launch */}
                If analytics are used, they will be first-party or privacy-preserving. This section
                will be updated with specific details before the Service launches publicly.
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
                You can control or delete cookies through your browser settings. Disabling essential
                cookies will prevent you from signing in to EXPOZOR. As we do not use advertising or
                tracking cookies, there is no cookie consent banner.
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
