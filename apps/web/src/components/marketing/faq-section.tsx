"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Is my financial data safe?",
    a: "EXPOZOR uses HTTPS for all data in transit. We do not sell your data, and you can request deletion of your account and data at any time. Additional security details are on our Security page.",
  },
  {
    q: "Do I need to connect my bank?",
    a: "No. EXPOZOR does not require a bank connection. You add expenses manually, by uploading a receipt or screenshot, or by importing a CSV file.",
  },
  {
    q: "How does the AI categorization work?",
    a: "Your own rules run first. For transactions with no matching rule, AI categorization suggests a category with a confidence score. Results below a confidence threshold are flagged for your review.",
  },
  {
    q: "Can I share expenses with my household?",
    a: "Shared expense tracking is a planned feature. You can split expenses across household members manually. Automatic money transfer or settlement between users is not supported.",
  },
  {
    q: "What happens if I want to cancel?",
    a: "Billing is not yet active. When it is, you will be able to cancel anytime. You can always request a data export or account deletion by contacting support.",
  },
  {
    q: "Is there a mobile app?",
    a: "iOS and Android apps are in development. The web app is available now. Join the waitlist to get early access when mobile apps launch.",
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
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
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
                    type="button"
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
