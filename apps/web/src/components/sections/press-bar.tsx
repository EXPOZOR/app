"use client";

import { motion } from "framer-motion";
import { PRESS } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";

/* ── Press logos (SVG text-based, grayscale) ─────────────────
   Using real publication names rendered as styled wordmarks.
   Replace with real SVG logos once press coverage is confirmed.
──────────────────────────────────────────────────────────────── */
const LOGO_STYLES: Record<string, React.CSSProperties> = {
  "Product Hunt":        { fontWeight: 700, letterSpacing: "-0.02em" },
  "Indie Hackers":       { fontWeight: 800, letterSpacing: "-0.03em" },
  "Hacker News":         { fontWeight: 700, letterSpacing: "-0.01em" },
  "TechCrunch":          { fontWeight: 900, letterSpacing: "-0.04em" },
  "The Pragmatic Engineer": { fontWeight: 600, letterSpacing: "-0.01em", fontSize: "0.78rem" },
};

export function PressBar() {
  return (
    <section
      aria-label="As featured in"
      className="relative py-12 border-y border-[var(--border)] overflow-hidden"
    >
      {/* Edge fade masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--bg) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--bg) 0%, transparent 100%)",
        }}
      />

      <div className="container-site">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-tertiary)] mb-8"
        >
          {PRESS.heading}
        </motion.p>

        {/* Logo row */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
          role="list"
          aria-label="Featured publications"
        >
          {PRESS.items.map((item, i) => (
            <motion.div
              key={item.name}
              role="listitem"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT }}
              /* ── Enhancement 13: spring pop on hover ──
                 Scale + opacity are paint-only. The spring gives a
                 satisfying physical catch — not a stiff linear jump. */
              whileHover={{
                scale: 1.08,
                opacity: 1,
                transition: { type: "spring", stiffness: 340, damping: 24 },
              }}
              style={{ opacity: 0.5 }}   /* resting dim — pops to 1 on hover */
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block transition-all duration-200"
                aria-label={`As featured in ${item.name}`}
                style={{ textDecoration: "none" }}
              >
                <span
                  className="
                    block
                    transition-colors duration-200 select-none
                    text-[0.9rem] tracking-tight
                  "
                  style={{
                    ...LOGO_STYLES[item.name],
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.name}
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
