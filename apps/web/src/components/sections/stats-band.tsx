"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   TRUST BAND — honest pre-launch trust signals
   No fabricated numbers. Real commitments only.
────────────────────────────────────────────────────────────── */

const TRUST_ITEMS = [
  {
    label: "No bank login required",
    sublabel: "Manual first; upload/import planned",
  },
  {
    label: "Expense tracking only",
    sublabel: "Tracking only",
  },
  {
    label: "Export support planned",
    sublabel: "Data controls before launch",
  },
];

/* ── Vertical divider ─────────────────────────────────────── */
function VertDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "1px",
        alignSelf: "stretch",
        background:
          "linear-gradient(to bottom, transparent 0%, var(--border) 20%, var(--border) 80%, transparent 100%)",
        flexShrink: 0,
      }}
    />
  );
}

/* ── Main component ───────────────────────────────────────── */
export function StatsBand() {
  return (
    <section
      aria-label="EXPOZOR trust signals"
      style={{
        background: "var(--bg-elev-1)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0",
      }}
    >
      <div className="container-site">
        <div className="stats-grid">
          {TRUST_ITEMS.map((item, i) => (
            <div key={item.label} style={{ display: "contents" }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0 2rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {item.sublabel}
                </p>
              </motion.div>
              {i < TRUST_ITEMS.length - 1 && <VertDivider />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          row-gap: 2rem;
        }

        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr auto 1fr auto 1fr;
            align-items: center;
            row-gap: 0;
            column-gap: 0;
          }
        }
      `}</style>
    </section>
  );
}
