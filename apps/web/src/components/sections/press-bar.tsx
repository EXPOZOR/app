"use client";

import { EASE_OUT } from "@/lib/motion";
import { motion } from "framer-motion";
import { Ban, FileSpreadsheet, PenLine, ShieldOff, Sparkles, Upload } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   TRUST BAR — product positioning badges.
   Shows real capabilities, not unverifiable compliance claims.
────────────────────────────────────────────────────────────── */

const TRUST_BADGES = [
  { icon: ShieldOff, label: "No bank login" },
  { icon: Ban, label: "Expense tracking only" },
  { icon: Upload, label: "Receipt upload planned" },
  { icon: FileSpreadsheet, label: "CSV import planned" },
  { icon: Sparkles, label: "AI-assisted planned" },
  { icon: PenLine, label: "Manual entry" },
];

export function PressBar() {
  return (
    <section
      aria-label="Product trust badges"
      className="relative py-10 border-y border-[var(--border)] overflow-hidden"
    >
      <div className="container-site">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-tertiary)] mb-6"
        >
          Built with
        </motion.p>

        {/* Badge row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT }}
                className="flex items-center gap-2 text-[var(--text-secondary)] opacity-70"
              >
                <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[0.8rem] font-medium tracking-tight">{badge.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
