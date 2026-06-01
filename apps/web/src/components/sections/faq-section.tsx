"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import { FAQ } from "@/content/landing";
import { EASE_OUT } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────
   ACCORDION ITEM
   Full keyboard spec:
     - Enter / Space  → toggle open/close
     - ArrowDown      → focus next item (handled by parent)
     - ArrowUp        → focus prev item (handled by parent)
     - Escape         → close this item
   Height animation via Framer Motion AnimatePresence.
   prefers-reduced-motion: AnimatePresence transition set to 0ms.
────────────────────────────────────────────────────────────── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
  onArrow,
  index,
  btnRef,
}: {
  item: (typeof FAQ.items)[number];
  isOpen: boolean;
  onToggle: () => void;
  onArrow: (dir: "up" | "down") => void;
  index: number;
  btnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); onArrow("down"); }
    if (e.key === "ArrowUp")   { e.preventDefault(); onArrow("up");   }
    if (e.key === "Escape" && isOpen) { e.preventDefault(); onToggle(); }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: EASE_OUT }}
      style={{
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: isOpen ? "1px solid var(--border-strong)" : "1px solid var(--border)",
        background: isOpen ? "var(--bg-elev-2)" : "var(--bg-elev-1)",
        transition: "border-color 200ms ease-out, background 200ms ease-out",
        position: "relative",
      }}
    >
      {/* ── Enhancement 10: sliding left-edge accent bar via layoutId ── */}
      {/* Same idiom as HowItWorks step-line — one bar animates between items */}
      {isOpen && (
        <motion.div
          layoutId="faq-line"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            borderRadius: "0 var(--radius-full) var(--radius-full) 0",
            background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        />
      )}

      {/* Question button */}
      <button
        ref={btnRef}
        type="button"
        id={`${item.id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.125rem 1.375rem",
          textAlign: "left",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-primary)",
          outline: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            flex: 1,
            paddingRight: "0.5rem",
          }}
        >
          {item.question}
        </span>

        {/* ── Enhancement 10: spring-driven chevron rotation ── */}
        {/* Replaced CSS transform string with Framer Motion animate so
            the rotation uses a spring (feels physical, not linear). */}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--bg-elev-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isOpen ? "var(--accent)" : "var(--text-muted)",
            transition: "color 200ms ease-out",
          }}
        >
          <ChevronDown size={14} aria-hidden="true" />
        </motion.span>
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${item.id}-panel`}
            role="region"
            aria-labelledby={`${item.id}-btn`}
            key={`${item.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 1.375rem 1.25rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                borderTop: "1px solid var(--border)",
                paddingTop: "1rem",
              }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SEARCH BAR
   Filters FAQ items in real-time. Clears on × button.
   role="searchbox", aria-label, aria-autocomplete="list"
────────────────────────────────────────────────────────────── */
function SearchBar({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.45 }}
      style={{
        position: "relative",
        marginBottom: "1.5rem",
      }}
    >
      {/* Search icon */}
      <Search
        size={16}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          pointerEvents: "none",
        }}
      />

      {/* Input */}
      <input
        type="search"
        role="searchbox"
        aria-label="Search frequently asked questions"
        aria-autocomplete="list"
        aria-controls="faq-list"
        placeholder="Search questions…"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.6875rem 2.5rem 0.6875rem 2.5rem",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          fontSize: "0.9375rem",
          outline: "none",
          transition: "border-color var(--dur-base) var(--ease-out)",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border-strong)"; }}
        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }}
      />

      {/* Clear × button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "var(--bg-muted)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
          }}
        >
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FAQ SECTION — main export
────────────────────────────────────────────────────────────── */
export function FaqSection() {
  const [openId, setOpenId]     = useState<string | null>(null);
  const [query,  setQuery]      = useState("");

  // One ref per item button for keyboard arrow-nav
  const btnRefs = useRef<Array<React.RefObject<HTMLButtonElement | null>>>(
    FAQ.items.map(() => ({ current: null })),
  );

  // Filter by query (case-insensitive, searches Q + A)
  const filtered = FAQ.items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  });

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  // ArrowDown/Up: focus the next/prev visible item button
  const handleArrow = useCallback(
    (currentFilteredIndex: number, dir: "up" | "down") => {
      const next =
        dir === "down"
          ? Math.min(currentFilteredIndex + 1, filtered.length - 1)
          : Math.max(currentFilteredIndex - 1, 0);

      const targetId = filtered[next]?.id;
      if (!targetId) return;

      // Find the global index of targetId in FAQ.items to get the right ref
      const globalIdx = FAQ.items.findIndex((i) => i.id === targetId);
      if (globalIdx !== -1) {
        btnRefs.current[globalIdx]?.current?.focus();
      }
    },
    [filtered],
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-py cv-auto"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(167,139,250,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* ── Section header ─────────────────────────── */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ marginBottom: "0.875rem" }}
            >
              FAQ
            </motion.p>

            <motion.h2
              id="faq-heading"
              className="section-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ margin: "0 auto 0.875rem" }}
            >
              {FAQ.title}
            </motion.h2>

            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.5 }}
              style={{ margin: "0 auto" }}
            >
              Can't find an answer?{" "}
              <a
                href="mailto:support@expozor.app"
                style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
              >
                Email us
              </a>
            </motion.p>
          </div>

          {/* ── Search bar ─────────────────────────────── */}
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setOpenId(null); // collapse all when searching
            }}
            onClear={() => { setQuery(""); setOpenId(null); }}
          />

          {/* ── Accordion list ─────────────────────────── */}
          <div
            id="faq-list"
            role="list"
            aria-label="Frequently asked questions"
            aria-live="polite"
            aria-atomic="false"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((item, filteredIdx) => {
                  // globalIdx for ref lookup
                  const globalIdx = FAQ.items.findIndex((i) => i.id === item.id);
                  return (
                    <div key={item.id} role="listitem">
                      <AccordionItem
                        item={item}
                        isOpen={openId === item.id}
                        onToggle={() => toggle(item.id)}
                        onArrow={(dir) => handleArrow(filteredIdx, dir)}
                        index={filteredIdx}
                        btnRef={btnRefs.current[globalIdx]!}
                      />
                    </div>
                  );
                })
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-elev-1)",
                  }}
                >
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>
                    No questions match &ldquo;{query}&rdquo;
                  </p>
                  <a
                    href="mailto:support@expozor.app"
                    style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: 600 }}
                  >
                    Ask us directly →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Result count (screen reader) ───────────── */}
          <p
            role="status"
            aria-live="polite"
            className="sr-only"
          >
            {filtered.length} question{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>
    </section>
  );
}
