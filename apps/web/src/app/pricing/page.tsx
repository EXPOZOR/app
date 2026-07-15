import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Join the EXPOZOR early access waitlist for free. Billing is not active and no paid subscription is available.",
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
        <PricingSection headingLevel={1} />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
