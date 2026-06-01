import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";

export const metadata: Metadata = {
  title: "Pricing — EXPOZOR",
  description:
    "Free, Plus ($6/mo), Pro ($14/mo), Households ($24/mo). Start free, upgrade when ready. Annual billing saves 20%.",
};

export default function PricingPage() {
  return (
    <>
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
