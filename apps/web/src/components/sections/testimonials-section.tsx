import { MotionDiv, MotionH2, MotionP } from "@/components/ui/motion-primitives";
import { BRAND_COLORS } from "@/lib/brand-colors";
import { EASE_OUT } from "@/lib/motion";
import { Database, ShieldCheck, Zap } from "lucide-react";

const motion = {
  div: MotionDiv,
  h2: MotionH2,
  p: MotionP,
};

/* ──────────────────────────────────────────────────────────────
   EARLY ACCESS SECTION
   Replaces fake testimonials with honest value propositions.
   No fabricated users, numbers, or engagement metrics.
────────────────────────────────────────────────────────────── */

const PLEDGES = [
  {
    icon: Zap,
    title: "Waitlist-first launch",
    description:
      "Join early access without a credit card. Billing is not active and no paid package is currently offered.",
    accent: BRAND_COLORS.lilac,
  },
  {
    icon: ShieldCheck,
    title: "Privacy by architecture",
    description:
      "The current site uses HTTPS in transit and does not collect bank credentials. Infrastructure details will be published as product features launch.",
    accent: "#60a5fa",
  },
  {
    icon: Database,
    title: "Data requests supported",
    description:
      "You can contact support today to request deletion of your waitlist record. Self-service controls will follow as account features launch.",
    accent: "#a78bfa",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="early-access"
      aria-labelledby="early-access-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: "0.875rem" }}
          >
            EARLY ACCESS
          </motion.p>
          <motion.h2
            id="early-access-heading"
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto 0.875rem" }}
          >
            Built different. Here&apos;s our promise.
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            style={{ margin: "0 auto" }}
          >
            We believe in earning trust through transparency — not fabricated reviews.
          </motion.p>
        </div>

        {/* Pledge cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {PLEDGES.map((pledge, i) => {
            const Icon = pledge.icon;
            return (
              <motion.div
                key={pledge.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT }}
                style={{
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${pledge.accent}1A`,
                    border: `1px solid ${pledge.accent}33`,
                  }}
                >
                  <Icon size={18} style={{ color: pledge.accent }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pledge.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {pledge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
