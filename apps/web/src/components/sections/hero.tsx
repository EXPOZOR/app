"use client";

import { joinWaitlist } from "@/app/actions/waitlist";
import { HERO } from "@/content/landing";
import { DUR, EASE_OUT } from "@/lib/motion";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Play } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

/* ──────────────────────────────────────────────────────────────
   TRANSACTION DATA — used in the UI cycle mockup
────────────────────────────────────────────────────────────── */
const TRANSACTIONS = [
  {
    id: "t1",
    merchant: "Coffee Shop",
    amount: "-$6.50",
    date: "Today, 9:12 AM",
    raw: "Coffee purchase",
    category: "☕ Coffee",
    color: "var(--positive)",
  },
  {
    id: "t2",
    merchant: "Taxi Ride",
    amount: "-$18.40",
    date: "Today, 8:45 AM",
    raw: "Transport expense",
    category: "🚗 Transport",
    color: "#A78BFA",
  },
  {
    id: "t3",
    merchant: "Grocery Store",
    amount: "-$94.20",
    date: "Yesterday",
    raw: "Grocery purchase",
    category: "🛒 Groceries",
    color: "#34D399",
  },
  {
    id: "t4",
    merchant: "Streaming Service",
    amount: "-$15.99",
    date: "May 27",
    raw: "Monthly subscription",
    category: "🎬 Entertainment",
    color: "#60A5FA",
  },
] as const;

/* ──────────────────────────────────────────────────────────────
   FRAMER MOTION UI CYCLE
   State 0 → raw list  |  State 1 → AI labels in  |  State 2 → split pill
   Cycles every 5 s (skips animation when prefers-reduced-motion)
────────────────────────────────────────────────────────────── */
function UICycle() {
  // Two-phase cycle only: 0 = raw list, 1 = AI-categorized
  // Payment-style phase intentionally omitted.
  const [phase, setPhase] = useState<0 | 1>(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return; // stay on phase 0, no cycling
    const id = setInterval(() => {
      setPhase((p) => ((p + 1) % 2) as 0 | 1);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldReduce]);

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        background: "var(--bg-elev-2)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        fontSize: "1rem",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.875em 1.125em",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-elev-1)",
        }}
      >
        <span
          style={{
            fontSize: "0.8125em",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {phase === 0 && "Recent transactions"}
          {phase === 1 && "AI categorizing…"}
        </span>
        {/* Phase indicator pills */}
        <div style={{ display: "flex", gap: "4px" }}>
          {([0, 1] as const).map((p) => (
            <div
              key={p}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: p === phase ? "var(--decorative)" : "var(--border-strong)",
                transition: "background 300ms",
              }}
            />
          ))}
        </div>
      </div>

      {/* Transaction rows */}
      <div style={{ padding: "0.5em 0" }}>
        {TRANSACTIONS.map((tx, i) => (
          <div
            key={tx.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75em",
              padding: "0.6em 1.125em",
              borderBottom:
                i < TRANSACTIONS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            {/* Icon / avatar */}
            <div
              style={{
                width: "2.25em",
                height: "2.25em",
                borderRadius: "var(--radius-sm)",
                background: `${tx.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1em",
                flexShrink: 0,
                border: `1px solid ${tx.color}30`,
              }}
            >
              {/* Phase 0: neutral icon; Phase 1+: emoji from category */}
              <span style={{ fontSize: "0.875em" }}>
                {phase === 0 ? ["☁", "○", "▸", "◆"][i] : tx.category.split(" ")[0]}
              </span>
            </div>

            {/* Merchant + description */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.8125em",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  letterSpacing: "-0.01em",
                }}
              >
                {tx.merchant}
              </p>
              <p
                style={{
                  fontSize: "0.6875em",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                {phase === 0 ? tx.raw : tx.date}
              </p>
            </div>

            {/* Right: category pill (phases 1-2) + amount */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "3px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "0.8125em",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                {tx.amount}
              </span>

              {/* AI category label — animates in on phase 1 */}
              <AnimatePresence>
                {phase >= 1 && i !== 0 && (
                  <motion.span
                    key={`cat-${tx.id}`}
                    initial={{ opacity: 0, scale: 0.85, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{
                      delay: i * 0.12,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      fontSize: "0.625em",
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: "var(--radius-full)",
                      background: `${tx.color}18`,
                      color: tx.color,
                      border: `1px solid ${tx.color}35`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tx.category.split(" ").slice(1).join(" ")}
                  </motion.span>
                )}
                {/* First row gets special treatment on phase 1 (mint glow) */}
                {phase >= 1 && i === 0 && (
                  <motion.span
                    key="cat-t1"
                    initial={{ opacity: 0, scale: 0.85, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontSize: "0.625em",
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--positive-subtle)",
                      color: "var(--positive)",
                      border: "1px solid color-mix(in oklch, var(--positive) 35%, transparent)",
                      whiteSpace: "nowrap",
                      boxShadow: "0 0 8px var(--accent-glow)",
                    }}
                  >
                    Coffee
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Shared-action pill intentionally omitted. */}
            </div>
          </div>
        ))}
      </div>

      {/* Phase 1 bottom bar — AI confidence */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="ai-bar"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              padding: "0.625em 1.125em",
              borderTop: "1px solid var(--border)",
              background: "var(--bg-elev-1)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--positive)",
                animation: "pulse-dot 1.6s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.6875em",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              AI reviewed 4 transactions
            </span>
          </motion.div>
        )}
        {/* Payment-style preview intentionally omitted. */}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   GLASSMORPHISM ANNOTATION CARDS (desktop only)
────────────────────────────────────────────────────────────── */
type AnnotationCard = {
  id: string;
  content: string;
  delay: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  floatKeyframe: string;
  floatDelay: string;
};

const ANNOTATION_CARDS: AnnotationCard[] = [
  {
    id: "ann-spending",
    content: "📊 Monthly spending: $624.40",
    delay: 0.6,
    top: "-28px",
    left: "-24px",
    floatKeyframe: "float-y",
    floatDelay: "0s",
  },
  {
    id: "ann-ai",
    content: "🤖 AI categorized 134 transactions",
    delay: 0.75,
    bottom: "40px",
    right: "-28px",
    floatKeyframe: "float-y-slow",
    floatDelay: "1.8s",
  },
  {
    id: "ann-savings",
    content: "📊 Savings rate: 24%",
    delay: 0.9,
    bottom: "-20px",
    left: "-20px",
    floatKeyframe: "float-y",
    floatDelay: "0.9s",
  },
];

function AnnotCard({ card }: { card: AnnotationCard }) {
  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: card.delay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "absolute",
        top: card.top,
        bottom: card.bottom,
        left: card.left,
        right: card.right,
        animation: `${card.floatKeyframe} 6s ease-in-out infinite`,
        animationDelay: card.floatDelay,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderRadius: "var(--radius-md)",
          background: "rgba(10,10,11,0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--decorative)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          whiteSpace: "nowrap",
        }}
      >
        {card.content}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ANIMATED HERO BADGE — shimmer sweep every 4 s
────────────────────────────────────────────────────────────── */
function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        aria-label="AI-Powered Finance — private beta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          padding: "6px 14px",
          borderRadius: "var(--radius-full)",
          fontSize: "0.8125rem",
          fontWeight: 600,
          letterSpacing: "0.01em",
          border: "1px solid color-mix(in oklch, var(--decorative) 35%, transparent)",
          color: "var(--decorative)",
          background: `
            linear-gradient(
              110deg,
              var(--decorative-subtle) 0%,
              color-mix(in oklch, var(--decorative) 30%, transparent) 45%,
              var(--decorative-subtle) 60%
            )
          `,
          backgroundSize: "200% auto",
          /* shimmer: animate background-position. Disabled by globals prefers-reduced-motion */
          animation: "shimmer 4s linear infinite",
          position: "relative",
          cursor: "default",
        }}
      >
        ✦ AI-Powered Finance
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   WAITLIST FORM (hero)
────────────────────────────────────────────────────────────── */
function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // Magnetic CTA button
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 280, damping: 18 });
  const springY = useSpring(my, { stiffness: 280, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.22);
    my.set((e.clientY - r.top - r.height / 2) * 0.22);
  }
  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("source", "hero");
    fd.set("locale", "en");
    startTransition(async () => {
      const res = await joinWaitlist(fd);
      if (res.success) {
        setStatus("success");
        setMessage(res.message);
        if (inputRef.current) inputRef.current.value = "";
      } else {
        setStatus("error");
        setMessage(res.error);
      }
    });
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "1rem 1.25rem",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-accent)",
          background: "var(--accent-subtle)",
        }}
      >
        <CheckCircle2
          size={20}
          style={{ color: "var(--accent)", flexShrink: 0 }}
          aria-hidden="true"
        />
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--text-primary)",
            fontWeight: 500,
            margin: 0,
          }}
        >
          {message}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Waitlist signup form"
      style={{ width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Input row */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" />
          {/* Email input */}
          <div style={{ flex: "1 1 220px", position: "relative" }}>
            <label htmlFor="hero-email" className="sr-only">
              Email address
            </label>
            <input
              ref={inputRef}
              id="hero-email"
              name="email"
              type="email"
              required
              placeholder={HERO.inputPlaceholder}
              autoComplete="email"
              disabled={isPending}
              style={{
                width: "100%",
                height: "52px",
                padding: "0 1rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9375rem",
                background: "var(--bg-elev-2)",
                border: `1px solid ${status === "error" ? "var(--danger)" : "var(--border-strong)"}`,
                color: "var(--text-primary)",
                transition: "border-color var(--dur-base), box-shadow var(--dur-base)",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  status === "error" ? "var(--danger)" : "var(--border-accent)";
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 0 0 3px var(--accent-subtle)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  status === "error" ? "var(--danger)" : "var(--border-strong)";
                (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
              }}
            />
          </div>

          {/* ── Enhancement 2: Shimmer-sweep CTA ── */}
          {/* Magnetic spring (x/y) already wired above. We add a
              shimmer-sweep overlay that animates on hover entry
              using a gradient div whose opacity springs in/out. */}
          <motion.button
            type="submit"
            disabled={isPending}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              x: springX,
              y: springY,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "0 1.75rem",
              height: "52px",
              borderRadius: "var(--radius-md)",
              background: "var(--accent)",
              color: "var(--text-inverse)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              opacity: isPending ? 0.65 : 1,
              transition: "background var(--dur-base) var(--ease-out)",
              position: "relative",
              overflow: "hidden",
            }}
            aria-label={HERO.ctaAriaLabel}
            whileHover={
              isPending
                ? {}
                : {
                    boxShadow: "var(--shadow-glow)",
                    background: "var(--accent-hover)",
                  }
            }
            whileTap={isPending ? {} : { scale: 0.97 }}
          >
            {/* Shimmer sweep overlay — single one-shot on hover */}
            {!isPending && (
              <motion.span
                aria-hidden="true"
                initial={{ x: "-110%", opacity: 0.55 }}
                whileHover={{ x: "110%", opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Button content — sits above shimmer */}
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {isPending ? (
                <Loader2
                  size={17}
                  style={{ animation: "spin 1s linear infinite" }}
                  aria-hidden="true"
                />
              ) : (
                <>
                  {HERO.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* Error feedback */}
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              role="alert"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.875rem",
                color: "var(--danger)",
                margin: 0,
              }}
            >
              <AlertCircle size={14} aria-hidden="true" />
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            name="productUpdatesConsent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={isPending}
            style={{ marginTop: "3px" }}
          />
          <span>I'd like to receive product updates.</span>
        </label>

        {/* Microcopy */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {HERO.microcopy}
        </p>
      </div>
    </form>
  );
}

/* ──────────────────────────────────────────────────────────────
   ENHANCEMENT 3 — RIGHT COLUMN PARALLAX TILT
   Extracted so it can own its own useReducedMotion + motion values
   without re-rendering the parent HeroSection on every mousemove.
────────────────────────────────────────────────────────────── */
function RightColumnTilt() {
  const shouldReduce = useReducedMotion();
  const colRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [4, -4]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-5, 5]), { stiffness: 120, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    const rect = colRef.current?.getBoundingClientRect();
    if (!rect) return;
    /* Normalise to –1 … +1 relative to the column center */
    rawX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    rawY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={colRef}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-hidden="true"
      style={{
        position: "relative",
        paddingTop: "32px",
        paddingBottom: "28px",
        paddingLeft: "28px",
        paddingRight: "32px",
        /* Perspective for the 3-D tilt */
        perspective: "900px",
      }}
      className="hidden lg:block"
    >
      {/* Inner wrapper receives the tilt transform */}
      <motion.div
        style={{
          rotateX: shouldReduce ? 0 : rotateX,
          rotateY: shouldReduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* UI Cycle mock */}
        <UICycle />

        {/* Annotation cards — hidden < lg */}
        {ANNOTATION_CARDS.map((card) => (
          <AnnotCard key={card.id} card={card} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO SECTION
────────────────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-headline"
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "calc(var(--space-hero) + 72px)" /* account for fixed nav */,
          paddingBottom: "var(--space-hero)",
        }}
      >
        {/* Teal radial glow behind right-side mockup — slow pulse */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(167,139,250,0.09) 0%, rgba(167,139,250,0.03) 45%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "mesh-pulse-2 20s ease-in-out infinite",
          }}
        />

        <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="lg:hero-grid"
          >
            {/* ── LEFT: copy column ─────────────────────────── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
                maxWidth: "580px",
              }}
            >
              {/* Animated shimmer badge */}
              <HeroBadge />

              {/* ── Enhancement 1: Word-by-word stagger reveal ── */}
              {/* Accessible: full text is the aria-labelledby target;
                  individual word spans are aria-hidden so SR reads
                  the h1 as one natural phrase. */}
              <motion.h1
                id="hero-headline"
                aria-label={HERO.headline}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.18,
                    },
                  },
                }}
                style={{
                  fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.08,
                  color: "var(--text-primary)",
                  margin: 0,
                  /* Prevent layout shift while words load in */
                  display: "block",
                }}
              >
                {/* Plain words — each fades up independently */}
                {["Know", "where", "your", "money", "is"].map((word) => (
                  <motion.span
                    key={word}
                    aria-hidden="true"
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: DUR.reveal, ease: EASE_OUT },
                      },
                    }}
                    style={{ display: "inline-block", marginRight: "0.22em" }}
                  >
                    {word}
                  </motion.span>
                ))}

                {/* Gradient phrase — each word still staggers but carries the gradient */}
                {["really", "going."].map((word, i) => (
                  <motion.span
                    key={word}
                    aria-hidden="true"
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: DUR.reveal, ease: EASE_OUT },
                      },
                    }}
                    style={{
                      display: "inline-block",
                      marginRight: i === 0 ? "0.22em" : 0,
                      /* Apply gradient per-word so it doesn't break across words */
                      background: "linear-gradient(135deg, var(--accent-2) 0%, var(--info) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subhead — single promise, 18–20px, 75% opacity */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.28,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontSize: "clamp(1.0625rem, 2vw, 1.1875rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "46ch",
                  opacity: 0.85,
                }}
              >
                {HERO.subhead}
              </motion.p>

              {/* Form + secondary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.38,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  width: "100%",
                  maxWidth: "520px",
                }}
              >
                <WaitlistForm />

                {/* Secondary CTA — links to the live interactive demo */}
                <div>
                  <a
                    href="#demo"
                    aria-label={HERO.secondaryCtaAriaLabel}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      background: "transparent",
                      border: "1px solid var(--border-strong)",
                      cursor: "pointer",
                      letterSpacing: "-0.01em",
                      minHeight: "44px",
                      transition: [
                        "color var(--dur-base) var(--ease-out)",
                        "border-color var(--dur-base) var(--ease-out)",
                        "background var(--dur-base) var(--ease-out)",
                      ].join(", "),
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "var(--text-primary)";
                      el.style.background = "var(--bg-elev-2)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "var(--text-secondary)";
                      el.style.background = "transparent";
                    }}
                  >
                    <div
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        background: "var(--bg-elev-2)",
                        border: "1px solid var(--border-strong)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Play
                        size={10}
                        fill="currentColor"
                        aria-hidden="true"
                        style={{ marginLeft: "1px" }}
                      />
                    </div>
                    {HERO.secondaryCta}
                  </a>
                </div>
              </motion.div>

              {/* Micro trust signals — honest, no fake numbers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  No bank login required · No credit card needed to get started
                </span>
              </motion.div>
            </div>

            {/* ── Enhancement 3: Parallax tilt on the right column ── */}
            {/* Mouse position over the column drives gentle rotateX/Y
                via useMotionValue + useSpring. Disabled for
                prefers-reduced-motion via the shouldReduce guard. */}
            <RightColumnTilt />
          </div>
        </div>
      </section>

      {/* One-off hero-grid CSS — 2-column on lg */}
      <style>{`
        @media (min-width: 1024px) {
          .lg\\:hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 4rem !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
