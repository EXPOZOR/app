"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "For individuals joining early access.",
    features: [
      "Manual expense entry",
      "Basic categorization",
      "Simple budget views",
      "Waitlist access",
      "No payment required",
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    highlighted: false,
  },
  {
    id: "plus",
    name: "Plus",
    price: "Planned",
    description: "For deeper tracking workflows once billing launches.",
    features: [
      "Receipt capture planned",
      "CSV import planned",
      "AI-assisted categories planned",
      "Budget tracking planned",
      "Multi-currency support planned",
    ],
    cta: "Get early access",
    href: "#waitlist",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "Planned",
    description: "For advanced organization features planned for later.",
    features: [
      "Everything in Plus",
      "Custom rules planned",
      "Anomaly review planned",
      "Subscription review planned",
      "Developer integrations planned",
      "Data download planned",
    ],
    cta: "Get early access",
    href: "#waitlist",
    highlighted: true,
  },
  {
    id: "households",
    name: "Households",
    price: "Planned",
    description: "For families and couples who want manual shared tracking.",
    features: [
      "Everything in Pro",
      "Household members planned",
      "Manual shared expense notes",
      "No payment handling between users",
      "Privacy controls planned",
    ],
    cta: "Get early access",
    href: "#waitlist",
    highlighted: false,
  },
] as const;

export function PricingSection() {
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
            Billing is not active yet
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            EXPOZOR is waitlist-only today. Paid plans are shown as planned packaging and may change
            before launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[var(--accent)] text-[var(--text-inverse)] uppercase tracking-wide">
                    Planned
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
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                  No paid subscription is available today.
                </p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
