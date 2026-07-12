"use client";

import { motion } from "framer-motion";
import { Brain, Camera, RefreshCw, ShieldCheck, Target, Users } from "lucide-react";

const features = [
  {
    id: "scan",
    icon: Camera,
    title: "Receipt capture planned",
    description:
      "Receipt upload and scanning are on the roadmap. Manual entry remains the first supported workflow.",
    accent: "#7CF5C2",
    size: "large",
    visual: <ReceiptVisual />,
  },
  {
    id: "import",
    icon: RefreshCw,
    title: "CSV import",
    description:
      "CSV import is planned so you can bring in files you choose to provide, without connecting a bank account.",
    accent: "#60a5fa",
    size: "small",
    visual: null,
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI-assisted categorization planned",
    description:
      "AI category suggestions are planned for early access, with user review before relying on results.",
    accent: "#a78bfa",
    size: "small",
    visual: null,
  },
  {
    id: "budgets",
    icon: Target,
    title: "Budgets that flex",
    description:
      "Simple limits and household categories help organize spending as the product matures.",
    accent: "#FFB36B",
    size: "medium",
    visual: <BudgetVisual />,
  },
  {
    id: "share",
    icon: Users,
    title: "Shared expense notes",
    description:
      "Track shared household expenses manually. EXPOZOR records notes only and does not initiate payments.",
    accent: "#f87171",
    size: "small",
    visual: null,
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Built with security in mind",
    description: "HTTPS in transit. No bank credentials collected. EXPOZOR tracks expenses only.",
    accent: "#4ade80",
    size: "small",
    visual: null,
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="section-py" aria-labelledby="features-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Features
          </p>
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Built for expense tracking without bank links
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Manual entry today, with upload, import, and AI-assisted workflows planned for early
            access.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Large tile: scan (spans 2 cols on md) */}
          <BentoTile feature={features[0]} className="md:col-span-2 md:row-span-2" index={0} />

          {/* Small tiles */}
          <BentoTile feature={features[1]} className="" index={1} />
          <BentoTile feature={features[2]} className="" index={2} />

          {/* Medium tile: budgets */}
          <BentoTile feature={features[3]} className="md:col-span-1" index={3} />
          <BentoTile feature={features[4]} className="" index={4} />
          <BentoTile feature={features[5]} className="" index={5} />
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  feature,
  className,
  index,
}: {
  feature: (typeof features)[number];
  className: string;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative group rounded-[var(--radius-xl)] p-6 flex flex-col gap-4
        border border-[var(--border)] bg-[var(--bg-surface)]
        hover:border-[var(--border-strong)] transition-all duration-300
        overflow-hidden
        ${className}
      `}
      style={{ minHeight: feature.size === "large" ? 320 : 180 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${feature.accent}0D 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-[var(--radius)] flex items-center justify-center shrink-0"
        style={{
          background: `${feature.accent}1A`,
          border: `1px solid ${feature.accent}33`,
        }}
        aria-hidden="true"
      >
        <Icon size={18} style={{ color: feature.accent }} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-1.5">{feature.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Visual (for large/medium tiles) */}
      {feature.visual && (
        <div className="flex-1 flex items-end justify-center" aria-hidden="true">
          {feature.visual}
        </div>
      )}
    </motion.article>
  );
}

// ── Inline SVG visuals ─────────────────────────────────────────

function ReceiptVisual() {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[240px] opacity-60"
      aria-hidden="true"
    >
      <rect
        x="60"
        y="10"
        width="120"
        height="140"
        rx="8"
        fill="#1f1f24"
        stroke="#7CF5C2"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <rect x="72" y="28" width="96" height="8" rx="4" fill="#7CF5C2" fillOpacity="0.3" />
      <rect x="72" y="44" width="60" height="6" rx="3" fill="#71717a" fillOpacity="0.5" />
      <rect x="72" y="60" width="96" height="1" rx="0.5" fill="#3f3f46" />
      {[68, 80, 92, 104].map((y, i) => (
        <g key={y}>
          <rect
            x="72"
            y={y + 4}
            width={50 + i * 5}
            height="5"
            rx="2.5"
            fill="#a1a1aa"
            fillOpacity="0.3"
          />
          <rect
            x={155 + i}
            y={y + 4}
            width="28"
            height="5"
            rx="2.5"
            fill="#FFB36B"
            fillOpacity="0.4"
          />
        </g>
      ))}
      <rect x="72" y="128" width="96" height="1" rx="0.5" fill="#3f3f46" />
      <rect x="72" y="136" width="40" height="7" rx="3.5" fill="#7CF5C2" fillOpacity="0.5" />
      <rect x="148" y="136" width="20" height="7" rx="3.5" fill="#7CF5C2" fillOpacity="0.8" />
      {/* Scan line */}
      <line
        x1="56"
        y1="80"
        x2="184"
        y2="80"
        stroke="#7CF5C2"
        strokeWidth="1.5"
        strokeOpacity="0.7"
        strokeDasharray="4 2"
      />
      <circle cx="56" cy="80" r="3" fill="#7CF5C2" fillOpacity="0.8" />
      <circle cx="184" cy="80" r="3" fill="#7CF5C2" fillOpacity="0.8" />
    </svg>
  );
}

function BudgetVisual() {
  const bars = [
    { label: "Food", pct: 72, color: "#7CF5C2" },
    { label: "Transport", pct: 45, color: "#60a5fa" },
    { label: "Shopping", pct: 88, color: "#FFB36B" },
    { label: "Health", pct: 30, color: "#4ade80" },
  ];

  return (
    <div className="w-full space-y-3">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--text-tertiary)]">{bar.label}</span>
            <span style={{ color: bar.color }}>{bar.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg-overlay)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${bar.pct}%`, background: bar.color, opacity: 0.7 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
