"use client";

import { EASE_OUT } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   STEP DATA
   Brief spec:
     1. Connect  → SVG bank icons → EXPOZOR "E" mark
     2. AI reads → raw transaction card → labeled card
     3. Budget   → envelope bar filling
     4. Ask      → chat bubble Q&A
────────────────────────────────────────────────────────────── */
type Step = {
  id: string;
  number: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    id: "add",
    number: "01",
    title: "Add your expenses",
    body: "Enter expenses manually today. Receipt upload and CSV import are planned for early access. No bank login needed.",
  },
  {
    id: "ai-reads",
    number: "02",
    title: "Review and organize",
    body: "Review and organize entries yourself. AI-assisted category suggestions are planned and will remain user-reviewed.",
  },
  {
    id: "understand",
    number: "03",
    title: "Understand your spending",
    body: "See spending by category, merchant, and month. Spot recurring charges and possible fees. Self-serve export is planned.",
  },
];

/* ──────────────────────────────────────────────────────────────
   RIGHT-SIDE INLINE VISUALS
   All pure CSS/SVG — no external images, no Lottie.
────────────────────────────────────────────────────────────── */

/** Step 1 — bank icons linked to EXPOZOR "E" mark */
function VisualConnect() {
  const shouldReduce = useReducedMotion();
  const sources = [
    { label: "Receipt", initial: "RX", color: "var(--decorative)" },
    { label: "CSV File", initial: "CSV", color: "#60A5FA" },
    { label: "Screenshot", initial: "IMG", color: "#A78BFA" },
    { label: "Manual Entry", initial: "ME", color: "#FB923C" },
  ] as const;

  /* x-coords matching the 4 lines in the SVG */
  const LINE_X = [30, 90, 170, 230] as const;

  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1.5rem 0",
      }}
    >
      {/* Source icons row */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {sources.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: EASE_OUT }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--bg-elev-2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.625rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              letterSpacing: "0.02em",
              flexShrink: 0,
            }}
          >
            {b.initial}
          </motion.div>
        ))}
      </div>

      {/* Animated connection lines (SVG) */}
      <svg viewBox="0 0 260 48" style={{ width: "100%", maxWidth: "260px" }} aria-hidden="true">
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--border-strong)" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Lines from each bank to centre */}
        {LINE_X.map((x, i) => (
          <motion.line
            key={x}
            x1={x}
            y1={2}
            x2={130}
            y2={46}
            stroke="url(#line-grad)"
            strokeWidth="1"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: EASE_OUT }}
          />
        ))}
        {/* ── Enhancement 5: travelling glow-dots — one per line ── */}
        {/* Each dot rides from the bank position (y=2) down to the E-node (y=46).
            Disabled for prefers-reduced-motion via shouldReduce guard. */}
        {!shouldReduce &&
          LINE_X.map((x, i) => (
            <motion.circle
              key={`dot-${x}`}
              /* Interpolate x from bank-x toward 130 as cy goes 2→46 */
              cx={x + (130 - x) * 0.5}
              cy={2}
              r="2.5"
              fill="var(--accent)"
              style={{ filter: "drop-shadow(0 0 3px var(--decorative))" }}
              animate={!shouldReduce ? { cy: [2, 46, 46] } : {}}
              transition={{
                delay: 0.8 + i * 0.22,
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.2,
                ease: "easeIn",
              }}
            />
          ))}
        {/* EXPOZOR node at bottom */}
        <circle
          cx="130"
          cy="46"
          r="14"
          fill="var(--bg-elev-2)"
          stroke="var(--border-accent)"
          strokeWidth="1.5"
        />
        <text
          x="130"
          y="50"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui"
        >
          E
        </text>
      </svg>

      {/* "Connected" badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.35, ease: EASE_OUT }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "var(--radius-full)",
          background: "var(--accent-subtle)",
          border: "1px solid var(--border-accent)",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)" }}>
          Manual entry ready - uploads planned
        </span>
      </motion.div>
    </div>
  );
}

/** Step 2 — raw transaction card → AI-labeled card */
function VisualAIReads() {
  return (
    <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Raw card */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.5, 0] }}
        transition={{
          duration: 2.4,
          repeat: Number.POSITIVE_INFINITY,
          times: [0, 0.6, 1],
          ease: "easeInOut",
        }}
        style={{
          padding: "12px 14px",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "var(--bg-muted)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: "8px",
              width: "60%",
              borderRadius: "4px",
              background: "var(--bg-muted)",
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              height: "6px",
              width: "40%",
              borderRadius: "4px",
              background: "var(--border)",
            }}
          />
        </div>
        <div
          style={{
            height: "10px",
            width: "50px",
            borderRadius: "4px",
            background: "var(--bg-muted)",
          }}
        />
      </motion.div>

      {/* AI scanning indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 4px" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        <span
          style={{
            fontSize: "0.625rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          AI categorizing
        </span>
        <motion.div
          style={{ display: "flex", gap: "3px" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--accent)",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </motion.div>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      {/* Labeled card */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 0, 1], y: [6, 6, 0] }}
        transition={{
          duration: 2.4,
          repeat: Number.POSITIVE_INFINITY,
          times: [0, 0.6, 1],
          ease: "easeInOut",
        }}
        style={{
          padding: "12px 14px",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 0 0 1px var(--border-accent)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "var(--positive-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            flexShrink: 0,
          }}
        >
          🛒
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Grocery Store
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
            <span
              style={{
                fontSize: "0.5625rem",
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-subtle)",
                color: "var(--accent)",
                border: "1px solid var(--border-accent)",
              }}
            >
              Groceries
            </span>
            <span style={{ fontSize: "0.5625rem", color: "var(--text-muted)" }}>
              high confidence
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          -$94.20
        </span>
      </motion.div>
    </div>
  );
}

/** Step 3 — envelope budget bar filling */
const ENVELOPES_DATA = [
  { label: "Food & Drink", spent: 340, total: 500, color: "var(--positive)", delay: 0 },
  { label: "Shopping", spent: 180, total: 300, color: "#A78BFA", delay: 0.1 },
  { label: "Transport", spent: 95, total: 150, color: "#60A5FA", delay: 0.18 },
  { label: "Entertainment", spent: 45, total: 60, color: "#FB923C", delay: 0.26 },
] as const;

function VisualBudget() {
  return (
    <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Month header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>
          Envelopes · May 2026
        </span>
        <span style={{ fontSize: "0.625rem", color: "var(--text-muted)" }}>14 days left</span>
      </div>

      {ENVELOPES_DATA.map((e) => {
        const pct = Math.round((e.spent / e.total) * 100);
        return (
          <div key={e.label} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}
              >
                {e.label}
              </span>
              <span
                style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}
              >
                ${e.spent}
                <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>
                  &nbsp;/ ${e.total}
                </span>
              </span>
            </div>
            {/* Track */}
            <div
              style={{
                height: "7px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-muted)",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{ height: "100%", borderRadius: "var(--radius-full)", background: e.color }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: e.delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}

      {/* Remaining callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderRadius: "var(--radius-sm)",
          background: "var(--accent-subtle)",
          border: "1px solid var(--border-accent)",
        }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)" }}>
          Remaining this month
        </span>
        <span
          style={{
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
        >
          $387.10
        </span>
      </motion.div>
    </div>
  );
}

/** Step 4 — AI chat Q&A bubble */
function VisualAsk() {
  return (
    <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* User question */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div
          style={{
            maxWidth: "75%",
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border)",
            fontSize: "0.8125rem",
            color: "var(--text-primary)",
            lineHeight: 1.5,
          }}
        >
          What did I spend on travel in April?
        </div>
      </motion.div>

      {/* Typing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.5, duration: 1.4, times: [0, 0.2, 0.8, 1] }}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border-accent)",
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* AI answer */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <div
          style={{
            maxWidth: "85%",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border-accent)",
            lineHeight: 1.6,
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-primary)",
              margin: "0 0 8px",
              fontWeight: 600,
            }}
          >
            ✈️ $340 on travel in April
          </p>
          {/* Mini breakdown */}
          {[
            { label: "Flights", amount: "$220" },
            { label: "Hotels", amount: "$85" },
            { label: "Transfers", amount: "$35" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}
            >
              <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                {item.label}
              </span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.amount}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: "8px",
              paddingTop: "8px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>vs March</span>
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--positive)" }}>
              ↓ $60 less
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const VISUALS: Record<string, React.ReactNode> = {
  connect: <VisualConnect />,
  "ai-reads": <VisualAIReads />,
  budget: <VisualBudget />,
  ask: <VisualAsk />,
};

/* ──────────────────────────────────────────────────────────────
   STEP ITEM — left copy column
   Highlights when its sentinel is in viewport.
────────────────────────────────────────────────────────────── */
function StepItem({
  step,
  isActive,
  sentinelRef,
}: {
  step: Step;
  isActive: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div style={{ position: "relative" }}>
      {/* IntersectionObserver sentinel — invisible 1px div at mid-card */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          height: "1px",
          width: "1px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1.75rem",
          borderRadius: "var(--radius-lg)",
          background: isActive ? "var(--bg-elev-2)" : "transparent",
          border: `1px solid ${isActive ? "var(--border-strong)" : "transparent"}`,
          transition: "background 300ms ease-out, border-color 300ms ease-out",
          cursor: "default",
        }}
      >
        {/* Step number — mint */}
        <span
          aria-hidden="true"
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: isActive ? "var(--accent)" : "var(--text-muted)",
            transition: "color 300ms ease-out",
          }}
        >
          {step.number}
        </span>

        <h3
          style={{
            fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
            margin: 0,
            lineHeight: 1.25,
            transition: "color 300ms ease-out",
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontSize: "0.9375rem",
            color: isActive ? "var(--text-secondary)" : "var(--text-muted)",
            lineHeight: 1.65,
            margin: 0,
            transition: "color 300ms ease-out",
            maxWidth: "38ch",
          }}
        >
          {step.body}
        </p>

        {/* Active indicator line */}
        {isActive && (
          <motion.div
            layoutId="step-line"
            style={{
              position: "absolute",
              left: 0,
              top: "1.75rem",
              bottom: "1.75rem",
              width: "2px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent-glow)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   VISUAL PANEL — right sticky panel, cross-fades between steps
────────────────────────────────────────────────────────────── */
function VisualPanel({ activeId }: { activeId: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "sticky",
        top: "calc(var(--nav-height, 72px) + 2rem)",
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-elev-1)",
        border: "1px solid var(--border)",
        padding: "1.75rem",
        minHeight: "340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Cross-fade between visuals */}
      {STEPS.map((step) => (
        <div
          key={step.id}
          style={{
            position: step.id === STEPS[0]?.id ? "relative" : "absolute",
            inset: step.id === STEPS[0]?.id ? undefined : "1.75rem",
            opacity: activeId === step.id ? 1 : 0,
            transform: activeId === step.id ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 350ms ease-out, transform 350ms ease-out",
            pointerEvents: activeId === step.id ? "auto" : "none",
          }}
        >
          {VISUALS[step.id]}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   HOW IT WORKS SECTION — main export
────────────────────────────────────────────────────────────── */
export function HowItWorksSection() {
  const [activeId, setActiveId] = useState(STEPS[0]?.id ?? "connect");
  // One ref per step sentinel
  const sentinelRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
    STEPS.map(() => ({ current: null })),
  );
  // Stable fallback sentinel ref (used if index is out of bounds — should never happen)
  const fallbackSentinelRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver — fires when each step's sentinel crosses viewport mid-point
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sentinelRefs.current.forEach((ref, i) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setActiveId(STEPS[i]?.id ?? STEPS[0]?.id ?? "connect");
          }
        },
        {
          // Trigger when sentinel crosses 50% of viewport height
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        },
      );
      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(167,139,250,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        {/* ── Section header ───────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: "0.875rem" }}
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2
            id="hiw-heading"
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto 0.875rem" }}
          >
            From entry to insight, without bank links
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            style={{ margin: "0 auto" }}
          >
            Start with manual entry, then use planned upload and import workflows as they launch.
          </motion.p>
        </div>

        {/* ── Two-column sticky layout ─────────────────────── */}
        <div className="hiw-layout">
          {/* LEFT — step list */}
          <ul
            aria-label="How EXPOZOR works — 4 steps"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {STEPS.map((step, i) => (
              <li key={step.id} style={{ listStyle: "none" }}>
                <StepItem
                  step={step}
                  isActive={activeId === step.id}
                  sentinelRef={sentinelRefs.current[i] ?? fallbackSentinelRef}
                />
              </li>
            ))}
          </ul>

          {/* RIGHT — sticky visual panel (hidden on mobile, shown on lg+) */}
          <div className="hiw-visual-col">
            <VisualPanel activeId={activeId} />
          </div>
        </div>

        {/* ── Bottom CTA nudge ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: "4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.a
            href="/#waitlist"
            whileHover={{ scale: 1.03, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.6875rem 1.75rem",
              borderRadius: "var(--radius-md)",
              background: "var(--accent)",
              color: "var(--text-inverse)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "background var(--dur-base) var(--ease-out)",
            }}
          >
            Join early access
          </motion.a>
        </motion.div>
      </div>

      {/* Scoped responsive layout styles */}
      <style>{`
        /* Mobile: single column — visual panel hidden */
        .hiw-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .hiw-visual-col { display: none; }

        /* Desktop (≥1024px): sticky 2-col */
        @media (min-width: 1024px) {
          .hiw-layout {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            gap: 3rem;
          }
          .hiw-visual-col { display: block; }
        }

        /* Suppress crossfade animation for reduced-motion users
           (panel snaps to active state immediately) */
        @media (prefers-reduced-motion: reduce) {
          .hiw-visual-col [style*="transition"] {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
