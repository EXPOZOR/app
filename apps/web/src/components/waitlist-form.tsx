"use client";

import { joinWaitlist } from "@/app/actions/waitlist";
import { FINAL_CTA } from "@/content/landing";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, useTransition } from "react";

type WaitlistFormProps = {
  onSuccess?: () => void;
};

/** The single canonical early-access signup form used by the homepage. */
export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;
  const microcopyId = `${id}-microcopy`;

  useEffect(() => {
    if (status === "error" && !isPending) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [isPending, status]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("source", "waitlist");
    formData.set("locale", "en");

    startTransition(async () => {
      const result = await joinWaitlist(formData);

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        if (inputRef.current) inputRef.current.value = "";
        onSuccess?.();
        return;
      }

      setStatus("error");
      setMessage(result.error);
    });
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.output
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1.25rem 1.5rem",
              borderRadius: "var(--radius-md)",
              background: "var(--accent-subtle)",
              border: "1px solid var(--border-accent)",
            }}
          >
            <CheckCircle2 size={28} style={{ color: "var(--accent)" }} aria-hidden="true" />
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {message}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0 }}>
              You&rsquo;re on the list. We will send early-access updates when ready.
            </p>
          </motion.output>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Join the EXPOZOR early-access waitlist"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              className="waitlist-form-row measure-form"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                width: "100%",
              }}
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />
              <div style={{ flex: 1 }}>
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isPending}
                  aria-describedby={status === "error" ? `${microcopyId} ${errorId}` : microcopyId}
                  aria-invalid={status === "error"}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 1rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-elev-2)",
                    border: `1px solid ${status === "error" ? "var(--warn)" : "var(--border)"}`,
                    color: "var(--text-primary)",
                    fontSize: "0.9375rem",
                    transition: "border-color var(--dur-base) var(--ease-out)",
                    boxSizing: "border-box",
                  }}
                  onFocus={(event) => {
                    event.currentTarget.style.borderColor =
                      status === "error" ? "var(--warn)" : "var(--border-accent)";
                  }}
                  onBlur={(event) => {
                    event.currentTarget.style.borderColor =
                      status === "error" ? "var(--warn)" : "var(--border)";
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.03, boxShadow: "var(--shadow-glow)" }}
                whileTap={{ scale: 0.97 }}
                aria-label={isPending ? "Joining the EXPOZOR waitlist" : FINAL_CTA.ctaAriaLabel}
                aria-busy={isPending}
                className="waitlist-form-button"
                style={{
                  height: "48px",
                  padding: "0 1.375rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--accent)",
                  color: "var(--text-inverse)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  border: "none",
                  cursor: isPending ? "not-allowed" : "pointer",
                  opacity: isPending ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                  transition: "background var(--dur-base) var(--ease-out)",
                }}
              >
                {isPending ? (
                  <Loader2
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    {FINAL_CTA.cta}
                    <ArrowRight size={15} aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </div>

            <label
              className="measure-form"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                minHeight: "44px",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                textAlign: "left",
                cursor: isPending ? "not-allowed" : "pointer",
              }}
            >
              <input
                type="checkbox"
                name="productUpdatesConsent"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                disabled={isPending}
                style={{ width: "18px", height: "18px", margin: 0 }}
              />
              <span>I&rsquo;d like to receive product updates.</span>
            </label>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  id={errorId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "0.8125rem",
                    color: "var(--warn)",
                    margin: 0,
                  }}
                >
                  <AlertCircle size={13} aria-hidden="true" />
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            <p
              id={microcopyId}
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              {FINAL_CTA.microcopy}
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 480px) {
          .waitlist-form-row {
            flex-direction: column !important;
          }
          .waitlist-form-button {
            width: 100%;
            justify-content: center;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .waitlist-form-button::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 65%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s ease-out 0.6s 1 both;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
