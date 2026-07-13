import { InteractiveDemo } from "@/components/demo/interactive-demo";
import { Header } from "@/components/layout/header";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Sample expense tracking demo. Try adding expenses with generic sample data — no account required.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://expozor.com/demo" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Live Demo", href: "/demo" }]);

export default function DemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main
        id="main-content"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-24"
      >
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Back to homepage"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Interactive sandbox</h1>
              <p className="text-sm text-text-secondary mt-1">
                Sample data only. Do not enter real financial information.
              </p>
            </div>
          </div>
          <InteractiveDemo />
        </div>
      </main>
    </>
  );
}
