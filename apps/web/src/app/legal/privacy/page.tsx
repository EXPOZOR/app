import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EXPOZOR collects and uses waitlist data. No bank credentials collected. No data sold.",
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
        <div className="container-site measure-prose section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-text-tertiary text-sm mb-10">Last updated: July 2026</p>

          <div className="space-y-8 text-text-secondary leading-relaxed">
            <section aria-labelledby="privacy-overview">
              <h2 id="privacy-overview" className="text-xl font-semibold text-text-primary mb-3">
                Overview
              </h2>
              <p>
                EXPOZOR is currently a waitlist-stage expense tracking product. The public site
                collects waitlist signup information so we can manage early access and communicate
                with people who ask to hear from us. We do not sell personal data, collect bank
                credentials, process payments, or store uploaded receipts or screenshots today.
              </p>
            </section>

            <section aria-labelledby="privacy-current-collection">
              <h2
                id="privacy-current-collection"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                What we collect today
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Email address:</strong> the address you submit when joining the waitlist.
                </li>
                <li>
                  <strong>Signup source:</strong> a short label, such as landing page, that helps us
                  understand where the signup came from.
                </li>
                <li>
                  <strong>Referrer:</strong> the referring page URL when your browser provides it.
                </li>
                <li>
                  <strong>Locale:</strong> the default locale stored with the waitlist record.
                </li>
                <li>
                  <strong>Created time:</strong> the timestamp for when the waitlist record was
                  created.
                </li>
              </ul>
            </section>

            <section aria-labelledby="privacy-not-collected">
              <h2
                id="privacy-not-collected"
                className="text-xl font-semibold text-text-primary mb-3"
              >
                What we do not collect today
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Bank login credentials, account numbers, or account balances.</li>
                <li>Payment card numbers, card security codes, or billing details.</li>
                <li>Receipt images, screenshots, CSV files, or expense records.</li>
                <li>Government identification documents.</li>
                <li>Advertising or third-party analytics identifiers.</li>
              </ul>
            </section>

            <section aria-labelledby="privacy-use">
              <h2 id="privacy-use" className="text-xl font-semibold text-text-primary mb-3">
                How we use waitlist data
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To confirm that you joined the waitlist.</li>
                <li>To send early-access updates or product launch communications.</li>
                <li>To avoid duplicate waitlist records for the same email address.</li>
                <li>To understand signup sources at a basic operational level.</li>
                <li>To respond if you contact us about your signup.</li>
              </ul>
            </section>

            <section aria-labelledby="privacy-services">
              <h2 id="privacy-services" className="text-xl font-semibold text-text-primary mb-3">
                Services that help us operate
              </h2>
              <p>
                Waitlist records are stored in our PostgreSQL database provider. If email sending is
                enabled, we use an email service provider to send confirmation or update emails. See
                our{" "}
                <a href="/legal/subprocessors" className="text-accent hover:underline">
                  Subprocessors page
                </a>{" "}
                for the current list.
              </p>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2 id="privacy-retention" className="text-xl font-semibold text-text-primary mb-3">
                Data retention
              </h2>
              <p>
                We keep waitlist records until you unsubscribe, ask us to delete your record, or we
                no longer need the record for early-access communications. We may retain limited
                records when needed to comply with legal obligations, resolve disputes, or maintain
                security and abuse-prevention logs.
              </p>
            </section>

            <section aria-labelledby="privacy-controls">
              <h2 id="privacy-controls" className="text-xl font-semibold text-text-primary mb-3">
                Your choices
              </h2>
              <p>
                You can ask us to remove your waitlist record or answer privacy questions by
                contacting{" "}
                <a href="mailto:privacy@expozor.com" className="text-accent hover:underline">
                  privacy@expozor.com
                </a>
                . We aim to respond within 30 days.
              </p>
            </section>

            <section aria-labelledby="privacy-security">
              <h2 id="privacy-security" className="text-xl font-semibold text-text-primary mb-3">
                Security
              </h2>
              <p>
                The site is configured to use HTTPS, HSTS, a Content Security Policy,
                X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and a restrictive
                Permissions-Policy. We do not claim any external security certification at this
                stage.
              </p>
            </section>

            <section aria-labelledby="privacy-cookies">
              <h2 id="privacy-cookies" className="text-xl font-semibold text-text-primary mb-3">
                Cookies
              </h2>
              <p>
                EXPOZOR does not currently use account session cookies, advertising cookies, or
                third-party analytics cookies on the waitlist site. See our{" "}
                <a href="/legal/cookies" className="text-accent hover:underline">
                  Cookie Policy
                </a>{" "}
                for more detail.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2 id="privacy-contact" className="text-xl font-semibold text-text-primary mb-3">
                Contact
              </h2>
              <p>
                Privacy questions:{" "}
                <a href="mailto:privacy@expozor.com" className="text-accent hover:underline">
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
