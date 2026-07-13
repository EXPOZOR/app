"use client";

import { DEMO } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { PieChart, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   BROWSER FRAME
   Pure CSS — traffic-light dots, URL bar, rounded chrome.
────────────────────────────────────────────────────────────── */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.7)",
        background: "var(--bg-elev-1)",
      }}
      role="img"
      aria-label="EXPOZOR dashboard preview"
    >
      {/* Chrome bar */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          background: "var(--bg-elev-2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
            <div
              key={c}
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: c,
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        {/* Fake URL bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 10px",
              borderRadius: "6px",
              background: "var(--bg-overlay)",
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              maxWidth: "220px",
              width: "100%",
            }}
          >
            {/* Mini logo mark */}
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                background:
                  "linear-gradient(135deg, var(--brand-mint) 0%, var(--brand-lilac) 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7px",
                fontWeight: 800,
                color: "#0A0A0B",
                flexShrink: 0,
              }}
            >
              E
            </span>
            app.expozor.app
          </div>
        </div>

        {/* Right spacer to balance traffic lights */}
        <div style={{ width: "50px", flexShrink: 0 }} />
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────────── */
const TRANSACTIONS = [
  {
    id: "t1",
    merchant: "Freelance Payment",
    amount: "+$4,200",
    category: "Income",
    icon: "💼",
    color: "#34D399",
    positive: true,
    date: "Today",
  },
  {
    id: "t2",
    merchant: "Grocery Store",
    amount: "-$94.20",
    category: "Groceries",
    icon: "🛒",
    color: "var(--positive)",
    positive: false,
    date: "Yesterday",
  },
  {
    id: "t3",
    merchant: "Coffee Shop",
    amount: "-$6.50",
    category: "Coffee",
    icon: "☕",
    color: "var(--positive)",
    positive: false,
    date: "Yesterday",
  },
  {
    id: "t4",
    merchant: "Taxi Ride",
    amount: "-$18.40",
    category: "Transport",
    icon: "🚗",
    color: "#60A5FA",
    positive: false,
    date: "Mon",
  },
  {
    id: "t5",
    merchant: "Streaming Service",
    amount: "-$15.99",
    category: "Entertainment",
    icon: "🎬",
    color: "#A78BFA",
    positive: false,
    date: "Mon",
  },
  {
    id: "t6",
    merchant: "Online Shopping",
    amount: "-$64.30",
    category: "Shopping",
    icon: "🛒",
    color: "#FB923C",
    positive: false,
    date: "Sun",
  },
] as const;

const BUDGETS = [
  { label: "Food & Drink", spent: 340, total: 500, color: "var(--positive)" },
  { label: "Shopping", spent: 180, total: 300, color: "#A78BFA" },
  { label: "Transport", spent: 95, total: 150, color: "#60A5FA" },
  { label: "Entertainment", spent: 45, total: 60, color: "#FB923C" },
  { label: "Personal Care", spent: 28, total: 80, color: "#F472B6" },
] as const;

const SPLIT_ITEMS = [
  {
    id: "s1",
    desc: "Dinner — Restaurant",
    total: "$120.00",
    you: "$60.00",
    other: "Manual note: Jordan share $60",
    color: "var(--positive)",
  },
  {
    id: "s2",
    desc: "Airbnb — Porto trip",
    total: "$480.00",
    you: "$240.00",
    other: "Manual note: Alex share $240",
    color: "#A78BFA",
  },
  {
    id: "s3",
    desc: "Taxi — Airport",
    total: "$36.80",
    you: "$18.40",
    other: "Manual note: Jordan share $18.40",
    color: "#60A5FA",
  },
  {
    id: "s4",
    desc: "Groceries — April",
    total: "$188.40",
    you: "$94.20",
    other: "Manual note: Sam share $94.20",
    color: "#FB923C",
  },
] as const;

// SVG line chart data — monthly spending (Mar–Aug)
const CHART_POINTS = [2100, 1850, 2400, 1950, 2200, 1780] as const;
const CHART_LABELS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"] as const;

/* ──────────────────────────────────────────────────────────────
   TAB PANELS
────────────────────────────────────────────────────────────── */

/** Panel 1 — Categorize */
function CategorizePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-elev-2)",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Transactions · May 2026
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.625rem",
            fontWeight: 600,
            padding: "2px 7px",
            borderRadius: "var(--radius-full)",
            background: "var(--accent-subtle)",
            color: "var(--accent)",
            border: "1px solid var(--border-accent)",
          }}
        >
          <Sparkles size={8} aria-hidden="true" /> AI-assisted categorization
        </span>
      </div>

      {/* Rows */}
      {TRANSACTIONS.map((tx, i) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "var(--radius-sm)",
              background: `${tx.color}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              flexShrink: 0,
              border: `1px solid ${tx.color}25`,
            }}
          >
            {tx.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                letterSpacing: "-0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {tx.merchant}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
              <span
                style={{
                  fontSize: "0.5625rem",
                  fontWeight: 600,
                  padding: "1px 5px",
                  borderRadius: "var(--radius-full)",
                  background: `${tx.color}18`,
                  color: tx.color,
                }}
              >
                {tx.category}
              </span>
              <span style={{ fontSize: "0.5625rem", color: "var(--text-muted)" }}>{tx.date}</span>
            </div>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
              fontVariantNumeric: "tabular-nums",
              color: tx.positive ? "var(--positive)" : "var(--text-primary)",
            }}
          >
            {tx.amount}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/** Panel 2 — Budget */
function BudgetPanel() {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Envelopes · May 2026
        </span>
        <span style={{ fontSize: "0.625rem", color: "var(--text-muted)" }}>14 days left</span>
      </div>

      {BUDGETS.map((b, i) => {
        const pct = Math.round((b.spent / b.total) * 100);
        const over = pct > 90;
        return (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3, ease: EASE_OUT }}
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", fontWeight: 500 }}
              >
                {b.label}
              </span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: over ? "var(--warn)" : "var(--text-secondary)",
                }}
              >
                ${b.spent}{" "}
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ ${b.total}</span>
              </span>
            </div>
            {/* ── Enhancement 4: scaleX instead of width (paint-only, no layout thrash) */}
            <div
              style={{
                height: "6px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-muted)",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "var(--radius-full)",
                  background: over ? "var(--warn)" : b.color,
                  originX: 0 /* scale from left edge */,
                  scaleX: 0 /* start flat */,
                }}
                animate={{ scaleX: pct / 100 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.75, ease: EASE_OUT }}
              />
            </div>
          </motion.div>
        );
      })}

      <div
        style={{
          marginTop: "4px",
          padding: "8px 12px",
          borderRadius: "var(--radius-sm)",
          background: "var(--accent-subtle)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 600 }}>
          Remaining this month
        </span>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
        >
          $387.10
        </span>
      </div>
    </div>
  );
}

/** Panel 3 — Split */
function SplitPanel() {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Shared expense notes
        </span>
        <span
          style={{
            fontSize: "0.5625rem",
            fontWeight: 600,
            padding: "2px 7px",
            borderRadius: "var(--radius-full)",
            background: "rgba(167,139,250,0.12)",
            color: "#A78BFA",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          3 people
        </span>
      </div>

      {SPLIT_ITEMS.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {s.desc}
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.total}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.5625rem", color: "var(--text-muted)" }}>
              Your share: {s.you}
            </span>
            <span
              style={{
                fontSize: "0.5625rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              {s.other}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Manual tracking row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderRadius: "var(--radius-sm)",
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          marginTop: "2px",
        }}
      >
        <div>
          <p style={{ fontSize: "0.625rem", color: "var(--text-muted)", margin: 0 }}>
            Manual-only tracking
          </p>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--positive)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            No payments handled
          </p>
        </div>
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            padding: "5px 10px",
            borderRadius: "var(--radius-sm)",
            background: "var(--accent-subtle)",
            color: "var(--accent)",
            border: "1px solid var(--border-accent)",
            cursor: "pointer",
          }}
        >
          Review notes
        </div>
      </div>
    </div>
  );
}

/** Panel 4 — Insights (SVG line chart + breakdown) */
function InsightsPanel() {
  const W = 340;
  const H = 90;
  const PAD = 10;
  const min = Math.min(...CHART_POINTS);
  const max = Math.max(...CHART_POINTS);
  const range = max - min || 1;
  const pts = CHART_POINTS.map((v, i) => ({
    x: PAD + (i / (CHART_POINTS.length - 1)) * (W - PAD * 2),
    y: PAD + ((max - v) / range) * (H - PAD * 2),
    v,
  }));
  const pathD = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  // Fill path: go right→ down→ left
  const fillD = `${pathD} L${pts.at(-1)?.x.toFixed(1)},${H} L${pts[0]?.x.toFixed(1)},${H} Z`;

  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Chart header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Spending trend
        </span>
        <span style={{ fontSize: "0.5625rem", color: "var(--positive)", fontWeight: 600 }}>
          ↓ 19% vs last month
        </span>
      </div>

      {/* SVG line chart */}
      <div
        style={{
          background: "var(--bg-elev-2)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
          padding: "10px 10px 4px",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", height: "auto", overflow: "visible" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--positive)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--positive)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={PAD}
              y1={PAD + f * (H - PAD * 2)}
              x2={W - PAD}
              y2={PAD + f * (H - PAD * 2)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          {/* Fill */}
          <path d={fillD} fill="url(#chart-fill)" />
          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--positive)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              filter: "drop-shadow(0 0 4px color-mix(in oklch, var(--positive) 40%, transparent))",
            }}
          />
          {/* Dots */}
          {pts.map((p) => (
            <circle
              key={`dot-${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="var(--positive)"
              style={{
                filter:
                  "drop-shadow(0 0 4px color-mix(in oklch, var(--positive) 50%, transparent))",
              }}
            />
          ))}
          {/* Labels */}
          {pts.map((p, i) => (
            <text
              key={`label-${CHART_LABELS[i] ?? i}`}
              x={p.x}
              y={H + 2}
              textAnchor="middle"
              fill="rgba(154,154,162,0.8)"
              fontSize="7"
              fontFamily="system-ui"
            >
              {CHART_LABELS[i]}
            </text>
          ))}
        </svg>
      </div>

      {/* Category breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
        {[
          { label: "Food & Drink", pct: 38, color: "var(--positive)" },
          { label: "Shopping", pct: 24, color: "#A78BFA" },
          { label: "Transport", pct: 18, color: "#60A5FA" },
          { label: "Other", pct: 20, color: "#FB923C" },
        ].map((c) => (
          <div
            key={c.label}
            style={{
              padding: "7px 10px",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg-elev-2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                background: c.color,
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.5625rem", color: "var(--text-muted)", margin: 0 }}>
                {c.label}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.pct}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB CONFIG
────────────────────────────────────────────────────────────── */
type Tab = { id: string; label: string; panel: React.ReactNode };

const TABS: Tab[] = [
  { id: "categorize", label: "Categorize", panel: <CategorizePanel /> },
  { id: "budget", label: "Budget", panel: <BudgetPanel /> },
  { id: "split", label: "Shared notes", panel: <SplitPanel /> },
  { id: "insights", label: "Insights", panel: <InsightsPanel /> },
];

/* ──────────────────────────────────────────────────────────────
   HOTSPOT CONFIG — 4 numbered overlays with tooltips
────────────────────────────────────────────────────────────── */
type Hotspot = {
  n: number;
  label: string;
  tip: string;
  top: string;
  right?: string;
  left?: string;
  bottom?: string;
  tabId: string; // which tab this hotspot is relevant to (show on this tab only)
};

const HOTSPOTS: Hotspot[] = [
  {
    n: 1,
    label: "AI categorization",
    tip: "Rules run first. AI only steps in for unknowns — always with a confidence score.",
    top: "12px",
    right: "12px",
    tabId: "categorize",
  },
  {
    n: 2,
    label: "Budget envelope",
    tip: "Every dollar has a job. Envelopes roll over intelligently so you stay on track.",
    top: "12px",
    right: "12px",
    tabId: "budget",
  },
  // Payment-action hotspot intentionally omitted.
  {
    n: 3,
    label: "Spending trends",
    tip: "Planned insights highlight spending changes and review opportunities.",
    top: "12px",
    right: "12px",
    tabId: "insights",
  },
];

function HotspotPin({ hs }: { hs: Hotspot }) {
  const [showTip, setShowTip] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowTip((s) => !s);
    }
    if (e.key === "Escape") setShowTip(false);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: hs.top,
        right: hs.right,
        left: hs.left,
        bottom: hs.bottom,
        zIndex: 10,
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-label={`Hotspot ${hs.n}: ${hs.label}. Press Enter for details.`}
        aria-expanded={showTip}
        aria-describedby={`hs-tip-${hs.n}`}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onFocus={() => setShowTip(true)}
        onBlur={() => setShowTip(false)}
        onKeyDown={onKey}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          color: "var(--accent)",
          fontSize: "0.625rem",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${hs.right !== undefined ? "11px" : hs.left !== undefined ? "-11px" : "0"}, ${hs.bottom !== undefined ? "11px" : hs.top !== undefined ? "-11px" : "0"})`,
          lineHeight: 1,
          padding: 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            background: "var(--bg-elev-2)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px var(--accent-glow), 0 0 0 4px var(--accent-subtle)",
          }}
        >
          {hs.n}
        </span>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            id={`hs-tip-${hs.n}`}
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "28px",
              right: 0,
              width: "200px",
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg-overlay)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              zIndex: 20,
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: "0 0 3px",
              }}
            >
              {hs.label}
            </p>
            <p
              style={{
                fontSize: "0.625rem",
                color: "var(--text-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {hs.tip}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURE PILLS ROW
────────────────────────────────────────────────────────────── */
const PILLS = [
  { label: "Manual entries", Icon: RefreshCw },
  { label: "AI suggestions planned", Icon: Sparkles },
  { label: "Custom budgets", Icon: PieChart },
  { label: "Spending summaries", Icon: TrendingUp },
] as const;

/* ──────────────────────────────────────────────────────────────
   DEMO SECTION — main export
────────────────────────────────────────────────────────────── */
export function DemoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const focusTabOnChangeRef = useRef(false);

  // Arrow key navigation across tabs
  const handleTabKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTabOnChangeRef.current = true;
      setActiveTab((t) => (t + 1) % TABS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTabOnChangeRef.current = true;
      setActiveTab((t) => (t - 1 + TABS.length) % TABS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTabOnChangeRef.current = true;
      setActiveTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTabOnChangeRef.current = true;
      setActiveTab(TABS.length - 1);
    }
  }, []);

  // Focus the selected tab when activeTab changes via keyboard
  useEffect(() => {
    if (!focusTabOnChangeRef.current) return;

    const el = tabListRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    el?.[activeTab]?.focus({ preventScroll: true });
    focusTabOnChangeRef.current = false;
  }, [activeTab]);

  // TABS is a non-empty const array; activeTab is bounded by [0, TABS.length-1] via clamp
  // biome-ignore lint/style/noNonNullAssertion: TABS[0] is guaranteed non-null (non-empty const array)
  const currentTab: Tab = TABS[activeTab] ?? TABS[0]!;
  const currentHotspot = HOTSPOTS.find((h) => h.tabId === currentTab.id);

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(167,139,250,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        {/* ── Section header ───────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: "0.875rem" }}
          >
            LIVE DEMO
          </motion.p>

          <motion.h2
            id="demo-heading"
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto 0.875rem" }}
          >
            Your expense picture, organized
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            style={{ margin: "0 auto" }}
          >
            Manual entries, planned uploads, and CSV imports in one spending view.
          </motion.p>
        </div>

        {/* ── Tab bar ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.45 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}
        >
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Dashboard sections"
            onKeyDown={handleTabKeyDown}
            style={{
              display: "flex",
              width: "min(100%, 25rem)",
              gap: "2px",
              padding: "4px",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-elev-2)",
              border: "1px solid var(--border)",
            }}
          >
            {TABS.map((tab, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-label={tab.label}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => {
                    focusTabOnChangeRef.current = false;
                    setActiveTab(i);
                  }}
                  type="button"
                  className="demo-dashboard-tab"
                  style={{
                    flex: "1 1 0",
                    minWidth: 0,
                    padding: "0.4375rem 0.25rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    border: "none",
                    cursor: "pointer",
                    transition: "all var(--dur-base) var(--ease-out)",
                    background: isActive ? "var(--bg-elev-1)" : "transparent",
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    boxShadow: isActive ? "var(--shadow-card)" : "none",
                    position: "relative",
                    minHeight: "44px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.id === "split" ? (
                    <>
                      <span className="demo-tab-label-full">{tab.label}</span>
                      <span className="demo-tab-label-compact">Notes</span>
                    </>
                  ) : (
                    tab.label
                  )}
                  {/* ── Enhancement 4: sliding underline bar via layoutId ── */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      layout
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        left: "0.75rem",
                        right: "0.75rem",
                        height: "2px",
                        borderRadius: "var(--radius-full)",
                        background: "var(--accent)",
                        boxShadow: "0 0 6px var(--accent-glow)",
                      }}
                      transition={{ duration: 0.28, ease: EASE_OUT }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Browser frame + tab panels ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="measure-section mx-auto"
          style={{ position: "relative" }}
        >
          <BrowserFrame>
            <div
              id={`panel-${currentTab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentTab.id}`}
              style={{ position: "relative", minHeight: "340px" }}
            >
              {/* Hotspot pin — per-tab */}
              {currentHotspot && <HotspotPin hs={currentHotspot} />}

              {/* Animated tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentTab.panel}
                </motion.div>
              </AnimatePresence>
            </div>
          </BrowserFrame>
        </motion.div>

        {/* ── Feature pills row ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.45 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {PILLS.map(({ label, Icon }) => (
            <div
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-elev-2)",
                border: "1px solid var(--border)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              <Icon size={13} style={{ color: "var(--text-muted)" }} aria-hidden="true" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* ── Disclaimer ───────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginTop: "1rem",
          }}
        >
          {DEMO.disclaimer}
        </motion.p>

        <style>{`
          .demo-dashboard-tab {
            font-size: 0.875rem;
          }
          .demo-tab-label-compact {
            display: none;
          }
          @media (max-width: 359px) {
            .demo-dashboard-tab {
              font-size: 0.75rem;
            }
            .demo-tab-label-full {
              display: none;
            }
            .demo-tab-label-compact {
              display: inline;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
