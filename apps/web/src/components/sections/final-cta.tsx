"use client";

import { WaitlistForm } from "@/components/waitlist-form";
import { FINAL_CTA } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCallback, useRef } from "react";

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
  "var(--positive)",
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
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)] ?? "var(--positive)",
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
  const { canvasRef, fire } = useConfetti();

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
            "radial-gradient(ellipse at 30% 50%, color-mix(in oklch, var(--accent) 7%, transparent) 0%, transparent 50%)," +
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
              "0 0 0 1px color-mix(in oklch, var(--accent) 12%, transparent), 0 0 40px color-mix(in oklch, var(--accent) 6%, transparent)",
              "0 0 0 1px rgba(167,139,250,0.18), 0 0 40px rgba(167,139,250,0.08)",
              "0 0 0 1px color-mix(in oklch, var(--accent) 12%, transparent), 0 0 40px color-mix(in oklch, var(--accent) 6%, transparent)",
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
                "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--accent) 6%, transparent) 0%, transparent 60%)",
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

            {/* ── Canonical waitlist form ────────────────── */}
            <WaitlistForm onSuccess={fire} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
