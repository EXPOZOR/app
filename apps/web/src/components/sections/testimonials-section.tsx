"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────
   TWEET DATA
   6 CSS-rendered X/Twitter cards. Avatars are CSS initials —
   no external images. Engagement counts are illustrative.
   ⚠️ These are placeholder testimonials. Replace with verified
      screenshots before production launch.
────────────────────────────────────────────────────────────── */
type Tweet = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarBg: string;
  body: string;
  time: string;
  likes: string;
  reposts: string;
  verified: boolean;
};

const TWEETS: Tweet[] = [
  {
    id: "t1",
    name: "Amara L.",
    handle: "@amaral_designs",
    initials: "AL",
    avatarBg: "linear-gradient(135deg, #3DDC97 0%, #2AB07F 100%)",
    body: "Finally an expense app that doesn't make me feel guilty about spending. The AI categories are eerily accurate — it just knew that 'Amazon' was groceries not shopping 😭",
    time: "2h",
    likes: "847",
    reposts: "112",
    verified: true,
  },
  {
    id: "t2",
    name: "Marcus T.",
    handle: "@marcusthinks",
    initials: "MT",
    avatarBg: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
    body: "The receipt scanner in EXPOZOR is genuinely the fastest I've ever used. Snap → categorized → matched to my bank statement. Two seconds. Done. Life-changing for business trips.",
    time: "5h",
    likes: "1.2K",
    reposts: "201",
    verified: false,
  },
  {
    id: "t3",
    name: "Sasha K.",
    handle: "@sashakodes",
    initials: "SK",
    avatarBg: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
    body: "My partner and I use @EXPOZOR for shared expenses. The settle-up algo is brilliant — it figured out the minimum transactions to clear all our group debts from the Porto trip 🇵🇹",
    time: "1d",
    likes: "543",
    reposts: "88",
    verified: true,
  },
  {
    id: "t4",
    name: "Priya M.",
    handle: "@priya_builds",
    initials: "PM",
    avatarBg: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
    body: "I asked EXPOZOR 'what did I spend on coffee last month' and it answered instantly. $148 apparently. I'm going to cry. But at least I know 🫠 the AI agent feature is 🔥",
    time: "2d",
    likes: "2.1K",
    reposts: "387",
    verified: false,
  },
  {
    id: "t5",
    name: "James W.",
    handle: "@jameswfinance",
    initials: "JW",
    avatarBg: "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)",
    body: "Was skeptical about another budgeting app. But the bank sync is genuinely instant and the budget envelopes actually work the way my brain does. Cancelled YNAB after 3 years.",
    time: "3d",
    likes: "934",
    reposts: "156",
    verified: true,
  },
  {
    id: "t6",
    name: "Chen L.",
    handle: "@chenbuilds",
    initials: "CL",
    avatarBg: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
    body: "The subscription radar caught a $54.99 Adobe charge I forgot I had. EXPOZOR paid for itself in the first week. The UI is also just *chef's kiss* — obsessed.",
    time: "4d",
    likes: "1.7K",
    reposts: "298",
    verified: false,
  },
] as const;

/* ──────────────────────────────────────────────────────────────
   X (Twitter) INLINE SVG LOGO — 14×14
────────────────────────────────────────────────────────────── */
function XLogo({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1200 1227"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284zM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   TWEET CARD — styled exactly like dark-mode X post
────────────────────────────────────────────────────────────── */
function TweetCard({ tweet, delay }: { tweet: Tweet; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay, duration: 0.5, ease: EASE_OUT }}
      /* ── Enhancement 7: spring tilt on hover ──
         Animates only transform + box-shadow (paint only).
         rotateY gives a subtle "picking up a card" feel. */
      whileHover={{
        rotateY: 4,
        translateY: -4,
        boxShadow: "0 12px 36px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
      style={{
        perspective: "800px",      /* keeps rotateY readable at small angles */
        padding: "1rem",
        borderRadius: "12px",
        background: "#16181C",          /* X dark card bg */
        border: "1px solid #2F3336",    /* X dark card border */
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        breakInside: "avoid",           /* for CSS columns */
        cursor: "default",
      }}
      aria-label={`Tweet from ${tweet.name}: ${tweet.body}`}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        {/* CSS initials avatar */}
        <div
          aria-hidden="true"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: tweet.avatarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#0A0A0B",
            flexShrink: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {tweet.initials}
        </div>
        <span className="sr-only">{tweet.name}</span>

        {/* Name + handle */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#E7E9EA",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {tweet.name}
            </span>
            {/* Verified badge */}
            {tweet.verified && (
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                aria-label="Verified account"
                style={{ color: "#1D9BF0", flexShrink: 0 }}
              >
                <g fill="currentColor">
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                </g>
              </svg>
            )}
          </div>
          <div style={{
            fontSize: "0.8125rem",
            color: "#71767B",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {tweet.handle}
          </div>
        </div>

        {/* X logo — top right */}
        <div style={{ color: "#E7E9EA", flexShrink: 0 }}>
          <XLogo size={16} />
        </div>
      </div>

      {/* Tweet body */}
      <p style={{
        fontSize: "0.9375rem",
        color: "#E7E9EA",
        lineHeight: 1.55,
        margin: 0,
        whiteSpace: "pre-line",
      }}>
        {tweet.body}
      </p>

      {/* Footer: time + engagement */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        paddingTop: "8px",
        borderTop: "1px solid #2F3336",
      }}>
        <span style={{ fontSize: "0.8125rem", color: "#71767B" }}>{tweet.time}</span>
        <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
          {/* Reposts */}
          <span style={{
            display: "flex", alignItems: "center", gap: "4px",
            fontSize: "0.8125rem", color: "#71767B",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
            {tweet.reposts}
          </span>
          {/* Likes */}
          <span style={{
            display: "flex", alignItems: "center", gap: "4px",
            fontSize: "0.8125rem", color: "#71767B",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {tweet.likes}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────
   WAITLIST COUNTER
   Animated count-up — uses IntersectionObserver (same pattern
   as StatsBand for consistency). Displays: 3,247+
────────────────────────────────────────────────────────────── */
const WAITLIST_COUNT = 3247;

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setValue(target); return; }

    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);

  return { value, elRef };
}

function WaitlistCounter() {
  const { value, elRef } = useCountUp(WAITLIST_COUNT, 1400);

  return (
    <motion.div
      ref={elRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "3.5rem",
      }}
    >
      {/* Pill counter */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 20px",
          borderRadius: "var(--radius-full)",
          background: "var(--bg-elev-1)",
          border: "1px solid var(--border)",
        }}
        aria-label={`${WAITLIST_COUNT.toLocaleString()} people on the waitlist`}
      >
        {/* Pulsing live dot */}
        <div style={{ position: "relative", width: "8px", height: "8px", flexShrink: 0 }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "var(--accent)", animation: "pulse-dot 2s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "var(--accent)", opacity: 0.3,
            animation: "pulse-dot 2s ease-in-out infinite",
            animationDelay: "0.5s",
            transform: "scale(1.8)",
          }} />
        </div>

        {/* Number */}
        <span
          aria-hidden="true"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {value.toLocaleString()}+
        </span>

        <span style={{
          fontSize: "0.9375rem",
          color: "var(--text-muted)",
          fontWeight: 500,
        }}>
          on the waitlist
        </span>
      </div>

      {/* Avatars row — CSS initials, 7 overlapping */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div
          aria-hidden="true"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* Enhancement 7: staggered mount for avatar cluster */}
          {TWEETS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.6, x: -6 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.35, ease: EASE_OUT }}
              title={t.name}
              style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: t.avatarBg,
                border: "2px solid var(--bg-base)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.5rem", fontWeight: 700, color: "#0A0A0B",
                marginLeft: i > 0 ? "-8px" : 0,
                zIndex: TWEETS.length - i,
                position: "relative",
              }}
            >
              {t.initials}
            </motion.div>
          ))}
        </div>
        <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginLeft: "4px" }}>
          + 3,241 more founders
        </span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIALS SECTION — main export
────────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        {/* ── Section header ───────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: "0.875rem" }}
          >
            COMMUNITY
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto 0.875rem" }}
          >
            People are already talking
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            style={{ margin: "0 auto" }}
          >
            Early-access pilots from our waitlist. Real people, real money wins.
          </motion.p>
        </div>

        {/* ── Waitlist counter ─────────────────────────────── */}
        <WaitlistCounter />

        {/* ── Tweet grid (CSS columns for masonry-like layout) ── */}
        <div
          role="list"
          aria-label="Community testimonials"
          className="tweet-grid"
        >
          {TWEETS.map((tweet, i) => (
            <div key={tweet.id} role="listitem">
              <TweetCard tweet={tweet} delay={i * 0.06} />
            </div>
          ))}
        </div>

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
            marginTop: "2rem",
          }}
        >
          Collected from early waitlist pilots. Names truncated for privacy.
        </motion.p>
      </div>

      {/* Scoped grid styles */}
      <style>{`
        .tweet-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .tweet-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .tweet-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
