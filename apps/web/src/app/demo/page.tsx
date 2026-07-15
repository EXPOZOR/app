import { InteractiveDemo } from "@/components/demo/interactive-demo";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Expense Demo",
  description:
    "Try EXPOZOR's local manual-entry demo with sample data. Manual entry comes first; upload, CSV import, and AI are on the roadmap.",
  alternates: { canonical: "https://expozor.com/demo" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Local Expense Demo", href: "/demo" }]);

export default function DemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site measure-section page-hero-py">
          <PageHero
            eyebrow="Local demo"
            title="Try the expense flow"
            description="Manual entry comes first. Use simple local keyword rules to review a sample expense; upload, CSV import, and AI are on the roadmap."
            align="center"
          />
        </div>
        <section className="border-t border-border pt-10 pb-24" aria-label="Expense simulation">
          <div className="container-site">
            <p className="mx-auto mb-6 max-w-4xl text-center text-xs leading-relaxed text-text-tertiary">
              Sample data only. Nothing is sent or saved. Do not enter real financial information.
            </p>
            <InteractiveDemo />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
