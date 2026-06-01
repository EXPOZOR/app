import type { Metadata } from "next";
import { InteractiveDemo } from "@/components/marketing/interactive-demo";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Demo — EXPOZOR",
  description:
    "Try EXPOZOR's expense tracking demo in full screen. Add expenses, see AI categorization, and watch budgets update — all client-side, no account needed.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Back to homepage"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Interactive sandbox</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Full-screen demo — no account, no data leaves your browser.
              </p>
            </div>
          </div>
          <InteractiveDemo />
        </div>
      </main>
    </>
  );
}
