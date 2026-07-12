"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   STICKY MOBILE CTA BAR
   Spec: fixed bottom bar, mobile-only (hidden on lg+).
   - Appears after scrolling past 300px
   - Dismissible with × (hidden for rest of session via sessionStorage)
   - "Join the waitlist. No credit card."
   - aria-label on dismiss button, role="complementary" on bar
────────────────────────────────────────────────────────────── */
const DISMISS_KEY = "EXPOZOR-mobile-cta-dismissed";

export function StickyMobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  const show = visible && !dismissed;

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="mobile-cta-bar"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="complementary"
            aria-label="Waitlist sign-up prompt"
            className="mobile-cta-bar"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 80,
              padding: "0.875rem 1rem",
              background: "var(--bg-elev-1)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Copy */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: "0 0 1px",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Join the EXPOZOR waitlist
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                No credit card required
              </p>
            </div>

            {/* CTA button — in-page scroll anchor to #waitlist */}
            {/* biome-ignore lint/a11y/useValidAnchor: href="#waitlist" is valid in-page navigation; onClick only dismisses the CTA banner as a progressive enhancement */}
            <a
              href="#waitlist"
              onClick={dismiss}
              aria-label="Join the EXPOZOR waitlist"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "0.5625rem 1rem",
                borderRadius: "var(--radius-md)",
                background: "var(--accent)",
                color: "var(--text-inverse)",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                flexShrink: 0,
                transition: "background var(--dur-base) var(--ease-out)",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              Join waitlist
              <ArrowRight size={13} aria-hidden="true" />
            </a>

            {/* Dismiss × */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss waitlist prompt"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--bg-elev-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-muted)",
                flexShrink: 0,
                padding: 0,
              }}
            >
              <X size={13} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Only visible on mobile — hidden at lg+ breakpoint */}
      <style>{`
        .mobile-cta-bar {
          display: flex;
        }
        @media (min-width: 1024px) {
          .mobile-cta-bar {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-cta-bar {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
