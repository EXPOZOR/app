import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { cardClassName } from "@/components/ui/card";
import { MotionA, MotionArticle, MotionDiv, MotionP } from "@/components/ui/motion-primitives";
import { SectionHeader } from "@/components/ui/section-header";
import { PRICING } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";
import { Check, Sparkles } from "lucide-react";

const motion = {
  a: MotionA,
  article: MotionArticle,
  div: MotionDiv,
  p: MotionP,
};

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof PRICING.tiers)[number];
  index: number;
}) {
  const isHighlighted = tier.highlight;
  const price = tier.id === "free" ? "$0" : "Planned";

  return (
    <motion.article
      className={cardClassName({
        surface: "elevated",
        className: "relative flex flex-col overflow-hidden p-7",
      })}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: EASE_OUT }}
      aria-label={`${tier.name} planned package`}
      style={{
        position: "relative",
        border: isHighlighted
          ? "1.5px solid color-mix(in oklch, var(--accent) 45%, transparent)"
          : "1px solid var(--border)",
        boxShadow: isHighlighted
          ? "0 0 0 1px color-mix(in oklch, var(--accent) 8%, transparent), 0 8px 40px rgba(0,0,0,0.5)"
          : "none",
      }}
    >
      {isHighlighted && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--accent) 8%, transparent) 0%, transparent 60%)",
          }}
        />
      )}

      {"badge" in tier && tier.badge && (
        <Badge tone="accent" badgeSize="xs" className="absolute right-4 top-4">
          <Sparkles size={8} aria-hidden="true" />
          {tier.badge}
        </Badge>
      )}

      <div
        style={{
          marginBottom: "1.25rem",
          paddingRight: "badge" in tier && tier.badge ? "70px" : "0",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: isHighlighted ? "var(--accent)" : "var(--text-primary)",
            margin: "0 0 3px",
          }}
        >
          {tier.name}
        </h3>
        <p
          style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}
        >
          {tier.tagline}
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontSize: "clamp(1.875rem, 4vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--text-primary)",
          }}
        >
          {price}
        </span>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--text-muted)",
            margin: "6px 0 0",
          }}
        >
          Billing is not active today.
        </p>
      </div>

      <motion.a
        href="/#waitlist"
        className={buttonClassName({
          variant: isHighlighted ? "primary" : "secondary",
          size: "sm",
          fullWidth: true,
          className: "mb-6",
        })}
        whileHover={{ scale: 1.02, ...(isHighlighted ? { boxShadow: "var(--shadow-glow)" } : {}) }}
        whileTap={{ scale: 0.98 }}
        aria-label={`${tier.cta} - ${tier.name} planned package`}
      >
        {tier.cta}
      </motion.a>

      <ul
        aria-label={`${tier.name} planned features`}
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
                color: isHighlighted ? "var(--accent)" : "var(--text-muted)",
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

function ComparisonTable() {
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
        aria-label="Planned feature comparison across pricing packages"
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
          Planned feature comparison
        </caption>
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
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Feature
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                style={{
                  padding: "0.875rem 1rem",
                  textAlign: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: tier.highlight ? "var(--accent)" : "var(--text-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRICING.comparisonFeatures.map((row) => (
            <tr key={row.label} style={{ borderBottom: "1px solid var(--border)" }}>
              <th
                scope="row"
                style={{
                  padding: "0.875rem 1.25rem",
                  textAlign: "left",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                {row.label}
              </th>
              {[row.free, row.plus, row.pro, row.family].map((value, i) => (
                <td
                  key={`${row.label}-${tiers[i]?.id ?? i}`}
                  style={{
                    padding: "0.875rem 1rem",
                    textAlign: "center",
                    color: value === "Yes" ? "var(--accent)" : "var(--text-muted)",
                    fontWeight: value === "Yes" ? 700 : 500,
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export function PricingSection() {
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
            "radial-gradient(ellipse at 50% 80%, color-mix(in oklch, var(--accent) 3.5%, transparent) 0%, transparent 55%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <SectionHeader
          headingId="pricing-heading"
          eyebrow="PRICING"
          title="Billing is not active yet"
          description={`${PRICING.subtitle} Paid packages below are planned and may change before launch.`}
          className="mb-10"
        />

        <div className="pricing-grid">
          {PRICING.tiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        <ComparisonTable />

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
          No paid subscription is available today. Join early access for launch updates.
        </motion.p>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1180px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
