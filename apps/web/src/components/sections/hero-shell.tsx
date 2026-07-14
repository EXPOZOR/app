import { HeroVisual } from "@/components/sections/hero";
import { buttonClassName } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP, MotionSpan } from "@/components/ui/motion-primitives";
import { HERO } from "@/content/landing";
import { DUR, EASE_OUT } from "@/lib/motion";
import { ArrowRight, Play } from "lucide-react";

const motion = {
  div: MotionDiv,
  h1: MotionH1,
  p: MotionP,
  span: MotionSpan,
};

/** Server-rendered hero shell with the animated product preview as a client island. */
export function HeroSection() {
  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-headline"
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "calc(var(--space-hero) + 72px)",
          paddingBottom: "var(--space-hero)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(167,139,250,0.09) 0%, rgba(167,139,250,0.03) 45%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "mesh-pulse-2 20s ease-in-out infinite",
          }}
        />

        <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="lg:hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
                maxWidth: "580px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.5, ease: EASE_OUT }}
              >
                <span
                  aria-label="AI-Powered Finance — private beta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    border: "1px solid color-mix(in oklch, var(--decorative) 35%, transparent)",
                    color: "var(--decorative)",
                    background:
                      "linear-gradient(110deg, var(--decorative-subtle) 0%, color-mix(in oklch, var(--decorative) 30%, transparent) 45%, var(--decorative-subtle) 60%)",
                    backgroundSize: "200% auto",
                    animation: "shimmer 4s linear infinite",
                    position: "relative",
                    cursor: "default",
                  }}
                >
                  ✦ AI-Powered Finance
                </span>
              </motion.div>

              <motion.h1
                id="hero-headline"
                aria-label={HERO.headline}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.18 },
                  },
                }}
                style={{
                  fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.08,
                  color: "var(--text-primary)",
                  margin: 0,
                  display: "block",
                }}
              >
                {["Know", "where", "your", "money", "is"].map((word) => (
                  <motion.span
                    key={word}
                    aria-hidden="true"
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: DUR.reveal, ease: EASE_OUT },
                      },
                    }}
                    style={{ display: "inline-block", marginRight: "0.22em" }}
                  >
                    {word}
                  </motion.span>
                ))}

                {["really", "going."].map((word, index) => (
                  <motion.span
                    key={word}
                    aria-hidden="true"
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: DUR.reveal, ease: EASE_OUT },
                      },
                    }}
                    style={{
                      display: "inline-block",
                      marginRight: index === 0 ? "0.22em" : 0,
                      background: "linear-gradient(135deg, var(--accent-2) 0%, var(--info) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.6, ease: EASE_OUT }}
                style={{
                  fontSize: "clamp(1.0625rem, 2vw, 1.1875rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "46ch",
                  opacity: 0.85,
                }}
              >
                {HERO.subhead}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.6, ease: EASE_OUT }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  width: "100%",
                  maxWidth: "520px",
                }}
              >
                <a
                  href="/#waitlist"
                  aria-label={HERO.ctaAriaLabel}
                  className={buttonClassName({ variant: "primary", size: "lg" })}
                  style={{ width: "fit-content" }}
                >
                  {HERO.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>

                <div>
                  <a
                    href="#demo"
                    aria-label={HERO.secondaryCtaAriaLabel}
                    className="hero-demo-link"
                  >
                    <span className="hero-demo-icon" aria-hidden="true">
                      <Play size={10} fill="currentColor" style={{ marginLeft: "1px" }} />
                    </span>
                    {HERO.secondaryCta}
                  </a>
                </div>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {HERO.microcopy}
                </p>
              </motion.div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      <style>{`
        .hero-demo-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.5rem 1rem;
          min-height: 44px;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
        }

        .hero-demo-link:hover {
          color: var(--text-primary);
          background: var(--bg-elev-2);
        }

        .hero-demo-icon {
          width: 26px;
          height: 26px;
          border: 1px solid var(--border-strong);
          border-radius: 50%;
          background: var(--bg-elev-2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .lg\\:hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </>
  );
}
