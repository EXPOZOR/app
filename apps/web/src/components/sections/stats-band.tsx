"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   STATS DATA
   ⚠ Pending Confirmation: these numbers have not been verified
   by the user. See PR description "Pending Confirmation" section.
   Safe defaults are used — update once confirmed.
────────────────────────────────────────────────────────────── */
type Stat = {
  /** Raw numeric target for the count-up animation */
  target: number;
  /**
   * Scale factor applied before display.
   * e.g. store 24 (integer), divide by 10 to display "2.4"
   */
  scale: number;
  prefix: string;
  suffix: string;
  /** How many decimal places to show in the formatted output */
  decimals: number;
  label: string;
  /** Full accessible label read by screen readers (skips the animation) */
  ariaLabel: string;
};

const STATS: Stat[] = [
  {
    target: 3247,
    scale: 1,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "On the waitlist",
    ariaLabel: "3,247 plus people on the waitlist",
  },
  {
    target: 24,        // animated 0→24, displayed as 0.0→2.4
    scale: 10,
    prefix: "$",
    suffix: "M+",
    decimals: 1,
    label: "Tracked across pilot users",
    ariaLabel: "2.4 million dollars tracked across pilot users",
  },
  {
    target: 48,        // animated 0→48, displayed as 0.0→4.8
    scale: 10,
    prefix: "",
    suffix: " ★",
    decimals: 1,
    label: "Pilot satisfaction",
    ariaLabel: "4.8 star pilot satisfaction rating",
  },
];

/* ──────────────────────────────────────────────────────────────
   HOOK: useCountUp
   Uses IntersectionObserver to trigger once, then requestAnimationFrame
   for a ~1200ms ease-out count from 0 → target.
   Respects prefers-reduced-motion: skips animation, shows final value.
────────────────────────────────────────────────────────────── */
function useCountUp(
  target: number,
  durationMs: number,
  triggered: boolean,
  reduceMotion: boolean,
): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;

    // Skip animation immediately if user prefers reduced motion
    if (reduceMotion) {
      setCount(target);
      return;
    }

    let startTs: number | null = null;

    function tick(ts: number) {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / durationMs, 1);
      // cubic ease-out: fast start, smooth finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, target, durationMs, reduceMotion]);

  return count;
}

/* ──────────────────────────────────────────────────────────────
   STAT ITEM
────────────────────────────────────────────────────────────── */
function StatItem({
  stat,
  triggered,
  reduceMotion,
}: {
  stat: Stat;
  triggered: boolean;
  reduceMotion: boolean;
}) {
  const raw = useCountUp(stat.target, 1200, triggered, reduceMotion);
  const displayValue = (raw / stat.scale).toFixed(stat.decimals);
  const done = raw === stat.target && triggered;

  // Format with thousand separators only when scale === 1 (integer stats)
  const formatted =
    stat.scale === 1
      ? Number(displayValue).toLocaleString("en-US")
      : displayValue;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        padding: "0 2rem",
      }}
    >
      {/* ── Enhancement 9: scale pop on count-up completion ──
          Fires once when `done` flips true (raw === target).
          Scale is paint-only — no layout triggered. */}
      <motion.p
        aria-hidden="true"         /* screen reader reads ariaLabel instead */
        animate={
          done && !reduceMotion
            ? { scale: [1, 1.08, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "clamp(2.5rem, 5vw, 3rem)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",  /* neutral white */
          lineHeight: 1,
          margin: 0,
          fontVariantNumeric: "tabular-nums",
          display: "inline-block",      /* scale needs a block context */
        }}
      >
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </motion.p>

      {/* Label — 13px muted */}
      <p
        style={{
          fontSize: "0.8125rem",   /* 13px */
          color: "var(--text-muted)",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.4,
          fontWeight: 400,
        }}
      >
        {stat.label}
      </p>

      {/* Screen-reader-only full label */}
      <span className="sr-only">{stat.ariaLabel}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   VERTICAL DIVIDER — thin, fades top+bottom
────────────────────────────────────────────────────────────── */
function VertDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "1px",
        alignSelf: "stretch",
        background:
          "linear-gradient(to bottom, transparent 0%, var(--border) 20%, var(--border) 80%, transparent 100%)",
        flexShrink: 0,
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────
   STATS BAND SECTION
────────────────────────────────────────────────────────────── */
export function StatsBand() {
  const bandRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  // Detect prefers-reduced-motion once on mount
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // IntersectionObserver — fires once when band enters viewport
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bandRef}
      aria-label="EXPOZOR by the numbers"
      style={{
        background: "var(--bg-elev-1)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "64px 0",
      }}
    >
      <div className="container-site">
        {/* Desktop: 3-column with dividers | Mobile: 1-column */}
        <div
          style={{
            display: "grid",
            gap: "2.5rem",
          }}
          /* Responsive grid via inline media query below */
          className="stats-grid"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "contents",
              }}
            >
              <StatItem
                stat={stat}
                triggered={triggered}
                reduceMotion={reduceMotion}
              />
              {/* Divider between items (desktop only, hidden on mobile via CSS) */}
              {i < STATS.length - 1 && (
                <VertDivider />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scoped responsive styles — avoids adding to globals for a single component */}
      <style>{`
        .stats-grid {
          grid-template-columns: 1fr;
          row-gap: 2.5rem;
        }

        @media (min-width: 640px) {
          .stats-grid {
            /* 3 stat cols + 2 divider cols */
            grid-template-columns: 1fr auto 1fr auto 1fr;
            align-items: center;
            row-gap: 0;
            column-gap: 0;
          }
        }
      `}</style>
    </section>
  );
}
