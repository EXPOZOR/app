"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    description: "For individuals getting started.",
    features: [
      "Up to 50 expense entries per month",
      "90 days expense history",
      "Manual expense entry",
      "Basic categorization",
      "CSV export",
    ],
    cta: "Get started",
    href: "#waitlist",
    highlighted: false,
  },
  {
    id: "plus",
    name: "Plus",
    monthlyPrice: 6,
    description: "For people serious about their finances.",
    features: [
      "Unlimited expense entries",
      "Full expense history",
      "Receipt scanning (OCR)",
      "AI categorization",
      "Budget tracking",
      "Multi-currency support",
    ],
    cta: "Start free trial",
    href: "#waitlist",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 14,
    description: "For power users and freelancers.",
    features: [
      "Everything in Plus",
      "EXPOZOR AI chat agent",
      "Custom rules & automations",
      "Anomaly detection",
      "Subscription audit",
      "API access",
      "Tax-ready exports",
    ],
    cta: "Start free trial",
    href: "#waitlist",
    highlighted: true,
  },
  {
    id: "households",
    name: "Households",
    monthlyPrice: 24,
    description: "For families and couples.",
    features: [
      "Everything in Pro",
      "Up to 6 household members",
      "Shared expense tracking",
      "Split expenses across members",
      "Per-user privacy controls",
    ],
    cta: "Start free trial",
    href: "#waitlist",
    highlighted: false,
  },
] as const;

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="section-py" aria-labelledby="pricing-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Pricing
          </p>
          <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            Start free. Upgrade when you're ready.
          </p>

          {/* Annual / Monthly toggle */}
          <div
            className="inline-flex items-center gap-3 p-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)]"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual
                  ? "bg-[var(--bg-overlay)] text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              }`}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual
                  ? "bg-[var(--bg-overlay)] text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              }`}
              aria-pressed={annual}
            >
              Annual
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--border-accent)]">
                −20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => {
            const price =
              plan.monthlyPrice === 0
                ? 0
                : annual
                  ? Math.round(plan.monthlyPrice * 0.8 * 10) / 10
                  : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`
                  relative flex flex-col rounded-[var(--radius-xl)] p-6
                  border transition-all duration-300
                  ${
                    plan.highlighted
                      ? "border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_60px_rgba(124,245,194,0.12)]"
                      : "border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]"
                  }
                `}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-[var(--accent)] text-[var(--text-inverse)] uppercase tracking-wide">
                      <Zap size={10} aria-hidden="true" />
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-xl text-[var(--text-primary)] mb-1">{plan.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[var(--text-primary)]">
                      {price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price !== 0 && (
                      <span className="text-sm text-[var(--text-tertiary)]">/month</span>
                    )}
                  </div>
                  {annual && plan.monthlyPrice > 0 && (
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">
                      Billed ${Math.round(price * 12)}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 list-none mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="text-[var(--accent)] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`
                    block w-full py-2.5 rounded-[var(--radius)] text-sm font-semibold text-center
                    transition-all duration-150 active:scale-[0.98]
                    ${
                      plan.highlighted
                        ? "bg-[var(--accent)] text-[var(--text-inverse)] hover:bg-[var(--accent-dim)]"
                        : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-strong)]"
                    }
                  `}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
