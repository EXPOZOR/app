import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "EXPOZOR is built by Mohamed Karrach — calm, intelligent expense tracking that respects your time and privacy.",
  alternates: { canonical: "https://expozor.com/about" },
};

const breadcrumb = breadcrumbJsonLd([{ name: "About", href: "/about" }]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site max-w-3xl section-py">
          <PageHero
            eyebrow="About"
            title="One person, one mission."
            scale="editorial"
            className="mb-6"
          />
          <div className="prose-custom space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed">
            <p>
              Hi, I'm <strong className="text-[var(--text-primary)]">Mohamed Karrach</strong> — the
              founder and sole developer behind EXPOZOR.
            </p>
            <p>
              Managing personal finances shouldn't feel like filing taxes. Yet every app I tried was
              either too simple to be useful or so complex it became a second job. So I decided to
              build something different.
            </p>
            <p>
              EXPOZOR is designed around one principle: money is personal. The app should adapt to
              you, not the other way around. Whether you're tracking every coffee or managing a
              household budget across five currencies, EXPOZOR should feel frictionless.
            </p>
            <p>
              I care deeply about privacy, accessibility, and the craft of building software that
              respects people. Every line of code, every design decision, and every word on this
              site is mine — and I stand behind all of it.
            </p>
            <div className="pt-6 border-t border-[var(--border)]">
              <blockquote className="text-[var(--text-primary)] text-xl font-medium italic pl-5 border-l-2 border-[var(--accent)]">
                "Calm, intelligent money. That's all I'm trying to make."
              </blockquote>
              <p className="mt-3 text-sm text-[var(--text-muted)]">— Mohamed Karrach, Founder</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
