import { Footer } from "@/components/layout/footer";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { Header } from "@/components/layout/header";
import { StickyMobileCtaBar } from "@/components/layout/sticky-mobile-cta";
import { AiExplainerSection } from "@/components/sections/ai-explainer";
import { DemoSection } from "@/components/sections/demo-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { HeroSection } from "@/components/sections/hero-shell";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MobileAppCtaSection } from "@/components/sections/mobile-app-cta";
import { PricingSection } from "@/components/sections/pricing-section";
import { SecuritySection } from "@/components/sections/security-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustStrip } from "@/components/sections/trust-strip";

/**
 * EXPOZOR homepage — all sections, v3.
 * Section order matches the brief:
 *   Hero → Trust Strip → Live Demo → Features →
 *   AI Explainer → How It Works → Security → Testimonials →
 *   Pricing → FAQ → Final CTA → Mobile App CTA → Footer
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

        {/* 5b. AI Explainer — pipeline walkthrough */}
        <div className="divider" />
        <AiExplainerSection />

        {/* 6. How it works */}
        <div className="divider" />
        <HowItWorksSection />

        {/* 7. Security */}
        <div className="divider" />
        <SecuritySection />

        {/* 8. Testimonials */}
        <div className="divider" />
        <TestimonialsSection />

        {/* 9. Pricing */}
        <div className="divider" />
        <PricingSection />

        {/* 10. FAQ */}
        <div className="divider" />
        <FaqSection />

        {/* 11. Final CTA */}
        <div className="divider" />
        <FinalCtaSection />

        {/* 12. Mobile App CTA */}
        <div className="divider" />
        <MobileAppCtaSection />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Sticky mobile CTA bar — fixed bottom, mobile-only */}
      <StickyMobileCtaBar />
    </>
  );
}
