import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingSection } from "@/components/sections/pricing-section";
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Pricing</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto">
            EXPOZOR is waitlist-only today. Paid plans are planned but no paid subscription is
            available yet.
          </p>
        </div>
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
