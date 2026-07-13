"use client";

import { joinWaitlist } from "@/app/actions/waitlist";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Bell, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";

/* ──────────────────────────────────────────────────────────────
   APP STORE / PLAY STORE INLINE SVG BADGES
   Pure SVG — no external images, no <img> tags.
────────────────────────────────────────────────────────────── */
function AppleStoreBadge() {
  return (
    <svg
      viewBox="0 0 135 40"
      style={{ width: "135px", height: "40px" }}
      aria-label="Download on the App Store"
      role="img"
    >
      <rect width="135" height="40" rx="8" fill="#000" />
      <rect
        width="134"
        height="39"
        x=".5"
        y=".5"
        rx="7.5"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      {/* Apple logo */}
      <path
        d="M20.4 13.8c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.4 1.8-.7.9-1.4 2.3-1.2 3.7 1.4.1 2.7-.7 3.4-1.7z"
        fill="#fff"
      />
      <path
        d="M21.6 15.7c-1.9-.1-3.5 1.1-4.4 1.1-.9 0-2.3-1-3.8-1-2 .1-3.8 1.1-4.8 2.9-2 3.5-.5 8.8 1.5 11.6.9 1.4 2.1 2.9 3.6 2.9 1.4 0 2-.9 3.7-.9 1.8 0 2.2.9 3.7.9 1.5 0 2.6-1.4 3.5-2.7.7-1 1-1.5 1.5-2.7-4-.1-4.6-5.8-.7-7.5-.9-1.5-2.3-2.6-3.8-2.6z"
        fill="#fff"
      />
      {/* "Download on the" text */}
      <text
        x="35"
        y="17"
        fontFamily="system-ui, sans-serif"
        fontSize="9"
        fill="rgba(255,255,255,0.75)"
        fontWeight="400"
      >
        Download on the
      </text>
      {/* "App Store" text */}
      <text
        x="35"
        y="30"
        fontFamily="system-ui, sans-serif"
        fontSize="15"
        fill="#fff"
        fontWeight="700"
      >
        App Store
      </text>
    </svg>
  );
}

function PlayStoreBadge() {
  return (
    <svg
      viewBox="0 0 152 45"
      style={{ width: "152px", height: "45px" }}
      aria-label="Get it on Google Play"
      role="img"
    >
      <rect width="152" height="45" rx="8" fill="#000" />
      <rect
        width="151"
        height="44"
        x=".5"
        y=".5"
        rx="7.5"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      {/* Play triangle (simplified 4-colour) */}
      <path d="M13 10l16 12.5L13 35z" fill="url(#pg-grad)" />
      <defs>
        <linearGradient
          id="pg-grad"
          x1="13"
          y1="10"
          x2="29"
          y2="22.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00C4FF" />
          <stop offset="100%" stopColor="#00E676" />
        </linearGradient>
      </defs>
      <path d="M13 10l9 6.5-9 6z" fill="#00C4FF" opacity=".8" />
      <path d="M13 28.5l9-6 9 6z" fill="#FF3D00" opacity=".8" />
      {/* "Get it on" text */}
      <text
        x="38"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontSize="10"
        fill="rgba(255,255,255,0.75)"
        fontWeight="400"
      >
        Get it on
      </text>
      {/* "Google Play" text */}
      <text
        x="38"
        y="34"
        fontFamily="system-ui, sans-serif"
        fontSize="16"
        fill="#fff"
        fontWeight="700"
      >
        Google Play
      </text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   PHONE MOCKUP — CSS-drawn device frame with mini app UI inside
   Dimensions: ~220×440px at 1×. No external images.
────────────────────────────────────────────────────────────── */
function PhoneMockup() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateY: -4 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.25, duration: 0.75, ease: EASE_OUT }}
      aria-hidden="true"
      style={{ perspective: "800px" }}
    >
      {/* ── Enhancement 12: continuous float loop ──
          Inner wrapper owns the y-float so it composes cleanly
          with the outer entry animation. Disabled for reduced-motion. */}
      <motion.div
        animate={shouldReduce ? {} : { y: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          repeatType: "loop",
        }}
      >
        {/* Outer frame */}
        <div
          style={{
            width: "220px",
            height: "440px",
            borderRadius: "36px",
            background: "linear-gradient(145deg, #1A1A2E 0%, #0F0F1A 100%)",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06) inset," +
              "0 32px 64px rgba(0,0,0,0.7)," +
              "0 0 40px rgba(61,220,151,0.12)",
            padding: "14px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dynamic island / notch */}
          <div
            style={{
              alignSelf: "center",
              width: "80px",
              height: "22px",
              borderRadius: "12px",
              background: "#000",
              marginBottom: "8px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1C1C1E" }}
            />
            <div
              style={{ width: "18px", height: "10px", borderRadius: "5px", background: "#1C1C1E" }}
            />
          </div>

          {/* Screen content */}
          <div
            style={{
              flex: 1,
              borderRadius: "22px",
              background: "#0A0A10",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              padding: "10px 10px 6px",
              gap: "8px",
            }}
          >
            {/* App header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "-0.01em",
                }}
              >
                EXPOZOR
              </span>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3DDC97 0%, #2AB07F 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontWeight: 800,
                  color: "#0A0A0B",
                }}
              >
                JD
              </div>
            </div>

            {/* Balance card */}
            <div
              style={{
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(61,220,151,0.15) 0%, rgba(167,139,250,0.08) 100%)",
                border: "1px solid rgba(61,220,151,0.2)",
                padding: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "7px",
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 2px",
                  fontWeight: 500,
                }}
              >
                MONTHLY SPENDING
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 6px",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                $624.40
              </p>
              <div style={{ display: "flex", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "6px",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    background: "rgba(61,220,151,0.15)",
                    color: "var(--accent)",
                    fontWeight: 700,
                  }}
                >
                  ↓ $42 vs last month
                </span>
              </div>
            </div>

            {/* Mini budget bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[
                { label: "Food", pct: 68, color: "#3DDC97" },
                { label: "Shopping", pct: 42, color: "#A78BFA" },
                { label: "Transport", pct: 85, color: "#60A5FA" },
              ].map((b) => (
                <div key={b.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <span
                      style={{ fontSize: "6px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}
                    >
                      {b.label}
                    </span>
                    <span style={{ fontSize: "6px", color: "rgba(255,255,255,0.4)" }}>
                      {b.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      borderRadius: "2px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        width: `${b.pct}%`,
                        height: "100%",
                        borderRadius: "2px",
                        background: b.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent transactions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p
                style={{
                  fontSize: "7px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 2px",
                  letterSpacing: "0.06em",
                }}
              >
                RECENT
              </p>
              {[
                { emoji: "🛒", label: "Grocery Store", amount: "-$94", color: "#3DDC97" },
                { emoji: "⚡", label: "Electricity", amount: "-$62", color: "#FB923C" },
                { emoji: "🎬", label: "Streaming", amount: "-$18", color: "#A78BFA" },
              ].map((tx) => (
                <div
                  key={tx.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 6px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ fontSize: "9px" }}>{tx.emoji}</span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: "7px",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    {tx.label}
                  </span>
                  <span style={{ fontSize: "7px", fontWeight: 700, color: tx.color }}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom nav bar */}
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "6px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {["📊", "💳", "📷", "⚙️"].map((icon) => (
                <div
                  key={icon}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: icon === "\ud83d\udcca" ? "rgba(61,220,151,0.15)" : "transparent",
                    fontSize: "11px",
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div
            style={{
              alignSelf: "center",
              width: "80px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.2)",
              marginTop: "8px",
              flexShrink: 0,
            }}
          />
        </div>
      </motion.div>
      {/* /float wrapper */}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   NOTIFY FORM — saves mobile-interest signups through the waitlist action.
────────────────────────────────────────────────────────────── */
function NotifyForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("source", "mobile-app");
    fd.set("locale", "en");

    startTransition(async () => {
      const result = await joinWaitlist(fd);
      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        if (inputRef.current) inputRef.current.value = "";
      } else {
        setStatus("error");
        setMessage(result.error);
      }
    });
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "var(--radius-full)",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border-accent)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--accent)",
          }}
        >
          <CheckCircle2 size={15} aria-hidden="true" />
          You're on the list — we'll ping you when it launches!
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Get notified when the mobile app launches"
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" />
          <label htmlFor="notify-email" className="sr-only">
            Your email address
          </label>
          <input
            ref={inputRef}
            id="notify-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isPending || !consent}
            aria-describedby="notify-hint"
            style={{
              height: "44px",
              padding: "0 1rem",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-elev-2)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              minWidth: "0",
              flex: "1 1 200px",
              transition: "border-color var(--dur-base) var(--ease-out)",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "var(--border-strong)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "var(--border)";
            }}
          />
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Notify me when the EXPOZOR mobile app launches"
            style={{
              height: "44px",
              padding: "0 1.25rem",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-elev-2)",
              border: "1px solid var(--border-strong)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: isPending || !consent ? "not-allowed" : "pointer",
              opacity: isPending || !consent ? 0.7 : 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              letterSpacing: "-0.01em",
              transition: "border-color var(--dur-base) var(--ease-out)",
            }}
          >
            {isPending ? (
              <Loader2
                size={14}
                style={{ animation: "spin 1s linear infinite" }}
                aria-hidden="true"
              />
            ) : (
              <>
                <Bell size={14} aria-hidden="true" />
                Notify me
              </>
            )}
          </motion.button>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              flexBasis: "100%",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              name="productUpdatesConsent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              disabled={isPending}
              style={{ marginTop: "3px" }}
            />
            <span>I'd like to receive product updates.</span>
          </label>
          {status === "error" && (
            <p
              role="alert"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexBasis: "100%",
                fontSize: "0.75rem",
                color: "var(--warn)",
                margin: 0,
              }}
            >
              <AlertCircle size={13} aria-hidden="true" />
              {message}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────
   MOBILE APP CTA SECTION — main export
────────────────────────────────────────────────────────────── */
export function MobileAppCtaSection() {
  return (
    <section
      id="mobile-app"
      aria-labelledby="mobile-app-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background glow — soft purple tilt */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(167,139,250,0.06) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 20% 80%, rgba(61,220,151,0.04) 0%, transparent 45%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <div className="mobile-layout">
          {/* ── LEFT: copy ──────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Eyebrow */}
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              MOBILE APP
            </motion.p>

            {/* "Coming soon" badge */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-elev-2)",
                border: "1px solid var(--border)",
                width: "fit-content",
              }}
            >
              {/* Amber pulsing dot */}
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#FBBF24",
                  animation: "pulse-dot 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}
              >
                Coming Q3 2026 · iOS &amp; Android
              </span>
            </motion.div>

            {/* H2 */}
            <motion.h2
              id="mobile-app-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(1.875rem, 4.5vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Your finances, <span className="text-gradient">in your pocket.</span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "38ch",
              }}
            >
              Mobile apps are planned for early access, with manual expense entry and receipt
              capture workflows designed for phones.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.45 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
            >
              {[
                "Receipt capture planned",
                "Budget alerts planned",
                "Biometrics planned",
                "Offline mode planned",
                "Widgets planned",
              ].map((feat) => (
                <span
                  key={feat}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    background: "var(--bg-elev-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {feat}
                </span>
              ))}
            </motion.div>

            {/* Store badges — greyed out (not yet live) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.45 }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  margin: "0 0 0.625rem",
                  fontWeight: 500,
                }}
              >
                Available soon:
              </p>
              <div
                style={{ display: "flex", gap: "10px", flexWrap: "wrap", opacity: 0.45 }}
                aria-label="App store badges — not yet available"
              >
                <button
                  type="button"
                  aria-label="Download on the App Store — coming soon"
                  aria-disabled="true"
                  tabIndex={-1}
                  style={{
                    pointerEvents: "none",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "default",
                  }}
                >
                  <AppleStoreBadge />
                </button>
                <button
                  type="button"
                  aria-label="Get it on Google Play — coming soon"
                  aria-disabled="true"
                  tabIndex={-1}
                  style={{
                    pointerEvents: "none",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "default",
                  }}
                >
                  <PlayStoreBadge />
                </button>
              </div>
            </motion.div>

            {/* Notify me form */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.34, duration: 0.45 }}
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Get launch-day access →
              </p>
              <p
                id="notify-hint"
                style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}
              >
                We'll email you the day the app goes live. No spam.
              </p>
              <NotifyForm />
            </motion.div>
          </div>

          {/* ── RIGHT: phone mockup ──────────────────────── */}
          <div
            className="phone-col"
            style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
          >
            {/* Ambient glow behind phone */}
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-40px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(61,220,151,0.15) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        .mobile-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        .phone-col { order: -1; }

        @media (min-width: 768px) {
          .phone-col { order: 0; }
        }

        @media (min-width: 900px) {
          .mobile-layout {
            grid-template-columns: 1fr auto;
            gap: 4rem;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
