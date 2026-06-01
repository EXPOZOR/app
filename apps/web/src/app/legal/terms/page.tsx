import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service — EXPOZOR",
  description: "EXPOZOR terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        <div className="container-site max-w-3xl section-py">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-[var(--text-tertiary)] text-sm mb-10">Last updated: June 2026</p>
          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section aria-labelledby="terms-acceptance">
              <h2 id="terms-acceptance" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Acceptance of terms</h2>
              <p>By using EXPOZOR, you agree to these Terms of Service. If you don't agree, please don't use the service.</p>
            </section>
            <section aria-labelledby="terms-service">
              <h2 id="terms-service" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Description of service</h2>
              <p>EXPOZOR is a personal and shared expense management application. We provide features including expense tracking, receipt scanning, bank account synchronization, budgeting tools, and AI-powered categorization.</p>
            </section>
            <section aria-labelledby="terms-accounts">
              <h2 id="terms-accounts" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Accounts and security</h2>
              <p>You are responsible for maintaining the security of your account credentials. You must notify us immediately if you suspect unauthorized access. We offer passkey authentication as the most secure option and strongly recommend enabling it.</p>
            </section>
            <section aria-labelledby="terms-payment">
              <h2 id="terms-payment" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Payments and billing</h2>
              <p>Paid plans are billed monthly or annually via Stripe. You may cancel at any time; cancellation takes effect at the end of the current billing period. We do not offer refunds for partial periods.</p>
            </section>
            <section aria-labelledby="terms-contact">
              <h2 id="terms-contact" className="text-xl font-semibold text-[var(--text-primary)] mb-3">Contact</h2>
              <p>Legal questions: <a href="mailto:legal@expozor.app" className="text-[var(--accent)] hover:underline">legal@expozor.app</a></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
