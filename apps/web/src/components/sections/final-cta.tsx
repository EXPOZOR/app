import {
  MotionDiv,
  MotionH2,
  MotionLi,
  MotionP,
  MotionUl,
} from "@/components/ui/motion-primitives";
import { WaitlistCelebrationForm } from "@/components/waitlist-celebration-form";
import { FINAL_CTA } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";
import { Check } from "lucide-react";

const motion = {
  div: MotionDiv,
  h2: MotionH2,
  li: MotionLi,
  p: MotionP,
  ul: MotionUl,
};

/** Server-rendered final CTA with one isolated interactive form boundary. */
export function FinalCtaSection() {
  return (
    <section
      id="waitlist"
      aria-labelledby="final-cta-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
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

            <motion.h2
              id="final-cta-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07, duration: 0.55, ease: EASE_OUT }}
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

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.13, duration: 0.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: "0 auto 1.75rem",
                maxWidth: "44ch",
              }}
            >
              {FINAL_CTA.subhead}
            </motion.p>

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
              {FINAL_CTA.bullets.map((bullet, index) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
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
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>

            <WaitlistCelebrationForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
