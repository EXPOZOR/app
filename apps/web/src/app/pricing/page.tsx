import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "EXPOZOR is waitlist-only today. Paid plans are planned but billing is not active.",
  alternates: { canonical: "https://expozor.com/pricing" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Pricing", href: "/pricing" }]);

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site py-16 text-center">
          <PageHero
            title="Pricing"
            description="EXPOZOR is waitlist-only today. Paid plans are planned but no paid subscription is available yet."
            align="center"
          />
        </div>
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
