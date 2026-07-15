import {
  MotionA,
  MotionDiv,
  MotionH2,
  MotionLi,
  MotionP,
  MotionUl,
} from "@/components/ui/motion-primitives";
import { EASE_OUT } from "@/lib/motion";
import { Ban, Database, ExternalLink, Eye, Lock, ShieldOff, Trash2 } from "lucide-react";

const motion = {
  a: MotionA,
  div: MotionDiv,
  h2: MotionH2,
  li: MotionLi,
  p: MotionP,
  ul: MotionUl,
};

/* ──────────────────────────────────────────────────────────────
   PLEDGE CARDS DATA
   Icons are intentionally neutral-white (not mint) — mint is
   reserved for primary CTAs only. Brief spec: six pledge items.
────────────────────────────────────────────────────────────── */
const PLEDGES = [
  {
    id: "no-bank",
    Icon: ShieldOff,
    title: "No bank login required",
    description:
      "EXPOZOR does not ask for or collect your bank credentials. You choose every expense you enter.",
  },
  {
    id: "no-money",
    Icon: Ban,
    title: "Expense tracking only",
    description:
      "EXPOZOR is not a payment service. It does not access accounts, custody funds, or initiate payments.",
  },
  {
    id: "https",
    Icon: Lock,
    title: "Encrypted in transit",
    description:
      "We use HTTPS for all data in transit. Additional infrastructure and storage security details will be documented before public launch.",
  },
  {
    id: "no-data",
    Icon: Eye,
    title: "No data selling",
    description:
      "No ads. No third-party data brokers. Your financial information is not a product we sell or share.",
  },
  {
    id: "limited-data",
    Icon: Database,
    title: "Limited data collection",
    description:
      "The public site collects waitlist signup data and basic technical data needed to operate and protect the service.",
  },
  {
    id: "deletion",
    Icon: Trash2,
    title: "Deletion requests supported",
    description:
      "You can request deletion of your waitlist record. Contact support for data removal requests.",
  },
] as const;

/* ──────────────────────────────────────────────────────────────
   INLINE SHIELD ILLUSTRATION (pure CSS/SVG — no external asset)
────────────────────────────────────────────────────────────── */
function ShieldIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem",
      }}
    >
      {/* Outer glow rings */}
      <div style={{ position: "relative", width: "72px", height: "72px" }}>
        {[1, 2].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              inset: `${-r * 10}px`,
              borderRadius: "50%",
              border: "1px solid var(--border-accent)",
              opacity: 0.25 / r,
            }}
          />
        ))}

        {/* Shield icon container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 24px var(--accent-glow)",
          }}
        >
          <Lock size={28} style={{ color: "var(--decorative)" }} aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECURITY SECTION — main export
   Layout: large elevated panel
     Left  → eyebrow, H2 "Your money. Your data. Both deserve care.",
              emotional sub-line, bullet pledges list, CTA link
     Right → 2×3 pledge card grid
────────────────────────────────────────────────────────────── */
export function SecuritySection() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Subtle purple radial glow behind the heading */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 25% 50%, rgba(167,139,250,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-elev-1)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Top-right corner glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "320px",
              height: "320px",
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at top right, rgba(167,139,250,0.05) 0%, transparent 60%)",
            }}
          />

          <div className="security-inner">
            {/* ── LEFT: copy ──────────────────────────────── */}
            <div style={{ position: "relative" }}>
              {/* Shield illustration */}
              <ShieldIllustration />

              {/* Eyebrow */}
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{ marginBottom: "0.75rem" }}
              >
                TRUST &amp; SECURITY
              </motion.p>

              {/* H2 */}
              <motion.h2
                id="security-heading"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "var(--text-primary)",
                  margin: "0 0 1rem",
                }}
              >
                Your money. Your data. <span className="text-gradient">Both deserve care.</span>
              </motion.h2>

              {/* Emotional sub-line */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22, duration: 0.5 }}
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.125rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  margin: "0 0 2rem",
                  maxWidth: "38ch",
                  opacity: 0.85,
                }}
              >
                We make money when you save money. Not from your data.
              </motion.p>

              {/* Plain-English pledge list */}
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.4 }}
                aria-label="Security commitments"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  "No bank login required. EXPOZOR does not collect bank credentials.",
                  "Expense tracking only. EXPOZOR does not initiate payments.",
                  "We use HTTPS for all data in transit.",
                  "Your data is not sold, shared, or used for advertising.",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {/* Mint check — acceptable here because it's a checkmark bullet, not an icon */}
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        marginTop: "2px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "var(--accent-subtle)",
                        border: "1px solid var(--border-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        fontWeight: 800,
                        color: "var(--positive)",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA link — "See our security page" */}
              <motion.a
                href="/security"
                className="security-link"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.4 }}
                aria-label="See our security page (opens the EXPOZOR security page)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--decorative)",
                  textDecoration: "none",
                  transition:
                    "color var(--dur-base) var(--ease-out), gap var(--dur-base) var(--ease-out)",
                }}
              >
                See our security page
                <ExternalLink size={14} aria-hidden="true" />
              </motion.a>
            </div>

            {/* ── RIGHT: 2×3 pledge card grid ─────────────── */}
            <ul
              aria-label="Security pledge details"
              className="pledge-grid"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {PLEDGES.map((pledge, i) => (
                <MotionLi
                  key={pledge.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    delay: 0.06 * i,
                    duration: 0.5,
                    ease: EASE_OUT,
                  }}
                  /* ── Enhancement 11: hover border-glow + lift ── */
                  whileHover={{
                    y: -3,
                    boxShadow: "0 0 0 1px var(--border-accent), 0 8px 24px rgba(0,0,0,0.4)",
                    borderColor: "var(--border-accent)",
                    transition: { duration: 0.2, ease: EASE_OUT },
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                    padding: "1.125rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-elev-2)",
                    border: "1px solid var(--border)",
                    cursor: "default",
                  }}
                >
                  {/* Icon — tints to accent-subtle on hover via CSS group trick */}
                  <motion.div
                    aria-hidden="true"
                    whileHover={{
                      background: "var(--accent-subtle)",
                      borderColor: "var(--border-accent)",
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-muted)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-primary)" /* neutral white */,
                      flexShrink: 0,
                      transition: "background 200ms ease-out, border-color 200ms ease-out",
                    }}
                  >
                    <pledge.Icon size={16} aria-hidden="true" />
                  </motion.div>

                  {/* Title */}
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {pledge.title}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {pledge.description}
                  </p>
                </MotionLi>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
