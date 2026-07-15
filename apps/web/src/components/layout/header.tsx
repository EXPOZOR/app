"use client";

import { NAVBAR } from "@/content/landing";
import { TRANSITION } from "@/lib/motion";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Scroll thresholds (px)
   60  → glass effect kicks in (background + hairline)
   200 → "Private Beta" pill appears next to logo
   The height compresses from 72px → 56px at 60px.
────────────────────────────────────────────────────────────── */
const SCROLL_GLASS = 60;
const SCROLL_PILL = 200;
const INITIAL_SCROLL_STATE = {
  isGlass: false,
  showPill: false,
};

function isActiveNavPath(pathname: string, href: string) {
  const targetPath = href.split("#")[0];

  if (!targetPath || targetPath === "/") return false;

  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

/* ── Private Beta pill ──────────────────────────────────────── */
function PrivateBetaPill() {
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();

  return (
    <motion.span
      initial={shouldReduceMotion ? false : { opacity: 0, x: -8, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.9 }}
      transition={shouldReduceMotion ? TRANSITION.instant : TRANSITION.slow}
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
      {/* Static status dot: the label already communicates the state. */}
      <span
        aria-hidden="true"
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
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
        background: "linear-gradient(135deg, var(--brand-mint) 0%, var(--brand-lilac) 100%)",
        color: "#0A0A0B",
        flexShrink: 0,
        letterSpacing: "-0.02em",
      }}
    >
      E
    </span>
  );
}

type MobileMenuCloseReason = "dismiss" | "navigation";

/* ── Mobile full-screen dialog ─────────────────────────────── */
function MobileSheet({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeReasonRef = useRef<MobileMenuCloseReason>("dismiss");
  const bodyScrollRef = useRef({ locked: false, overflow: "" });

  const restoreBodyScroll = useCallback(() => {
    if (!bodyScrollRef.current.locked) return;

    document.body.style.overflow = bodyScrollRef.current.overflow;
    bodyScrollRef.current.locked = false;
  }, []);

  const finishClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();

    restoreBodyScroll();

    if (closeReasonRef.current !== "dismiss") return;

    const returnTarget = returnFocusRef.current;
    if (!returnTarget?.isConnected || returnTarget.getClientRects().length === 0) return;

    window.requestAnimationFrame(() => returnTarget.focus({ preventScroll: true }));
  }, [restoreBodyScroll, returnFocusRef]);

  const requestClose = useCallback(
    (reason: MobileMenuCloseReason) => {
      closeReasonRef.current = reason;
      onClose();
    },
    [onClose],
  );

  // showModal supplies the focus trap and makes the rest of the document inert.
  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    closeReasonRef.current = "dismiss";

    if (!bodyScrollRef.current.locked) {
      bodyScrollRef.current = {
        locked: true,
        overflow: document.body.style.overflow,
      };
      document.body.style.overflow = "hidden";
    }

    if (!dialog.open) dialog.showModal();

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [open]);

  // Restore global page state if a route change unmounts an open dialog.
  useEffect(() => {
    return () => {
      const dialog = dialogRef.current;
      if (dialog?.open) dialog.close();
      restoreBodyScroll();
    };
  }, [restoreBodyScroll]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label="Navigation menu"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        requestClose("dismiss");
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;

        event.preventDefault();
        requestClose("dismiss");
      }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        maxWidth: "none",
        height: "100dvh",
        maxHeight: "none",
        margin: 0,
        padding: 0,
        border: "none",
        background: "transparent",
        color: "inherit",
        overflow: "hidden",
      }}
    >
      <AnimatePresence onExitComplete={finishClose}>
        {open && (
          <motion.div
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
                onClick={() => requestClose("navigation")}
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
              >
                <LogoMark />
                {NAVBAR.logo}
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => requestClose("dismiss")}
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
                    onClick={() => requestClose("navigation")}
                    aria-current={isActiveNavPath(pathname, link.href) ? "page" : undefined}
                    style={{
                      display: "block",
                      padding: "0.875rem 1rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: isActiveNavPath(pathname, link.href)
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                      background: isActiveNavPath(pathname, link.href)
                        ? "var(--bg-elev-2)"
                        : "transparent",
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
                      (e.currentTarget as HTMLAnchorElement).style.color = isActiveNavPath(
                        pathname,
                        link.href,
                      )
                        ? "var(--text-primary)"
                        : "var(--text-secondary)";
                      (e.currentTarget as HTMLAnchorElement).style.background = isActiveNavPath(
                        pathname,
                        link.href,
                      )
                        ? "var(--bg-elev-2)"
                        : "transparent";
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
                  onClick={() => requestClose("navigation")}
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
                onClick={() => requestClose("navigation")}
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
                {NAVBAR.cta.label}
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
    </dialog>
  );
}

/* ── Header ─────────────────────────────────────────────────── */
export function Header() {
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();
  const pathname = usePathname();
  const [scrollState, setScrollState] = useState(INITIAL_SCROLL_STATE);
  const scrollStateRef = useRef(INITIAL_SCROLL_STATE);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const syncScrollThresholds = useCallback(() => {
    const nextIsGlass = window.scrollY >= SCROLL_GLASS;
    const nextShowPill = window.scrollY >= SCROLL_PILL;
    const currentState = scrollStateRef.current;

    if (currentState.isGlass === nextIsGlass && currentState.showPill === nextShowPill) return;

    const nextState = {
      isGlass: nextIsGlass,
      showPill: nextShowPill,
    };
    scrollStateRef.current = nextState;
    setScrollState(nextState);
  }, []);

  useEffect(() => {
    // Fire once on mount to capture initial position
    syncScrollThresholds();
    window.addEventListener("scroll", syncScrollThresholds, { passive: true });
    return () => window.removeEventListener("scroll", syncScrollThresholds);
  }, [syncScrollThresholds]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { isGlass, showPill } = scrollState;
  // Height: 72px → 56px on scroll
  const navHeight = isGlass ? "56px" : "72px";

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={shouldReduceMotion ? TRANSITION.instant : TRANSITION.reveal}
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
              alignItems: "center",
              gap: "2px",
              flex: 1,
              justifyContent: "center",
            }}
            className="hidden lg:flex"
          >
            {NAVBAR.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActiveNavPath(pathname, link.href) ? "page" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.875rem",
                  color: isActiveNavPath(pathname, link.href)
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  background: isActiveNavPath(pathname, link.href)
                    ? "var(--bg-elev-2)"
                    : "transparent",
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
                  (e.currentTarget as HTMLAnchorElement).style.color = isActiveNavPath(
                    pathname,
                    link.href,
                  )
                    ? "var(--text-primary)"
                    : "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = isActiveNavPath(
                    pathname,
                    link.href,
                  )
                    ? "var(--bg-elev-2)"
                    : "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTAs ────────────────────────────────── */}
          <div
            className="hidden lg:flex"
            style={{
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {/* Single primary early-access action */}
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
            ref={mobileMenuButtonRef}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setMobileOpen(true)}
            className="flex lg:hidden"
            style={{
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
      <MobileSheet open={mobileOpen} onClose={closeMenu} returnFocusRef={mobileMenuButtonRef} />
    </>
  );
}
