import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the EXPOZOR team. We're building the expense manager we always wanted — remote-first, craft-focused.",
  alternates: { canonical: "https://expozor.app/careers" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "Careers", href: "/careers" }]);

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site section-py max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">Careers</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Work on something you'd use every day.</h1>
          <p className="text-[var(--text-secondary)] text-lg mb-12 leading-relaxed">
            We're a small, remote-first team building a product we genuinely love. We care about
            craft, clarity, and shipping things that work.
          </p>

          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-surface)] p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">No open roles right now.</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              We hire slowly and carefully. If you love what we're building, reach out anyway —
              great people don't always appear when the role does.
            </p>
            <a
              href="mailto:careers@expozor.app"
              className="btn-primary"
            >
              Say hello
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
