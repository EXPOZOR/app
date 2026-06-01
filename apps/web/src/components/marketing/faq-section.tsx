"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is my financial data safe?",
    a: "Yes. EXPOZOR uses AES-256-GCM encryption at rest with per-user envelope keys, row-level security at the database level, and TLS 1.3 in transit. We never sell your data, and you can export or permanently delete everything within 24 hours.",
  },
  {
    q: "Which banks do you support?",
    a: "Plaid for US and Canada, TrueLayer and GoCardless for Europe and the UK. Other regions can import via CSV, or use the EXPOZOR Agent to parse receipts and SMS messages as a graceful fallback.",
  },
  {
    q: "How does the AI categorization work?",
    a: "Your own rules run first. If a rule matches, no AI is called. For unknowns, Claude Haiku classifies in batch. Results with confidence below 60% are flagged for your review — we never auto-apply uncertain categories to your data.",
  },
  {
    q: "Can I share expenses with my family?",
    a: "Yes. Household plans support shared accounts with per-user privacy on personal accounts. Group splits handle multi-currency with a smart settle-up algorithm that minimizes the number of transactions.",
  },
  {
    q: "What happens if I want to cancel?",
    a: "Cancel anytime — no friction, no dark patterns. You keep access to the Free tier features. A full data export is always one click away.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes. Native iOS and Android apps are coming with on-device receipt scanning via ML Kit. They'll be available via TestFlight and Play Internal Testing first. Join the waitlist to get early access.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-py" aria-labelledby="faq-heading">
      <div className="container-site max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Questions, answered.
          </h2>
        </motion.div>

        <dl className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-[var(--radius-lg)] border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[var(--border-accent)] bg-[var(--accent-subtle)]"
                    : "border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]"
                }`}
              >
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-medium text-[var(--text-primary)]">{faq.q}</span>
                    <span
                      className={`shrink-0 p-1 rounded-full transition-colors ${
                        isOpen
                          ? "bg-[var(--accent)] text-[var(--text-inverse)]"
                          : "bg-[var(--bg-elevated)] text-[var(--text-tertiary)]"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
