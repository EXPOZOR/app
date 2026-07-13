"use client";

import { joinWaitlist } from "@/app/actions/waitlist";
import { FINAL_CTA } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";

/* ──────────────────────────────────────────────────────────────
   CONFETTI ENGINE
   Pure canvas / requestAnimationFrame — zero external deps.
   Respects prefers-reduced-motion: fires nothing if set.
   Canvas is aria-hidden and pointer-events: none.
────────────────────────────────────────────────────────────── */
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  color: string;
  w: number;
  h: number;
  opacity: number;
  shape: "rect" | "circle" | "ribbon";
};

const CONFETTI_COLORS = [
  "#3DDC97", // mint
  "#A78BFA", // purple
  "#FB923C", // orange
  "#60A5FA", // blue
  "#F472B6", // pink
  "#FBBF24", // amber
  "#34D399", // green
];

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aliveRef = useRef(false);

  const fire = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Spawn 140 particles in a burst from the top-centre area
    const CX = canvas.width / 2;
    const particles: Particle[] = Array.from({ length: 140 }, () => {
      const angle = Math.random() * Math.PI * 1.4 - Math.PI * 0.7; // fan upward
      const speed = Math.random() * 14 + 4;
      return {
        x: CX + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] ?? "#3DDC97",
        w: Math.random() * 10 + 4,
        h: Math.random() * 5 + 3,
        opacity: 1,
        shape: (["rect", "circle", "ribbon"] as const)[Math.floor(Math.random() * 3)] ?? "rect",
      };
    });

    aliveRef.current = true;

    // Capture narrowed locals so TS flow-analysis holds inside the rAF closure
    const _canvas: HTMLCanvasElement = canvas;
    const _ctx: CanvasRenderingContext2D = ctx;

    function tick() {
      if (!aliveRef.current) return;
      _ctx.clearRect(0, 0, _canvas.width, _canvas.height);

      let living = 0;

      for (const p of particles) {
        if (p.opacity <= 0.01) continue;
        living++;

        // Physics
        p.vx *= 0.99;
        p.vy += 0.32; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        // Fade when below 65% viewport
        if (p.y > _canvas.height * 0.65) p.opacity -= 0.018;

        _ctx.save();
        _ctx.globalAlpha = Math.max(0, p.opacity);
        _ctx.fillStyle = p.color;
        _ctx.translate(p.x, p.y);
        _ctx.rotate((p.rot * Math.PI) / 180);

        if (p.shape === "circle") {
          _ctx.beginPath();
          _ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          _ctx.fill();
        } else if (p.shape === "ribbon") {
          _ctx.fillRect(-p.w * 1.5, -p.h / 2, p.w * 3, p.h / 2);
        } else {
          _ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        _ctx.restore();
      }

      if (living > 0) {
        requestAnimationFrame(tick);
      } else {
        _canvas.style.display = "none";
        aliveRef.current = false;
      }
    }

    requestAnimationFrame(tick);

    // Hard stop after 5 s to free the RAF
    setTimeout(() => {
      aliveRef.current = false;
      _canvas.style.display = "none";
    }, 5000);
  }, []);

  return { canvasRef, fire };
}

/* ──────────────────────────────────────────────────────────────
   FINAL CTA SECTION
────────────────────────────────────────────────────────────── */
export function FinalCtaSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const { canvasRef, fire } = useConfetti();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("source", "final-cta");
    fd.set("locale", "en");
    startTransition(async () => {
      const result = await joinWaitlist(fd);
      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        if (inputRef.current) inputRef.current.value = "";
        fire(); // 🎉 confetti
      } else {
        setStatus("error");
        setMessage(result.error);
      }
    });
  }

  return (
    <section
      id="waitlist"
      aria-labelledby="final-cta-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Global confetti canvas — fixed, full-screen, aria-hidden */}
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Background: dual radial glow (mint + purple) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(61,220,151,0.07) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 70% 50%, rgba(167,139,250,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.025,
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--border) 0px, transparent 1px, transparent 40px, var(--border) 40px)," +
            "repeating-linear-gradient(90deg, var(--border) 0px, transparent 1px, transparent 40px, var(--border) 40px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          /* ── Enhancement 14a: looping ambient border pulse ──
             Cycles mint → purple → mint over 5s.
             Subtle enough not to distract from the form,
             vivid enough to make the card feel alive. */
          animate={{
            boxShadow: [
              "0 0 0 1px rgba(61,220,151,0.12), 0 0 40px rgba(61,220,151,0.06)",
              "0 0 0 1px rgba(167,139,250,0.18), 0 0 40px rgba(167,139,250,0.08)",
              "0 0 0 1px rgba(61,220,151,0.12), 0 0 40px rgba(61,220,151,0.06)",
            ],
            transition: {
              delay: 1,
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-elev-1)",
            border: "1px solid var(--border)",
            padding: "clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card inner glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(61,220,151,0.06) 0%, transparent 60%)",
            }}
          />

          <div style={{ position: "relative" }}>
            {/* ── Eyebrow ──────────────────────────────── */}
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: "0.875rem" }}
            >
              GET STARTED
            </motion.p>

            {/* ── H2 ───────────────────────────────────── */}
            <motion.h2
              id="final-cta-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                margin: "0 0 0.875rem",
              }}
            >
              {FINAL_CTA.headline}
            </motion.h2>

            {/* ── Sub ──────────────────────────────────── */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.13, duration: 0.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: "0 0 1.75rem",
                maxWidth: "44ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {FINAL_CTA.subhead}
            </motion.p>

            {/* ── 3 bullet quick-wins ──────────────────── */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.45 }}
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem 1.25rem",
                margin: "0 0 2rem",
              }}
            >
              {FINAL_CTA.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  <Check
                    size={13}
                    style={{ color: "var(--accent)", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            {/* ── Form / success state ──────────────────── */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                /* Success message */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  role="alert"
                  aria-live="assertive"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--border-accent)",
                  }}
                >
                  <CheckCircle2 size={28} style={{ color: "var(--accent)" }} aria-hidden="true" />
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {message}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0 }}>
                    You&rsquo;re on the list. We will send early-access updates when ready.
                  </p>
                </motion.div>
              ) : (
                /* Waitlist form */
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Final waitlist signup"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  {/* Email row */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                      width: "100%",
                      maxWidth: "480px",
                    }}
                    className="cta-form-row"
                  >
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="sr-only"
                    />
                    <div style={{ flex: 1 }}>
                      <label htmlFor="final-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        ref={inputRef}
                        id="final-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isPending}
                        aria-describedby="final-cta-microcopy"
                        aria-invalid={status === "error"}
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 1rem",
                          borderRadius: "var(--radius-md)",
                          background: "var(--bg-elev-2)",
                          border: `1px solid ${status === "error" ? "var(--warn)" : "var(--border)"}`,
                          color: "var(--text-primary)",
                          fontSize: "0.9375rem",
                          transition: "border-color var(--dur-base) var(--ease-out)",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            status === "error" ? "var(--warn)" : "var(--border-accent)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            status === "error" ? "var(--warn)" : "var(--border)";
                        }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isPending}
                      whileHover={{ scale: 1.03, boxShadow: "var(--shadow-glow)" }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={FINAL_CTA.ctaAriaLabel}
                      /* ── Enhancement 14b: shimmer-sweep class ──
                         .final-btn::after rule in the scoped <style>
                         below fires the shimmer-sweep keyframe every 4s. */
                      className="final-btn"
                      style={{
                        height: "48px",
                        padding: "0 1.375rem",
                        borderRadius: "var(--radius-md)",
                        background: "var(--accent)",
                        color: "var(--text-inverse)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        border: "none",
                        cursor: isPending ? "not-allowed" : "pointer",
                        opacity: isPending ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
                        transition: "background var(--dur-base) var(--ease-out)",
                      }}
                    >
                      {isPending ? (
                        <Loader2
                          size={16}
                          style={{ animation: "spin 1s linear infinite" }}
                          aria-hidden="true"
                        />
                      ) : (
                        <>
                          {FINAL_CTA.cta}
                          <ArrowRight size={15} aria-hidden="true" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      maxWidth: "480px",
                      width: "100%",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      textAlign: "left",
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

                  {/* Error message */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "0.8125rem",
                          color: "var(--warn)",
                        }}
                      >
                        <AlertCircle size={13} aria-hidden="true" />
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Microcopy */}
                  <p
                    id="final-cta-microcopy"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    {FINAL_CTA.microcopy}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Responsive form row stacking + Enhancement 14b shimmer */}
      <style>{`
        @media (max-width: 480px) {
          .cta-form-row {
            flex-direction: column !important;
          }
          .cta-form-row button {
            width: 100%;
            justify-content: center;
          }
        }

        /* Spinner keyframe (in case globals.css doesn't have it) */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Enhancement 14b: shimmer sweep on the final CTA button ──
           Reuses the shimmer-sweep keyframe defined in globals.css.
           Fires once every 4s with a 2s initial delay so it doesn't
           race the card entry animation. Suppressed by reduced-motion. */
        .final-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 65%
          );
          background-size: 200% 100%;
          animation: shimmer-sweep 4s ease-in-out 2s infinite;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .final-btn::after { animation: none; }
        }
      `}</style>
    </section>
  );
}
