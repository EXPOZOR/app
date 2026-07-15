import { FeaturesBentoCard } from "@/components/sections/features-bento-card";
import { MotionDiv, MotionH2, MotionP, MotionSpan } from "@/components/ui/motion-primitives";
import {
  Brain,
  Briefcase,
  Building2,
  Camera,
  Car,
  Coffee,
  Film,
  PieChart,
  Radio,
  ShoppingCart,
} from "lucide-react";
import { createElement } from "react";

const motion = {
  div: MotionDiv,
  h2: MotionH2,
  p: MotionP,
  span: MotionSpan,
};

/* ──────────────────────────────────────────────────────────────
   SPOTLIGHT BENTO CARD
   Cursor-aware radial spotlight: sets --x/--y on the card via
   direct DOM style.setProperty() — zero React re-renders on
   mousemove. Hover lift via direct transform mutation.
────────────────────────────────────────────────────────────── */

/* ── Enhancement 6: one-shot border-bloom on viewport entry ──────── */
/* The card enters with a transient accent glow that fades to none.
   Uses boxShadow keyframes inside animate variants so it only fires
   once (viewport once: true) and is suppressed by the global
   prefers-reduced-motion rule in globals.css. */
function BentoCard({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <FeaturesBentoCard delay={delay} className={className} style={style}>
      {/* Cursor spotlight — 200px soft white radial gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.055) 0%, transparent 100%)",
          opacity: 0,
          transition: "opacity 200ms ease-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Content above spotlight */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {children}
      </div>
    </FeaturesBentoCard>
  );
}

/* ──────────────────────────────────────────────────────────────
   TILE HEADER (icon + title + description)
   Icon: 24px Lucide, neutral white — NOT mint.
────────────────────────────────────────────────────────────── */
function TileHeader({
  Icon,
  title,
  description,
  status,
}: {
  Icon: React.ComponentType<{ size?: number; "aria-hidden"?: "true" }>;
  title: string;
  description: string;
  status: "First release" | "Roadmap";
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {/* Icon — neutral white square */}
      <div
        aria-hidden="true"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "var(--radius-sm)",
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-primary)" /* neutral white, NOT mint */,
          marginBottom: "1rem",
          flexShrink: 0,
        }}
      >
        <Icon size={18} aria-hidden="true" />
      </div>
      <p
        style={{
          margin: "0 0 0.5rem",
          color: status === "First release" ? "var(--positive)" : "var(--decorative)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.07em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {status}
      </p>
      <h3
        style={{
          fontSize: "clamp(1.0625rem, 2vw, 1.1875rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          margin: "0 0 0.375rem",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          lineHeight: 1.6,
          margin: 0,
          maxWidth: "36ch",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TILE 1 — AI Categorization (hero, col-span-2)
   Tall inline demo: transaction rows with animating category labels.
────────────────────────────────────────────────────────────── */
const AI_ROWS = [
  {
    Icon: Briefcase,
    merchant: "Freelance Payment",
    amount: "+$4,200.00",
    cat: "Income",
    color: "#34D399",
    pos: true,
  },
  {
    Icon: ShoppingCart,
    merchant: "Grocery Store",
    amount: "-$94.20",
    cat: "Groceries",
    color: "var(--positive)",
    pos: false,
  },
  {
    Icon: Coffee,
    merchant: "Coffee Shop",
    amount: "-$6.50",
    cat: "Coffee",
    color: "var(--positive)",
    pos: false,
  },
  {
    Icon: Car,
    merchant: "Taxi Ride",
    amount: "-$18.40",
    cat: "Transport",
    color: "#60A5FA",
    pos: false,
  },
  {
    Icon: Film,
    merchant: "Streaming Service",
    amount: "-$15.99",
    cat: "Entertainment",
    color: "#A78BFA",
    pos: false,
  },
] as const;

function AICatDemo() {
  return (
    <div aria-hidden="true" style={{ marginTop: "auto" }}>
      {/* Mini panel chrome */}
      <div
        style={{
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--bg-elev-2)",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-overlay)",
          }}
        >
          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-primary)" }}>
            Transactions
          </span>
          <span
            style={{
              fontSize: "0.5625rem",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: "var(--radius-full)",
              background: "var(--positive-subtle)",
              color: "var(--positive)",
              border: "1px solid color-mix(in oklch, var(--positive) 35%, transparent)",
            }}
          >
            AI-assisted
          </span>
        </div>

        {/* Rows */}
        {AI_ROWS.map((r, i) => (
          <motion.div
            key={r.merchant}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 12px",
              borderBottom: i < AI_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "6px",
                background: `${r.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                flexShrink: 0,
              }}
            >
              {createElement(r.Icon, { size: 13, "aria-hidden": true, style: { color: r.color } })}
            </div>
            {/* Merchant */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.merchant}
              </p>
            </div>
            {/* Amount + animated category */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "2px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  color: r.pos ? "var(--positive)" : "var(--text-primary)",
                }}
              >
                {r.amount}
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8, y: 3 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "0.5rem",
                  fontWeight: 600,
                  padding: "1px 5px",
                  borderRadius: "var(--radius-full)",
                  background: `${r.color}18`,
                  color: r.color,
                  border: `1px solid ${r.color}30`,
                }}
              >
                {r.cat}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TILE 2 — Snap & done (medium, col-span-1)
   CSS receipt with animated scan line.
────────────────────────────────────────────────────────────── */
function SnapDemo() {
  return (
    <div
      aria-hidden="true"
      style={{ marginTop: "auto", display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          position: "relative",
          width: "120px",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden",
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
        }}
      >
        {/* Receipt lines */}
        {[80, 55, 70, 40, 60].map((w) => (
          <div
            key={`receipt-line-${w}`}
            style={{
              height: "5px",
              borderRadius: "var(--radius-full)",
              background: w === 60 ? "var(--accent-subtle)" : "var(--bg-muted)",
              width: `${w}%`,
              border: w === 60 ? "1px solid var(--border-accent)" : "none",
            }}
          />
        ))}
        {/* Total line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border)",
            paddingTop: "6px",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              height: "5px",
              width: "30%",
              borderRadius: "3px",
              background: "var(--bg-muted)",
            }}
          />
          <div
            style={{
              height: "5px",
              width: "25%",
              borderRadius: "3px",
              background: "var(--accent-subtle)",
            }}
          />
        </div>
        {/* AI result badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "3px 0",
            marginTop: "2px",
            borderRadius: "var(--radius-full)",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border-accent)",
          }}
        >
          <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "var(--positive)" }}>
            ✓ Categorized
          </span>
        </motion.div>

        {/* Static scan marker: context without perpetual decorative movement. */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, var(--decorative) 50%, transparent 100%)",
            opacity: 0.7,
            boxShadow: "0 0 8px var(--accent-glow)",
            top: "55%",
          }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TILE 3 — CSV Import (small, col-span-1)
   Shows CSV import rows with mapping/confirm UI.
   CSV tile avoids bank connection claims.
────────────────────────────────────────────────────────────── */
const CSV_ROWS = [
  { label: "Date", value: "2026-06-01", mapped: true },
  { label: "Merchant", value: "Coffee Shop", mapped: true },
  { label: "Amount", value: "-$6.50", mapped: true },
  { label: "Category", value: "Auto-detect", mapped: false },
] as const;

function CsvImportDemo() {
  return (
    <div
      aria-hidden="true"
      style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <div
        style={{
          fontSize: "0.5625rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "2px",
        }}
      >
        Column mapping
      </div>
      {CSV_ROWS.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.07 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 8px",
            borderRadius: "var(--radius-sm)",
            background: r.mapped ? "var(--bg-elev-2)" : "rgba(251,191,36,0.06)",
            border: `1px solid ${r.mapped ? "var(--border)" : "rgba(251,191,36,0.2)"}`,
          }}
        >
          <span
            style={{
              fontSize: "0.5625rem",
              color: "var(--text-muted)",
              width: "44px",
              flexShrink: 0,
            }}
          >
            {r.label}
          </span>
          <span
            style={{
              flex: 1,
              fontSize: "0.5625rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {r.value}
          </span>
          <span
            style={{
              fontSize: "0.4375rem",
              fontWeight: 600,
              padding: "1px 4px",
              borderRadius: "var(--radius-full)",
              background: r.mapped ? "var(--positive-subtle)" : "rgba(251,191,36,0.12)",
              color: r.mapped ? "var(--positive)" : "#FBBF24",
            }}
          >
            {r.mapped ? "✓" : "?"}
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{
          marginTop: "4px",
          padding: "5px 8px",
          textAlign: "center",
          borderRadius: "var(--radius-sm)",
          background: "var(--accent-subtle)",
          border: "1px solid var(--border-accent)",
          fontSize: "0.5rem",
          fontWeight: 700,
          color: "var(--decorative)",
        }}
      >
        Import 124 rows →
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TILE 4 — Envelope budgets (small, col-span-1)
   Three animated progress bars.
────────────────────────────────────────────────────────────── */
const ENVELOPES = [
  { label: "Food & Drink", spent: 340, total: 500, color: "var(--positive)" },
  { label: "Transport", spent: 95, total: 150, color: "#60A5FA" },
  { label: "Entertainment", spent: 45, total: 60, color: "#A78BFA" },
] as const;

function BudgetsDemo() {
  return (
    <div
      aria-hidden="true"
      style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {ENVELOPES.map((e, i) => {
        const pct = Math.round((e.spent / e.total) * 100);
        return (
          <div key={e.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.625rem", color: "var(--text-muted)" }}>{e.label}</span>
              <span
                style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--text-secondary)" }}
              >
                ${e.spent}
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/${e.total}</span>
              </span>
            </div>
            <div
              style={{
                height: "5px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-muted)",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{ height: "100%", borderRadius: "var(--radius-full)", background: e.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TILE 5 — Subscription radar (medium, col-span-1)
   Subscription list with upcoming/alert badges.
────────────────────────────────────────────────────────────── */
const SUBS = [
  { name: "Design App", amount: "$54.99", days: 1, status: "alert" },
  { name: "Streaming Plan", amount: "$15.99", days: 3, status: "upcoming" },
  { name: "Music Service", amount: "$9.99", days: 14, status: "ok" },
  { name: "Cloud Storage", amount: "$2.99", days: 22, status: "ok" },
] as const;

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  alert: { bg: "rgba(239,68,68,0.12)", color: "#F87171", label: "1 day" },
  upcoming: { bg: "rgba(251,191,36,0.12)", color: "#FBBF24", label: "3 days" },
  ok: { bg: "rgba(71,85,105,0.2)", color: "var(--text-muted)", label: "" },
};

function SubRadarDemo() {
  return (
    <div
      aria-hidden="true"
      style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "5px" }}
    >
      {SUBS.map((s, i) => {
        const st: { bg: string; color: string; label: string } = STATUS_STYLES[s.status] ?? {
          bg: "transparent",
          color: "var(--text-muted)",
          label: "",
        };
        return (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              background: s.status === "alert" ? "rgba(239,68,68,0.06)" : "var(--bg-elev-2)",
              border: `1px solid ${s.status === "alert" ? "rgba(239,68,68,0.2)" : "var(--border)"}`,
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {s.name}
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--text-secondary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.amount}
            </span>
            {s.status !== "ok" && (
              <span
                style={{
                  fontSize: "0.5rem",
                  fontWeight: 600,
                  padding: "1px 5px",
                  borderRadius: "var(--radius-full)",
                  background: st.bg,
                  color: st.color,
                }}
              >
                {st.label}
              </span>
            )}
          </motion.div>
        );
      })}
      <p
        style={{
          fontSize: "0.5625rem",
          color: "var(--text-muted)",
          margin: "4px 0 0",
          textAlign: "right",
        }}
      >
        $83.96/mo tracked
      </p>
    </div>
  );
}

// MarqueeTicker removed — full-width bank marquee tile displayed real brand names (Plaid, Visa, Mastercard, etc.)

/* ──────────────────────────────────────────────────────────────
   FEATURES SECTION — main export
────────────────────────────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="container-site">
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
            FEATURES
          </motion.p>
          <motion.h2
            id="features-heading"
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto 0.875rem" }}
          >
            Understand your spending, without giving up control
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            style={{ margin: "0 auto" }}
          >
            Manual entry comes first. The cards below separate the first release from the roadmap.
          </motion.p>
        </div>

        {/* ── Bento grid ───────────────────────────────────── */}
        <div className="bento-grid">
          {/* ① Hero tile — AI-assisted categorization (col-span-2, row-1) */}
          <BentoCard delay={0} className="bento-hero" style={{ minHeight: "320px" }}>
            <TileHeader
              Icon={Brain}
              status="Roadmap"
              title="AI-assisted categorization"
              description="Suggestions will use merchant and amount details. You will review and confirm each one before relying on it."
            />
            <AICatDemo />
          </BentoCard>

          {/* ② Medium tile — Receipt upload (col-3, row-1) */}
          <BentoCard delay={0.06} className="bento-medium-right" style={{ minHeight: "320px" }}>
            <TileHeader
              Icon={Camera}
              status="Roadmap"
              title="Receipt and screenshot upload"
              description="When upload becomes available, you will review extracted details before saving."
            />
            <SnapDemo />
          </BentoCard>

          {/* ③ Small tile — CSV import (col-1, row-2) */}
          {/* CSV tile avoids bank connection claims. */}
          <BentoCard delay={0.1} className="bento-small">
            <TileHeader
              Icon={Building2}
              status="Roadmap"
              title="CSV import"
              description="Choose a CSV file, map its columns, preview the rows, and confirm the import."
            />
            <CsvImportDemo />
          </BentoCard>

          {/* ④ Small tile — Monthly summaries (col-2, row-2) */}
          <BentoCard delay={0.14} className="bento-small">
            <TileHeader
              Icon={PieChart}
              status="First release"
              title="Monthly summaries"
              description="See total spent, top categories, and top merchants. Spot small charges that add up."
            />
            <BudgetsDemo />
          </BentoCard>

          {/* ⑤ Medium tile — Recurring expense detection (col-3, row-2) */}
          <BentoCard delay={0.18} className="bento-medium-right">
            <TileHeader
              Icon={Radio}
              status="Roadmap"
              title="Recurring expense detection"
              description="Detection will highlight monthly charges such as subscriptions, memberships, and services you may have forgotten."
            />
            <SubRadarDemo />
          </BentoCard>

          {/* Full-width bank marquee tile removed — displayed real brand names (Plaid, Visa, Mastercard, etc.) */}
        </div>
      </div>
    </section>
  );
}
