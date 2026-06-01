"use client";

import { motion } from "framer-motion";
import { InteractiveDemo } from "./interactive-demo";

export function DemoSection() {
  return (
    <section id="demo" className="section-py" aria-labelledby="demo-section-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] mb-3">
            Try it now
          </p>
          <h2
            id="demo-section-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            See it in action
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto">
            Add an expense, watch AI categorize it in real time, and see your budget update
            instantly. No account needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveDemo />
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-xs text-[var(--text-tertiary)] mt-6"
        >
          This demo runs purely client-side — no data leaves your browser.
        </motion.p>
      </div>
    </section>
  );
}
