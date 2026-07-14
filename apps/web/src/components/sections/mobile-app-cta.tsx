import { buttonClassName } from "@/components/ui/button";
import { MotionDiv, MotionH2, MotionP } from "@/components/ui/motion-primitives";
import { EASE_OUT } from "@/lib/motion";
import {
  ArrowRight,
  Camera,
  ChartNoAxesCombined,
  Clapperboard,
  Clock3,
  CreditCard,
  type LucideIcon,
  Settings,
  ShoppingCart,
  Smartphone,
  Zap,
} from "lucide-react";

const motion = {
  div: MotionDiv,
  h2: MotionH2,
  p: MotionP,
};

type ProductIconTone = "positive" | "accent" | "info" | "warn" | "neutral";
type ProductIconSize = "xs" | "sm" | "md";

const PRODUCT_ICON_TONES: Record<
  ProductIconTone,
  { foreground: string; surface: string; border: string }
> = {
  positive: {
    foreground: "var(--positive)",
    surface: "var(--positive-subtle)",
    border: "var(--positive-border)",
  },
  accent: {
    foreground: "var(--decorative)",
    surface: "var(--decorative-subtle)",
    border: "var(--border-accent)",
  },
  info: {
    foreground: "var(--info)",
    surface: "var(--info-subtle)",
    border: "color-mix(in oklch, var(--info) 30%, transparent)",
  },
  warn: {
    foreground: "var(--warn)",
    surface: "var(--warn-subtle)",
    border: "color-mix(in oklch, var(--warn) 30%, transparent)",
  },
  neutral: {
    foreground: "var(--text-secondary)",
    surface: "var(--bg-overlay)",
    border: "var(--border)",
  },
};

const PRODUCT_ICON_SIZES: Record<
  ProductIconSize,
  { container: number; icon: number; radius: number }
> = {
  xs: { container: 18, icon: 10, radius: 6 },
  sm: { container: 28, icon: 14, radius: 8 },
  md: { container: 36, icon: 18, radius: 10 },
};

function ProductIcon({
  icon: Icon,
  tone = "neutral",
  size = "sm",
}: {
  icon: LucideIcon;
  tone?: ProductIconTone;
  size?: ProductIconSize;
}) {
  const colors = PRODUCT_ICON_TONES[tone];
  const dimensions = PRODUCT_ICON_SIZES[size];

  return (
    <span
      aria-hidden="true"
      style={{
        width: `${dimensions.container}px`,
        height: `${dimensions.container}px`,
        borderRadius: `${dimensions.radius}px`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.foreground,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        flexShrink: 0,
      }}
    >
      <Icon size={dimensions.icon} strokeWidth={1.8} />
    </span>
  );
}

const MOBILE_TRANSACTIONS = [
  {
    icon: ShoppingCart,
    label: "Grocery Store",
    amount: "-$94",
    tone: "positive",
  },
  { icon: Zap, label: "Electricity", amount: "-$62", tone: "warn" },
  { icon: Clapperboard, label: "Streaming", amount: "-$18", tone: "accent" },
] satisfies Array<{
  icon: LucideIcon;
  label: string;
  amount: string;
  tone: ProductIconTone;
}>;

const MOBILE_NAV_ITEMS = [
  { icon: ChartNoAxesCombined, label: "Overview", active: true },
  { icon: CreditCard, label: "Expenses", active: false },
  { icon: Camera, label: "Capture", active: false },
  { icon: Settings, label: "Settings", active: false },
] satisfies Array<{ icon: LucideIcon; label: string; active: boolean }>;

/* ──────────────────────────────────────────────────────────────
   PHONE MOCKUP — CSS-drawn device frame with mini app UI inside
   Dimensions: ~220×440px at 1×. No external images.
────────────────────────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateY: -4 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.25, duration: 0.75, ease: EASE_OUT }}
      aria-hidden="true"
      style={{ perspective: "800px" }}
    >
      <div>
        {/* Outer frame */}
        <div
          style={{
            width: "220px",
            height: "440px",
            borderRadius: "36px",
            background: "linear-gradient(145deg, #1A1A2E 0%, #0F0F1A 100%)",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06) inset," +
              "0 32px 64px rgba(0,0,0,0.7)," +
              "0 0 40px color-mix(in oklch, var(--decorative) 12%, transparent)",
            padding: "14px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dynamic island / notch */}
          <div
            style={{
              alignSelf: "center",
              width: "80px",
              height: "22px",
              borderRadius: "12px",
              background: "#000",
              marginBottom: "8px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1C1C1E" }}
            />
            <div
              style={{ width: "18px", height: "10px", borderRadius: "5px", background: "#1C1C1E" }}
            />
          </div>

          {/* Screen content */}
          <div
            style={{
              flex: 1,
              borderRadius: "22px",
              background: "#0A0A10",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              padding: "10px 10px 6px",
              gap: "8px",
            }}
          >
            {/* App header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "-0.01em",
                }}
              >
                EXPOZOR
              </span>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--brand-mint) 0%, var(--accent-hover) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  fontWeight: 800,
                  color: "#0A0A0B",
                }}
              >
                JD
              </div>
            </div>

            {/* Balance card */}
            <div
              style={{
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, color-mix(in oklch, var(--decorative) 15%, transparent) 0%, color-mix(in oklch, var(--info) 8%, transparent) 100%)",
                border: "1px solid color-mix(in oklch, var(--decorative) 20%, transparent)",
                padding: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "7px",
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 2px",
                  fontWeight: 500,
                }}
              >
                MONTHLY SPENDING
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 6px",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                $624.40
              </p>
              <div style={{ display: "flex", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "6px",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    background: "var(--positive-subtle)",
                    color: "var(--positive)",
                    fontWeight: 700,
                  }}
                >
                  ↓ $42 vs last month
                </span>
              </div>
            </div>

            {/* Mini budget bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[
                { label: "Food", pct: 68, color: "var(--positive)" },
                { label: "Shopping", pct: 42, color: "#A78BFA" },
                { label: "Transport", pct: 85, color: "#60A5FA" },
              ].map((b) => (
                <div key={b.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "2px",
                    }}
                  >
                    <span
                      style={{ fontSize: "6px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}
                    >
                      {b.label}
                    </span>
                    <span style={{ fontSize: "6px", color: "rgba(255,255,255,0.4)" }}>
                      {b.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      borderRadius: "2px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        width: `${b.pct}%`,
                        height: "100%",
                        borderRadius: "2px",
                        background: b.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent transactions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p
                style={{
                  fontSize: "7px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 2px",
                  letterSpacing: "0.06em",
                }}
              >
                RECENT
              </p>
              {MOBILE_TRANSACTIONS.map((tx) => {
                const colors = PRODUCT_ICON_TONES[tx.tone];

                return (
                  <div
                    key={tx.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "4px 6px",
                      borderRadius: "7px",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <ProductIcon icon={tx.icon} tone={tx.tone} size="xs" />
                    <span
                      style={{
                        flex: 1,
                        fontSize: "7px",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 500,
                      }}
                    >
                      {tx.label}
                    </span>
                    <span style={{ fontSize: "7px", fontWeight: 700, color: colors.foreground }}>
                      {tx.amount}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom nav bar */}
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "6px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {MOBILE_NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    title={item.label}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: item.active ? "var(--positive-subtle)" : "transparent",
                      color: item.active ? "var(--positive)" : "rgba(255,255,255,0.42)",
                    }}
                  >
                    <Icon size={12} strokeWidth={1.8} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Home indicator */}
          <div
            style={{
              alignSelf: "center",
              width: "80px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.2)",
              marginTop: "8px",
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MOBILE APP CTA SECTION — main export
────────────────────────────────────────────────────────────── */
export function MobileAppCtaSection() {
  return (
    <section
      id="mobile-app"
      aria-labelledby="mobile-app-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background glow — soft purple tilt */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(167,139,250,0.06) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 20% 80%, color-mix(in oklch, var(--decorative) 4%, transparent) 0%, transparent 45%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <div className="mobile-layout">
          {/* ── LEFT: copy ──────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Eyebrow */}
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              MOBILE APP
            </motion.p>

            {/* "Coming soon" badge */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.4 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-elev-2)",
                border: "1px solid var(--border)",
                width: "fit-content",
              }}
            >
              <Clock3
                size={13}
                strokeWidth={1.8}
                style={{ color: "var(--warn)" }}
                aria-hidden="true"
              />
              <span
                style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}
              >
                Coming Q3 2026 · iOS &amp; Android
              </span>
            </motion.div>

            {/* H2 */}
            <motion.h2
              id="mobile-app-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(1.875rem, 4.5vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Your finances, <span className="text-gradient">in your pocket.</span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.0625rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "38ch",
              }}
            >
              Mobile apps are planned for early access, with manual expense entry and receipt
              capture workflows designed for phones.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.45 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
            >
              {[
                "Receipt capture planned",
                "Budget alerts planned",
                "Biometrics planned",
                "Offline mode planned",
                "Widgets planned",
              ].map((feat) => (
                <span
                  key={feat}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    background: "var(--bg-elev-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {feat}
                </span>
              ))}
            </motion.div>

            {/* Neutral roadmap treatment until official store listings are live. */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.45 }}
              role="note"
              aria-label="Mobile apps planned for iOS and Android"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "fit-content",
                maxWidth: "100%",
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-elev-1)",
                border: "1px solid var(--border)",
              }}
            >
              <ProductIcon icon={Smartphone} tone="accent" size="md" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
                >
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 650,
                      color: "var(--text-primary)",
                    }}
                  >
                    iOS and Android planned
                  </span>
                  <span
                    style={{
                      padding: "2px 7px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--decorative)",
                      background: "var(--decorative-subtle)",
                      border: "1px solid var(--border-accent)",
                    }}
                  >
                    Roadmap
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    lineHeight: 1.45,
                    color: "var(--text-muted)",
                  }}
                >
                  Official store links will appear when the apps are ready.
                </p>
              </div>
            </motion.div>

            {/* Canonical early-access CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.34, duration: 0.45 }}
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Get mobile launch updates
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                One signup for early access and mobile availability updates.
              </p>
              <a
                href="/#waitlist"
                aria-label="Join early access for EXPOZOR mobile launch updates"
                className={buttonClassName({ variant: "primary", size: "lg" })}
                style={{ width: "fit-content" }}
              >
                Join early access
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: phone mockup ──────────────────────── */}
          <div
            className="phone-col"
            style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}
          >
            {/* Ambient glow behind phone */}
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-40px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--decorative) 15%, transparent) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        .mobile-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        .phone-col { order: -1; }

        @media (min-width: 768px) {
          .phone-col { order: 0; }
        }

        @media (min-width: 900px) {
          .mobile-layout {
            grid-template-columns: 1fr auto;
            gap: 4rem;
          }
        }

      `}</style>
    </section>
  );
}
