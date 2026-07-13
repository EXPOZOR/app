import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the EXPOZOR team. We're building the expense manager we always wanted — remote-first, craft-focused.",
  alternates: { canonical: "https://expozor.com/careers" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Careers", href: "/careers" }]);

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site measure-prose section-py">
          <PageHero
            eyebrow="Careers"
            title="Work on something you'd use every day."
            description="We're a small, remote-first team building a product we genuinely love. We care about craft, clarity, and shipping things that work."
            scale="compact"
            className="mb-12"
          />

          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">No open roles right now.</h2>
            <p className="text-text-secondary mb-6">
              We hire slowly and carefully. If you love what we're building, reach out anyway —
              great people don't always appear when the role does.
            </p>
            {/* TODO: add confirmed careers contact email before hiring opens */}
            <a href="/contact" className={buttonClassName()}>
              Reach out via the contact page
            </a>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
