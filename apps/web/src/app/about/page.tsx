import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About — EXPOZOR",
  description:
    "We're building the expense manager we always wanted — calm, intelligent, and respectful of your time.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site max-w-3xl section-py">
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">About</p>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            We're building what we always wanted.
          </h1>
          <div className="prose-custom space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed">
            <p>
              Managing personal finances shouldn't feel like filing taxes. Yet every app we tried
              was either too simple to be useful or so complex it became a second job. We decided
              to build something different.
            </p>
            <p>
              EXPOZOR is designed around one principle: money is personal. The app should adapt
              to you, not the other way around. Whether you're tracking every coffee or managing a
              household budget across five currencies, EXPOZOR should feel frictionless.
            </p>
            <p>
              We're a small, distributed team. We care deeply about privacy, accessibility, and
              the craft of building software that respects people.
            </p>
            <div className="pt-6 border-t border-[var(--border)]">
              <blockquote className="text-[var(--text-primary)] text-xl font-medium italic pl-5 border-l-2 border-[var(--accent)]">
                "Calm, intelligent money. That's all we're trying to make."
              </blockquote>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
