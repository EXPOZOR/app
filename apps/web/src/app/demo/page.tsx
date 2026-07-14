import { InteractiveDemo } from "@/components/demo/interactive-demo";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Simulation",
  description:
    "Try EXPOZOR's local expense-entry simulation with sample data, editable category suggestions, and no account required.",
  alternates: { canonical: "https://expozor.com/demo" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Product Simulation", href: "/demo" }]);

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
            eyebrow="Product simulation"
            title="Try the expense flow"
            description="Add a sample expense, review its locally suggested category, and confirm it. The simulation uses simple keyword rules in your browser; nothing is sent or saved."
            align="center"
          />
        </div>
        <section className="border-t border-border pt-10 pb-24" aria-label="Expense simulation">
          <div className="container-site">
            <p className="mx-auto mb-6 max-w-4xl text-center text-xs leading-relaxed text-text-tertiary">
              Product preview with sample data only. Planned workflows may change before launch. Do
              not enter real financial information.
            </p>
            <InteractiveDemo />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
