"use client";

import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lightweight particle canvas — static fallback for prefers-reduced-motion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ["#7CF5C2", "#FFB36B", "#60a5fa"];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function spawnParticle() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#7CF5C2",
      });
    }

    resize();
    for (let i = 0; i < 60; i++) spawnParticle();

    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.round(p.alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      aria-label="Hero"
    >
      {/* Background canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Radial gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,245,194,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,179,107,0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container-site relative z-10 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] border border-[var(--border-accent)] text-[var(--accent)] tracking-wide uppercase">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"
              aria-hidden="true"
            />
            Now in private beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl"
        >
          Your finances, <span className="text-gradient">finally intelligent.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
        >
          EXPOZOR understands your money the way you do — automatically. Scan receipts, sync banks,
          split with your household, and let AI handle the rest.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
          id="waitlist"
        >
          <WaitlistForm size="large" />
          <p className="text-xs text-[var(--text-tertiary)] mt-3">
            Free forever on the Free plan. No credit card required.
          </p>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3"
        >
          <div className="flex -space-x-2" aria-label="Beta users">
            {["#7CF5C2", "#FFB36B", "#60a5fa", "#f87171", "#a78bfa"].map((color, i) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full border-2 border-[var(--bg)] flex items-center justify-center text-xs font-bold"
                style={{ background: `${color}33`, color, zIndex: 5 - i }}
                aria-hidden="true"
              >
                {["A", "M", "S", "J", "R"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-tertiary)]">
            <span className="text-[var(--text-primary)] font-medium">240+</span> people already on
            the waitlist
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#demo"
            className="flex flex-col items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors group"
            aria-label="Scroll to demo"
          >
            <span className="text-xs tracking-widest uppercase">See it live</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown size={16} aria-hidden="true" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
