import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { cardClassName } from "@/components/ui/card";
import { MotionA, MotionArticle, MotionP } from "@/components/ui/motion-primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { PRICING } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";
import { ArrowRight, Check, Clock3, Eye, Rocket } from "lucide-react";

const motion = {
  a: MotionA,
  article: MotionArticle,
  p: MotionP,
};

const STAGE_VISUALS = {
  available: {
    Icon: Eye,
    color: "var(--positive)",
    background: "var(--positive-subtle)",
    border: "var(--positive-border)",
  },
  "first-release": {
    Icon: Rocket,
    color: "var(--decorative)",
    background: "var(--decorative-subtle)",
    border: "color-mix(in oklch, var(--decorative) 30%, transparent)",
  },
  roadmap: {
    Icon: Clock3,
    color: "var(--info)",
    background: "var(--info-subtle)",
    border: "color-mix(in oklch, var(--info) 30%, transparent)",
  },
} as const;

export function PricingSection({ headingLevel = 2 }: { headingLevel?: 1 | 2 } = {}) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
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
            "radial-gradient(ellipse at 35% 65%, color-mix(in oklch, var(--accent) 4%, transparent) 0%, transparent 58%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <SectionHeader
          headingId="pricing-heading"
          eyebrow="EARLY ACCESS"
          title={PRICING.title}
          description={PRICING.subtitle}
          headingLevel={headingLevel}
          className="mb-10"
        />

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <motion.article
            className={cardClassName({
              surface: "elevated",
              className: "relative overflow-hidden p-6 sm:p-8",
            })}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            style={{
              border: "1px solid var(--border-accent)",
              boxShadow:
                "0 0 0 1px color-mix(in oklch, var(--accent) 6%, transparent), var(--shadow-card)",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse at 25% 0%, color-mix(in oklch, var(--accent) 9%, transparent) 0%, transparent 62%)",
              }}
            />

            <div className="relative">
              <Badge tone="accent" badgeSize="xs" status>
                {PRICING.offer.badge}
              </Badge>

              <div className="mt-5">
                <h3 className="text-xl font-semibold text-text-primary">{PRICING.offer.name}</h3>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-semibold tracking-[-0.05em] text-text-primary">
                    {PRICING.offer.price}
                  </span>
                  <span className="pb-1 text-sm text-text-muted">{PRICING.offer.priceNote}</span>
                </div>
              </div>

              <motion.a
                href="/#waitlist"
                className={buttonClassName({
                  variant: "primary",
                  size: "md",
                  fullWidth: true,
                  className: "mt-7",
                })}
                whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
                whileTap={{ scale: 0.98 }}
                aria-label="Join the EXPOZOR early access waitlist"
              >
                {PRICING.offer.cta}
                <ArrowRight size={15} aria-hidden="true" />
              </motion.a>

              <ul className="mt-7 space-y-3" aria-label="Early access details">
                {PRICING.offer.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                  >
                    <Check size={15} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.article
            className={cardClassName({ surface: "glass", className: "p-6 sm:p-8" })}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.08, duration: 0.55, ease: EASE_OUT }}
          >
            <div className="max-w-xl">
              <p className="type-eyebrow type-eyebrow-accent">PRODUCT STATUS</p>
              <h3 className="text-2xl font-semibold text-text-primary">What to expect</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                One clear sequence, without presenting future features as available today.
              </p>
            </div>

            <ol className="mt-7 space-y-3">
              {PRICING.stages.map((stage, index) => {
                const visual = STAGE_VISUALS[stage.id];
                const Icon = visual.Icon;

                return (
                  <li
                    key={stage.id}
                    className="flex gap-4 rounded-md border border-border bg-bg-elev-2 p-4"
                  >
                    <div
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-sm border"
                      style={{
                        color: visual.color,
                        background: visual.background,
                        borderColor: visual.border,
                      }}
                    >
                      <Icon size={17} strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span
                          className="text-xs font-semibold uppercase tracking-[0.07em]"
                          style={{ color: visual.color }}
                        >
                          {stage.label}
                        </span>
                        <span className="text-xs text-text-tertiary">0{index + 1}</span>
                      </div>
                      <h4 className="mt-1 text-base font-semibold text-text-primary">
                        {stage.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-text-secondary">
                        {stage.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 border-t border-border pt-5 text-xs leading-5 text-text-muted">
              {PRICING.note}
            </p>
          </motion.article>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-text-muted"
        >
          Joining the waitlist does not create a paid subscription or payment obligation.
        </motion.p>
      </div>
    </section>
  );
}
