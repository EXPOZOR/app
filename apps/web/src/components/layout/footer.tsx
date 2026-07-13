"use client";

import { FOOTER } from "@/content/landing";
import { motion } from "framer-motion";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────
   SOCIAL ICON SVGs — inline, no external assets
────────────────────────────────────────────────────────────── */

/** X (formerly Twitter) logo */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true">
      <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284zM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854z" />
    </svg>
  );
}

/** GitHub mark */
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   SOCIAL ICON BUTTON
────────────────────────────────────────────────────────────── */
function SocialButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "Twitter" | "Github";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bg-elev-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        textDecoration: "none",
        transition:
          "color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "var(--text-primary)";
        el.style.borderColor = "var(--border-strong)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "var(--text-muted)";
        el.style.borderColor = "var(--border)";
      }}
    >
      {icon === "Twitter" ? <XIcon size={13} /> : <GitHubIcon size={14} />}
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER LINK — single link item with hover colour shift
────────────────────────────────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        style={{
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          textDecoration: "none",
          transition: "color var(--dur-base) var(--ease-out)",
          display: "inline-block",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
        }}
      >
        {label}
      </Link>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER — main export
   Layout (desktop, ≥1024px):
     Col 1 (span-2): Brand + tagline + socials + waitlist nudge
     Col 2-4:        Product / Company / Legal nav columns
────────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer
      aria-label="EXPOZOR site footer"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient glow — top edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--decorative) 30%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ paddingTop: "3.5rem", paddingBottom: "2.5rem" }}>
        {/* ── TOP GRID ──────────────────────────────────── */}
        <div className="footer-grid">
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                aria-hidden="true"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, var(--brand-mint) 0%, var(--brand-lilac) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#0A0A0B",
                  flexShrink: 0,
                }}
              >
                E
              </span>
              <span
                className="text-gradient"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                EXPOZOR
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              {FOOTER.tagline}
            </p>

            {/* Early Access label — no certification claim */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 8px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border)",
                background: "var(--bg-elev-2)",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.04em",
                }}
              >
                Early Access
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {FOOTER.socials.map((s) => (
                <SocialButton
                  key={s.label}
                  href={s.href}
                  label={s.label}
                  icon={s.icon as "Twitter" | "Github"}
                />
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER.columns.map((col) => (
            <nav key={col.heading} aria-label={`${col.heading} links`}>
              <h2
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  margin: "0 0 1rem",
                }}
              >
                {col.heading}
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {col.links.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── BOTTOM BAR ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Copyright + "made with" */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {FOOTER.legal}
          </p>

          {/* Waitlist nudge — right side */}
          <a
            href="/#waitlist"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "opacity var(--dur-base) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            Join the waitlist →
          </a>
        </motion.div>
      </div>

      {/* Scoped responsive grid */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem 2rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 2rem 4rem;
          }
        }
      `}</style>
    </footer>
  );
}
