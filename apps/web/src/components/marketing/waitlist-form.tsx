"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";

interface WaitlistFormProps {
  locale?: string;
  size?: "default" | "large";
  className?: string;
}

export function WaitlistForm({ locale = "en", size = "default", className = "" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const isLarge = size === "large";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("email", email);
    fd.set("locale", locale);

    startTransition(async () => {
      const res = await joinWaitlist(fd);
      setResult(res);
    });
  }

  if (result?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center gap-3 px-5 py-3.5 rounded-[var(--radius-lg)] bg-[var(--success-subtle)] border border-[var(--success)] border-opacity-30 ${className}`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={18} className="text-[var(--success)] shrink-0" aria-hidden="true" />
        <p className="text-sm text-[var(--text-primary)]">
          {result.message ?? "You're on the list!"}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-2 ${className}`}
      aria-label="Join the waitlist"
      noValidate
    >
      <div className="relative flex-1">
        <input
          id="waitlist-email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          disabled={isPending}
          aria-describedby={result?.error ? "waitlist-error" : undefined}
          className={`
            w-full rounded-[var(--radius)] bg-[var(--bg-elevated)]
            border border-[var(--border)] text-[var(--text-primary)]
            placeholder-[var(--text-tertiary)]
            focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-subtle)]
            transition-all duration-150
            disabled:opacity-60
            ${isLarge ? "px-5 py-4 text-base" : "px-4 py-3 text-sm"}
            ${result?.error ? "border-[var(--danger)]" : ""}
          `}
        />
        <AnimatePresence>
          {result?.error && (
            <motion.p
              id="waitlist-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-6 left-0 text-xs text-[var(--danger)]"
              role="alert"
            >
              {result.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={isPending || !email}
        className={`
          shrink-0 inline-flex items-center justify-center gap-2
          bg-[var(--accent)] text-[var(--text-inverse)] font-semibold
          rounded-[var(--radius)] transition-all duration-150
          hover:bg-[var(--accent-dim)] active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
          focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--bg)]
          ${isLarge ? "px-6 py-4 text-base" : "px-5 py-3 text-sm"}
        `}
        aria-label={isPending ? "Joining waitlist..." : "Join the waitlist"}
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <>
            Join waitlist
            <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
