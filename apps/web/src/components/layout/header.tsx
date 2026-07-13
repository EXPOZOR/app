"use client";

import { NAVBAR } from "@/content/landing";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Scroll thresholds (px)
   60  → glass effect kicks in (background + hairline)
   200 → "Private Beta" pill appears next to logo
   The height compresses from 72px → 56px at 60px.
────────────────────────────────────────────────────────────── */
const SCROLL_GLASS = 60;
const SCROLL_PILL = 200;

/* ── Private Beta pill ──────────────────────────────────────── */
function PrivateBetaPill() {
  return (
    <motion.span
      initial={{ opacity: 0, x: -8, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -8, scale: 0.9 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Status: Private Beta"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 9px",
        borderRadius: "var(--radius-full)",
        fontSize: "0.6875rem" /* 11px */,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        border: "1px solid var(--border-accent)",
        background: "var(--accent-subtle)",
        color: "var(--accent)",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {/* Pulsing dot */}
      <span
        aria-hidden="true"
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
          animation: "pulse-dot 2.4s ease-in-out infinite",
        }}
      />
      Private Beta
    </motion.span>
  );
}

/* ── Logo mark (inline SVG–based wordmark) ──────────────────── */
function LogoMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: 800,
        background: "linear-gradient(135deg, #3DDC97 0%, #A78BFA 100%)",
        color: "#0A0A0B",
        flexShrink: 0,
        letterSpacing: "-0.02em",
      }}
    >
      E
    </span>
  );
}

/* ── Mobile full-screen sheet ───────────────────────────────── */
function MobileSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Trap focus and close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Prevent body scroll while sheet is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--z-overlay)",
            display: "flex",
            flexDirection: "column",
            background: "rgba(10,10,11,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Sheet header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1.5rem",
              height: "64px",
              borderBottom: "1px solid var(--border)",
              flexShrink: 0,
            }}
          >
            <Link
              href="/"
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "1.0625rem",
                letterSpacing: "-0.02em",
                minHeight: "44px",
              }}
              aria-label="EXPOZOR home"
            >
              <LogoMark />
              {NAVBAR.logo}
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-sm)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition:
                  "color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elev-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Nav links — scrollable middle */}
          <nav
            aria-label="Mobile navigation"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {NAVBAR.links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  style={{
                    display: "block",
                    padding: "0.875rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition:
                      "color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elev-2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Divider */}
            <div
              aria-hidden="true"
              style={{
                height: "1px",
                background: "var(--border)",
                margin: "1rem 0",
              }}
            />

            {/* Sign in */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.05 + NAVBAR.links.length * 0.04 + 0.04,
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={NAVBAR.cta.href}
                onClick={onClose}
                style={{
                  display: "block",
                  padding: "0.875rem 1rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition:
                    "color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elev-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {NAVBAR.cta.label}
              </a>
            </motion.div>
          </nav>

          {/* Primary CTA — pinned to bottom of sheet */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid var(--border)",
              flexShrink: 0,
            }}
          >
            <a
              href={NAVBAR.cta.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "0.9375rem 1.5rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--accent)",
                color: "var(--text-inverse)",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                border: "none",
                cursor: "pointer",
                transition:
                  "background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
                minHeight: "52px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-hover)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-glow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Get early access
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <p
              style={{
                textAlign: "center",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginTop: "0.625rem",
                lineHeight: 1.4,
              }}
            >
              No credit card required for the waitlist
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Header ─────────────────────────────────────────────────── */
export function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Fire once on mount to capture initial position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isGlass = scrollY >= SCROLL_GLASS;
  const showPill = scrollY >= SCROLL_PILL;
  // Height: 72px → 56px on scroll
  const navHeight = isGlass ? "56px" : "72px";

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="banner"
        aria-label="Site navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: "var(--z-sticky)",
          /* Glass effect fades in at SCROLL_GLASS */
          background: isGlass ? "rgba(10,10,11,0.75)" : "transparent",
          backdropFilter: isGlass ? "blur(16px) saturate(160%)" : "none",
          WebkitBackdropFilter: isGlass ? "blur(16px) saturate(160%)" : "none",
          borderBottom: isGlass ? "1px solid var(--border)" : "1px solid transparent",
          /* Height compression via transition */
          height: navHeight,
          transition: [
            "height 300ms cubic-bezier(0.22,1,0.36,1)",
            "background 300ms cubic-bezier(0.22,1,0.36,1)",
            "backdrop-filter 300ms cubic-bezier(0.22,1,0.36,1)",
            "border-color 300ms cubic-bezier(0.22,1,0.36,1)",
          ].join(", "),
        }}
      >
        <div
          className="container-site"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            gap: "1.5rem",
          }}
        >
          {/* ── Logo + Private Beta pill ────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "1.0625rem",
                letterSpacing: "-0.02em",
                transition: "opacity var(--dur-base) var(--ease-out)",
                minHeight: "44px",
              }}
              aria-label="EXPOZOR home"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              <LogoMark />
              {NAVBAR.logo}
            </Link>

            {/* Private Beta pill — appears after 200px scroll */}
            <AnimatePresence>{showPill && <PrivateBetaPill key="beta-pill" />}</AnimatePresence>
          </div>

          {/* ── Desktop navigation ──────────────────────────── */}
          <nav
            aria-label="Primary navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              flex: 1,
              justifyContent: "center",
            }}
            className="hidden md:flex"
          >
            {NAVBAR.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                  fontWeight: 400,
                  transition: [
                    "color var(--dur-base) var(--ease-out)",
                    "background var(--dur-base) var(--ease-out)",
                  ].join(", "),
                  whiteSpace: "nowrap",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elev-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTAs ────────────────────────────────── */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {/* Sign in — ghost/outline */}
            <Link
              href={NAVBAR.cta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.4375rem 0.875rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                textDecoration: "none",
                transition: [
                  "color var(--dur-base) var(--ease-out)",
                  "border-color var(--dur-base) var(--ease-out)",
                  "background var(--dur-base) var(--ease-out)",
                ].join(", "),
                minHeight: "44px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elev-2)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-strong)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-strong)";
              }}
            >
              {NAVBAR.cta.label}
            </Link>

            {/* Get early access — solid mint, hover glow */}
            <motion.a
              href={NAVBAR.cta.href}
              whileHover={{
                scale: 1.03,
                boxShadow: "var(--shadow-glow)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "0.4375rem 1rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.875rem",
                fontWeight: 600,
                background: "var(--accent)",
                color: "var(--text-inverse)",
                border: "1px solid transparent",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                minHeight: "44px",
                whiteSpace: "nowrap",
                transition: "background var(--dur-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
              }}
            >
              {NAVBAR.cta.label}
            </motion.a>
          </div>

          {/* ── Mobile hamburger ────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              flexShrink: 0,
              transition:
                "color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elev-2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen sheet ─────────────────────────── */}
      {/* Rendered outside the header so it covers the full viewport */}
      <MobileSheet open={mobileOpen} onClose={closeMenu} />
    </>
  );
}
