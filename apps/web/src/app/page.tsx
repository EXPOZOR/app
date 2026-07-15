import { Footer } from "@/components/layout/footer";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { Header } from "@/components/layout/header";
import { StickyMobileCtaBar } from "@/components/layout/sticky-mobile-cta";
import { DemoSection } from "@/components/sections/demo-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { HeroSection } from "@/components/sections/hero-shell";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing-section";
import { SecuritySection } from "@/components/sections/security-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustStrip } from "@/components/sections/trust-strip";

/**
 * EXPOZOR homepage — all sections, v3.
 * Section order matches the brief:
 *   Hero → Trust Strip → Live Demo → Features → How It Works →
 *   Security → Product Commitments → Early Access → FAQ → Final CTA → Footer
 * + Sticky Mobile CTA Bar (fixed bottom, mobile-only)
 */
export default function HomePage() {
  return (
    <>
      <HashScrollHandler />
      <Header />

      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Compact product commitments */}
        <TrustStrip />

        {/* 3. Interactive demo */}
        <DemoSection />

        {/* 4. Features bento */}
        <div className="divider" />
        <FeaturesSection />

        {/* 5. How it works */}
        <div className="divider" />
        <HowItWorksSection />

        {/* 6. Security */}
        <div className="divider" />
        <SecuritySection />

        {/* 7. Product commitments */}
        <div className="divider" />
        <TestimonialsSection />

        {/* 8. Early access */}
        <div className="divider" />
        <PricingSection />

        {/* 9. FAQ */}
        <div className="divider" />
        <FaqSection />

        {/* 10. Final CTA */}
        <div className="divider" />
        <FinalCtaSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Sticky mobile CTA bar — fixed bottom, mobile-only */}
      <StickyMobileCtaBar />
    </>
  );
}
