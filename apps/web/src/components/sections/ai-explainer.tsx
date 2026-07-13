"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Brain, Camera, ChevronLeft, ChevronRight, Lightbulb, PieChart } from "lucide-react";
import { useCallback, useState } from "react";

/* ── Steps ─────────────────────────────────────────────────── */

const STEPS = [
  {
    id: "scan",
    icon: Camera,
    label: "Capture",
    title: "Manual entry first, upload planned",
    description:
      "Manual entry is the first workflow. Receipt upload and CSV import are planned for early access, without requiring a bank connection.",
    color: "var(--decorative)",
    visual: {
      type: "receipt" as const,
      items: [
        { label: "Merchant", value: "Grocery Store", confidence: 99 },
        { label: "Amount", value: "$47.23", confidence: 98 },
        { label: "Date", value: "Jun 1, 2026", confidence: 97 },
        { label: "Items", value: "12 line items", confidence: 95 },
      ],
    },
  },
  {
    id: "categorize",
    icon: Brain,
    label: "Categorize",
    title: "AI suggestions are planned",
    description:
      "The planned workflow puts your rules first. AI-assisted categories are intended as reviewable suggestions, not automatic decisions.",
    color: "#60a5fa",
    visual: {
      type: "categories" as const,
      items: [
        { merchant: "Grocery Store", category: "Groceries", confidence: 98 },
        { merchant: "Gas Station", category: "Transport", confidence: 96 },
        { merchant: "Streaming Service", category: "Subscriptions", confidence: 99 },
        { merchant: "Unknown Café", category: "Review needed", confidence: 54 },
      ],
    },
  },
  {
    id: "budget",
    icon: PieChart,
    label: "Budget",
    title: "Budget views are planned",
    description:
      "Budget views are planned to summarize spending by category and month after you review your entries.",
    color: "#a78bfa",
    visual: {
      type: "budgets" as const,
      items: [
        { category: "Groceries", spent: 340, budget: 500, color: "var(--positive)" },
        { category: "Dining", spent: 180, budget: 200, color: "#FFB36B" },
        { category: "Transport", spent: 95, budget: 150, color: "#60a5fa" },
        {
          category: "Subscriptions",
          spent: 67,
          budget: 80,
          color: "#a78bfa",
        },
      ],
    },
  },
  {
    id: "insights",
    icon: Lightbulb,
    label: "Insights",
    title: "Insights are planned",
    description:
      "EXPOZOR is designed to highlight spending patterns and review opportunities after the underlying entries are confirmed.",
    color: "#FFB36B",
    visual: {
      type: "insights" as const,
      items: [
        {
          icon: "📈",
          text: "Dining spending is 23% higher than last month",
          type: "warning",
        },
        {
          icon: "💡",
          text: "Two subscription services overlap — cancelling one saves ~$10/mo",
          type: "suggestion",
        },
        {
          icon: "✅",
          text: "Groceries budget is on track — $160 remaining",
          type: "positive",
        },
      ],
    },
  },
];

/* ── Visual sub-components ─────────────────────────────────── */

function ReceiptVisual({
  items,
}: {
  items: { label: string; value: string; confidence: number }[];
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-3 rounded bg-bg border border-border"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-text-tertiary">{item.label}</p>
            <p className="text-sm font-medium text-text-primary">{item.value}</p>
          </div>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{
              background: "var(--positive-subtle)",
              color: "var(--positive)",
              border: "1px solid color-mix(in oklch, var(--positive) 20%, transparent)",
            }}
          >
            {item.confidence}%
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function CategoriesVisual({
  items,
}: {
  items: {
    merchant: string;
    category: string;
    confidence: number;
  }[];
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isLow = item.confidence < 60;
        const color = isLow ? "#ef4444" : "#60a5fa";
        return (
          <motion.div
            key={item.merchant}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded bg-bg border border-border"
          >
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
            <span className="text-sm text-text-primary flex-1">{item.merchant}</span>
            <span className="text-xs text-text-tertiary">{item.category}</span>
            <span className="text-xs font-mono font-medium" style={{ color }}>
              {item.confidence}%
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function BudgetsVisual({
  items,
}: {
  items: {
    category: string;
    spent: number;
    budget: number;
    color: string;
  }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const pct = Math.round((item.spent / item.budget) * 100);
        return (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded bg-bg border border-border"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-text-primary">{item.category}</span>
              <span className="text-xs text-text-tertiary">
                ${item.spent} / ${item.budget}
              </span>
            </div>
            <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function InsightsVisual({
  items,
}: {
  items: { icon: string; text: string; type: string }[];
}) {
  const borderColors: Record<string, string> = {
    warning: "#FFB36B33",
    suggestion: "#60a5fa33",
    positive: "color-mix(in oklch, var(--positive) 20%, transparent)",
  };
  const bgColors: Record<string, string> = {
    warning: "#FFB36B0D",
    suggestion: "#60a5fa0D",
    positive: "color-mix(in oklch, var(--positive) 5%, transparent)",
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-start gap-3 p-3 rounded border"
          style={{
            borderColor: borderColors[item.type] || "#ffffff1A",
            background: bgColors[item.type] || "transparent",
          }}
        >
          <span className="text-lg shrink-0" aria-hidden="true">
            {item.icon}
          </span>
          <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */

export function AiExplainerSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < STEPS.length) setActiveStep(index);
  }, []);

  if (!step) return null;

  return (
    <section id="ai-pipeline" className="section-py" aria-labelledby="ai-explainer-heading">
      <div className="container-site">
        {/* Section header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold text-accent mb-3">
            How it works
          </p>
          <h2
            id="ai-explainer-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          >
            From expense entry to insight, carefully
          </h2>
          <p className="text-text-secondary text-lg">
            Four planned steps, with user review before relying on suggestions.
          </p>
        </div>

        {/* Step navigation pills */}
        <div className="flex justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === activeStep;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={`flex min-h-11 items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-text-inverse shadow-lg"
                    : "border border-border text-text-secondary hover:border-border-strong"
                }`}
                style={
                  isActive
                    ? { background: s.color, boxShadow: `0 4px 20px ${s.color}40` }
                    : undefined
                }
                aria-current={isActive ? "step" : undefined}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: copy */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step.id}-copy`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: `${step.color}1A`,
                    border: `1px solid ${step.color}33`,
                  }}
                >
                  <step.icon size={22} style={{ color: step.color }} aria-hidden="true" />
                </div>
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-2"
                  style={{ color: step.color }}
                >
                  Step {activeStep + 1} of {STEPS.length}
                </p>
                <h3 className="text-2xl font-bold text-text-primary mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>

                {/* Prev/Next */}
                <div className="flex gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => goTo(activeStep - 1)}
                    disabled={activeStep === 0}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-border-strong transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous step"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeStep + 1)}
                    disabled={activeStep === STEPS.length - 1}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-border-strong transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next step"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right: visual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step.id}-visual`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-border bg-bg-surface p-5"
                style={{
                  borderColor: `${step.color}33`,
                }}
              >
                {step.visual.type === "receipt" && <ReceiptVisual items={step.visual.items} />}
                {step.visual.type === "categories" && (
                  <CategoriesVisual items={step.visual.items} />
                )}
                {step.visual.type === "budgets" && <BudgetsVisual items={step.visual.items} />}
                {step.visual.type === "insights" && <InsightsVisual items={step.visual.items} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="h-1 rounded-full bg-bg-elevated overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: step.color }}
              animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
