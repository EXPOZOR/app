"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Sparkles, Lock } from "lucide-react";
import { PRICING } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────────── */
function formatPrice(price: number): string {
  if (price === 0) return "Free";
  const r = Math.round(price * 100) / 100;
  return `$${r % 1 === 0 ? r.toFixed(0) : r.toFixed(2)}`;
}

/* ──────────────────────────────────────────────────────────────
   BILLING TOGGLE
   Uses role="radiogroup" / role="radio" / aria-checked per spec.
────────────────────────────────────────────────────────────── */
function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.4 }}
      role="radiogroup"
      aria-label="Billing frequency"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        padding: "4px",
        borderRadius: "var(--radius-full)",
        background: "var(--bg-elev-2)",
        border: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {(
        [
          { label: "Monthly", value: false },
          { label: "Annual",  value: true  },
        ] as const
      ).map((opt) => {
        const active = annual === opt.value;
        return (
          <button
            key={opt.label}
            role="radio"
            aria-checked={active}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.4375rem 1.125rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              /* Background handled by layoutId pill below — keep transparent here */
              background: "transparent",
              color: active ? "var(--text-primary)" : "var(--text-muted)",
              transition: "color var(--dur-base) var(--ease-out)",
              letterSpacing: "-0.01em",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* ── Enhancement 8: sliding pill via layoutId ── */}
            {active && (
              <motion.span
                layoutId="billing-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "var(--radius-full)",
                  background: "var(--bg-elev-1)",
                  boxShadow: "var(--shadow-card)",
                  zIndex: -1,
                }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
              />
            )}
            {opt.label}
            {opt.value && (
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "1px 5px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--accent-subtle)",
                  color: "var(--accent)",
                  border: "1px solid var(--border-accent)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}
              >
                SAVE {PRICING.annualDiscount}%
              </span>
            )}
          </button>
        );
      })}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PRICING CARD
   Pro card gets full mint treatment:
   - Mint border gradient
   - Mint "Most popular" badge (pill)
   - Mint CTA button (primary)
   - Mint section glow
────────────────────────────────────────────────────────────── */
function PricingCard({
  tier,
  annual,
  index,
}: {
  tier: (typeof PRICING.tiers)[number];
  annual: boolean;
  index: number;
}) {
  const price  = annual ? tier.priceAnnual : tier.priceMonthly;
  const isPro  = tier.highlight;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: EASE_OUT }}
      /* ── Enhancement 8: ambient glow pulse on Pro card ──
         Looping boxShadow breathes between dim and vivid mint.
         Non-Pro cards: no animate loop — plain static boxShadow. */
      animate={isPro ? {
        boxShadow: [
          "0 0 0 1px rgba(61,220,151,0.08), 0 8px 40px rgba(0,0,0,0.5)",
          "0 0 0 1px rgba(61,220,151,0.22), 0 8px 40px rgba(0,0,0,0.5), 0 0 28px rgba(61,220,151,0.12)",
          "0 0 0 1px rgba(61,220,151,0.08), 0 8px 40px rgba(0,0,0,0.5)",
        ],
        transition: {
          delay: 0.6,
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      } : {}}
      aria-label={`${tier.name} plan`}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "1.75rem",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--bg-elev-1)",
        border: isPro
          ? "1.5px solid rgba(61,220,151,0.45)"   /* mint border on Pro */
          : "1px solid var(--border)",
        boxShadow: isPro
          ? "0 0 0 1px rgba(61,220,151,0.08), 0 8px 40px rgba(0,0,0,0.5)"
          : "none",
      }}
    >
      {/* Pro: mint radial glow behind card */}
      {isPro && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(61,220,151,0.08) 0%, transparent 60%)",
          }}
        />
      )}

      {/* "Most popular" badge — mint (#3DDC97) per brief */}
      {"badge" in tier && tier.badge && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "3px 8px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.5625rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border-accent)",
            color: "var(--accent)",
          }}
        >
          <Sparkles size={8} aria-hidden="true" />
          {tier.badge}
        </div>
      )}

      {/* Tier name + tagline */}
      <div style={{ marginBottom: "1.25rem", paddingRight: "badge" in tier && tier.badge ? "70px" : "0" }}>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: isPro ? "var(--accent)" : "var(--text-primary)",
            margin: "0 0 3px",
          }}
        >
          {tier.name}
        </h3>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
          {tier.tagline}
        </p>
      </div>

      {/* Price — AnimatePresence crossfade on toggle */}
      <div style={{ marginBottom: "1.5rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tier.id}-${annual}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "baseline", gap: "5px" }}
          >
            <span
              style={{
                fontSize: "clamp(1.875rem, 4vw, 2.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatPrice(price)}
            </span>
            {tier.priceMonthly > 0 && (
              <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                /mo{annual ? " · billed annually" : ""}
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Annual savings */}
        {annual && tier.priceMonthly > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--positive)",
              margin: "5px 0 0",
            }}
          >
            Save ${((tier.priceMonthly - tier.priceAnnual) * 12).toFixed(2)} per year
          </motion.p>
        )}
      </div>

      {/* CTA */}
      <motion.a
        href="#waitlist"
        whileHover={{ scale: 1.02, ...(isPro ? { boxShadow: "var(--shadow-glow)" } : {}) }}
        whileTap={{ scale: 0.98 }}
        aria-label={`${tier.cta} — ${tier.name} plan`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "0.625rem 1rem",
          borderRadius: "var(--radius-md)",
          fontSize: "0.875rem",
          fontWeight: 600,
          textDecoration: "none",
          marginBottom: "1.5rem",
          letterSpacing: "-0.01em",
          cursor: "pointer",
          border: "1px solid",
          transition: "all var(--dur-base) var(--ease-out)",
          // Pro → mint primary; others → ghost
          background: isPro ? "var(--accent)" : "transparent",
          borderColor: isPro ? "var(--accent)" : "var(--border)",
          color: isPro ? "var(--text-inverse)" : "var(--text-secondary)",
        }}
      >
        {tier.cta}
        {isPro && <Lock size={12} aria-hidden="true" />}
      </motion.a>

      {/* Feature list */}
      <ul
        aria-label={`${tier.name} plan features`}
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
          flex: 1,
        }}
      >
        {tier.features.map((feat) => (
          <li
            key={feat}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <Check
              size={14}
              style={{
                color: isPro ? "var(--accent)" : "var(--text-muted)",
                flexShrink: 0,
                marginTop: "2px",
              }}
              aria-hidden="true"
            />
            {feat}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────
   COMPARISON TABLE
   Full a11y: <caption>, scope="col"/"row", aria-label on ✓/—
────────────────────────────────────────────────────────────── */
const TABLE_TIER_IDS = ["free", "plus", "pro", "family"] as const;
type TableTierId = (typeof TABLE_TIER_IDS)[number];

function ComparisonTable({ annual }: { annual: boolean }) {
  const tiers = PRICING.tiers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginTop: "3rem",
        overflowX: "auto",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}
        aria-label="Full feature comparison across all pricing tiers"
      >
        <caption
          style={{
            captionSide: "top",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            padding: "0.75rem 1.25rem",
            textAlign: "left",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            background: "var(--bg-elev-2)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          Feature comparison
        </caption>

        {/* Column header row */}
        <thead>
          <tr style={{ background: "var(--bg-elev-2)", borderBottom: "1px solid var(--border)" }}>
            <th
              scope="col"
              style={{
                textAlign: "left",
                padding: "0.875rem 1.25rem",
                width: "34%",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Feature
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                style={{
                  padding: "0.875rem 0.75rem",
                  textAlign: "center",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: tier.highlight ? "var(--accent)" : "var(--text-primary)",
                }}
              >
                {tier.name}
                <div style={{
                  fontSize: "0.6875rem", fontWeight: 400,
                  color: "var(--text-muted)", marginTop: "2px",
                }}>
                  {formatPrice(annual ? tier.priceAnnual : tier.priceMonthly)}
                  {tier.priceMonthly > 0 && "/mo"}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {PRICING.comparisonFeatures.map((row, i) => (
            <tr
              key={row.label}
              style={{
                background: i % 2 === 0 ? "var(--bg-elev-1)" : "var(--bg-elev-2)",
                borderBottom:
                  i < PRICING.comparisonFeatures.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              <th
                scope="row"
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                }}
              >
                {row.label}
              </th>

              {TABLE_TIER_IDS.map((tierId) => {
                const val = row[tierId as keyof typeof row] as string;
                const isCheck = val === "✓";
                const isDash  = val === "—";
                const isPro   = tierId === "pro";

                return (
                  <td
                    key={tierId}
                    style={{ padding: "0.75rem 0.75rem", textAlign: "center" }}
                  >
                    {isCheck ? (
                      <Check
                        size={15}
                        style={{
                          color: isPro ? "var(--accent)" : "var(--text-secondary)",
                          display: "inline-block",
                        }}
                        aria-label="Included"
                      />
                    ) : isDash ? (
                      <Minus
                        size={15}
                        style={{ color: "var(--text-muted)", display: "inline-block" }}
                        aria-label="Not included"
                      />
                    ) : (
                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: isPro ? "var(--accent)" : "var(--text-secondary)",
                      }}>
                        {val}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PRICING SECTION — main export
────────────────────────────────────────────────────────────── */
export function PricingSection() {
  const [annual, setAnnual] = useState(true); // Default: annual (saves 20%)

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background mint radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(61,220,151,0.035) 0%, transparent 55%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        {/* ── Section header ───────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: "0.875rem" }}
          >
            PRICING
          </motion.p>

          <motion.h2
            id="pricing-heading"
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 auto 0.875rem" }}
          >
            {PRICING.title}
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            style={{ margin: "0 auto 0.5rem" }}
          >
            {PRICING.subtitle}
          </motion.p>

          {/* Founders' pricing lock-in note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              fontSize: "0.8125rem",
              color: "var(--accent)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              margin: "0 auto 1.75rem",
            }}
          >
            <Lock size={12} aria-hidden="true" />
            Founders' pricing locked in for life — prices will increase at launch
          </motion.p>

          {/* Billing toggle */}
          <BillingToggle annual={annual} onChange={setAnnual} />
        </div>

        {/* ── Pricing cards ────────────────────────────────── */}
        <div className="pricing-grid">
          {PRICING.tiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} annual={annual} index={i} />
          ))}
        </div>

        {/* ── Comparison table ─────────────────────────────── */}
        <ComparisonTable annual={annual} />

        {/* ── Fine print ───────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          All prices in USD. Cancel anytime — no dark patterns.{" "}
          Free plan available with no time limit.
        </motion.p>
      </div>

      {/* Scoped grid responsive */}
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .pricing-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
