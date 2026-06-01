import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free, Plus ($6/mo), Pro ($14/mo), Households ($24/mo). Start free, upgrade when ready. Annual billing saves 20%.",
  alternates: { canonical: "https://expozor.app/pricing" },
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Pricing
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>
        </div>
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
