"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   STICKY MOBILE CTA BAR
   Spec: fixed bottom bar, mobile-only (hidden on lg+).
   - Appears after scrolling past 300px
   - Hides once the final waitlist section is reached
   - Dismissible with × (hidden for rest of session via sessionStorage)
   - "Join the waitlist. No credit card."
   - aria-label on dismiss button, role="complementary" on bar
────────────────────────────────────────────────────────────── */
const DISMISS_KEY = "EXPOZOR-mobile-cta-dismissed";
const SHOW_AFTER_SCROLL = 300;
const FINAL_WAITLIST_ID = "waitlist";

export function StickyMobileCtaBar() {
  const reduceMotion = useReducedMotion();
  const [pastScrollThreshold, setPastScrollThreshold] = useState(false);
  const [finalContentReached, setFinalContentReached] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pastScrollThresholdRef = useRef(false);
  const finalContentReachedRef = useRef(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }

    const syncScrollThreshold = () => {
      const nextPastThreshold = window.scrollY > SHOW_AFTER_SCROLL;
      if (pastScrollThresholdRef.current === nextPastThreshold) return;

      pastScrollThresholdRef.current = nextPastThreshold;
      setPastScrollThreshold(nextPastThreshold);
    };

    const syncFinalContentReached = (nextFinalContentReached: boolean) => {
      if (finalContentReachedRef.current === nextFinalContentReached) return;

      finalContentReachedRef.current = nextFinalContentReached;
      setFinalContentReached(nextFinalContentReached);
    };

    window.addEventListener("scroll", syncScrollThreshold, { passive: true });
    syncScrollThreshold();

    const finalWaitlist = document.getElementById(FINAL_WAITLIST_ID);
    let finalContentObserver: IntersectionObserver | undefined;

    if (finalWaitlist) {
      const finalWaitlistRect = finalWaitlist.getBoundingClientRect();
      syncFinalContentReached(finalWaitlistRect.top < window.innerHeight);

      finalContentObserver = new IntersectionObserver(([entry]) => {
        if (!entry) return;

        const nextFinalContentReached = entry.isIntersecting || entry.boundingClientRect.top < 0;
        syncFinalContentReached(nextFinalContentReached);
      });
      finalContentObserver.observe(finalWaitlist);
    }

    return () => {
      window.removeEventListener("scroll", syncScrollThreshold);
      finalContentObserver?.disconnect();
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  const show = pastScrollThreshold && !finalContentReached && !dismissed;

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="mobile-cta-bar"
            initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            role="complementary"
            aria-label="Waitlist sign-up prompt"
            className="mobile-cta-bar"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 80,
              padding: "0.875rem 1rem calc(0.875rem + env(safe-area-inset-bottom))",
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
                justifyContent: "center",
                gap: "5px",
                padding: "0.5625rem 1rem",
                minHeight: "44px",
                boxSizing: "border-box",
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
                width: "44px",
                height: "44px",
                boxSizing: "border-box",
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

      {show && <div aria-hidden="true" className="mobile-cta-reservation" />}

      {/* Only visible on mobile — hidden at lg+ breakpoint */}
      <style>{`
        .mobile-cta-bar {
          display: flex;
        }
        .mobile-cta-reservation {
          display: block;
          height: calc(73px + env(safe-area-inset-bottom));
        }
        @media (min-width: 1024px) {
          .mobile-cta-bar,
          .mobile-cta-reservation {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
