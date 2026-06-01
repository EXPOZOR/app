"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, TrendingDown, RefreshCw, Check } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────
interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  categoryIcon: string;
  confidence: number;
  timestamp: Date;
}

type DemoStep = "entry" | "categorizing" | "categorized" | "budgetUpdate";

// ── Seed data ──────────────────────────────────────────────────
const CATEGORIES = [
  { label: "Food & Drink", icon: "🍽️" },
  { label: "Transport", icon: "🚗" },
  { label: "Shopping", icon: "🛍️" },
  { label: "Entertainment", icon: "🎬" },
  { label: "Health", icon: "💊" },
  { label: "Utilities", icon: "⚡" },
];

type CategoryItem = { label: string; icon: string };


const SUGGESTIONS = [
  "Coffee at Blue Bottle",
  "Uber to airport",
  "Netflix subscription",
  "Whole Foods Market",
  "Gym membership",
];

const INITIAL_BUDGET = 800;
const INITIAL_SPENT = 420;

// ── Main component ─────────────────────────────────────────────
export function InteractiveDemo() {
  const [step, setStep] = useState<DemoStep>("entry");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", name: "Spotify Premium", amount: 9.99, category: "Entertainment", categoryIcon: "🎬", confidence: 99, timestamp: new Date(Date.now() - 86400000 * 2) },
    { id: "2", name: "Trader Joe's", amount: 67.40, category: "Food & Drink", categoryIcon: "🍽️", confidence: 97, timestamp: new Date(Date.now() - 86400000) },
    { id: "3", name: "Shell Gas Station", amount: 54.20, category: "Transport", categoryIcon: "🚗", confidence: 96, timestamp: new Date(Date.now() - 3600000 * 5) },
  ]);
  const [currentTx, setCurrentTx] = useState<Transaction | null>(null);
  const [spent, setSpent] = useState(INITIAL_SPENT);

  const handleAdd = useCallback(() => {
    if (!name || !amount || Number.isNaN(Number(amount))) return;

    // Naive category inference (deterministic first — no LLM in demo)
    const lower = name.toLowerCase();
    let category: CategoryItem = CATEGORIES[0] ?? { label: "Food & Drink", icon: "🍽️" };
    if (lower.includes("uber") || lower.includes("lyft") || lower.includes("gas") || lower.includes("transport")) {
      category = CATEGORIES[1] ?? category;
    } else if (lower.includes("amazon") || lower.includes("shop") || lower.includes("store") || lower.includes("market")) {
      category = CATEGORIES[2] ?? category;
    } else if (lower.includes("netflix") || lower.includes("spotify") || lower.includes("movie") || lower.includes("cinema")) {
      category = CATEGORIES[3] ?? category;
    } else if (lower.includes("gym") || lower.includes("health") || lower.includes("doctor") || lower.includes("pharma")) {
      category = CATEGORIES[4] ?? category;
    } else if (lower.includes("electric") || lower.includes("water") || lower.includes("internet") || lower.includes("utility")) {
      category = CATEGORIES[5] ?? category;
    }

    const confidence = Math.floor(Math.random() * 8) + 92; // 92-99

    const tx: Transaction = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: Number(Number(amount).toFixed(2)),
      category: category.label,
      categoryIcon: category.icon,
      confidence,
      timestamp: new Date(),
    };

    setCurrentTx(tx);
    setStep("categorizing");

    setTimeout(() => {
      setStep("categorized");
      setTimeout(() => {
        setTransactions((prev) => [tx, ...prev]);
        setSpent((prev) => prev + tx.amount);
        setStep("budgetUpdate");
      }, 1200);
    }, 1500);
  }, [name, amount]);

  const handleReset = useCallback(() => {
    setStep("entry");
    setName("");
    setAmount("");
    setCurrentTx(null);
    setTransactions([
      { id: "1", name: "Spotify Premium", amount: 9.99, category: "Entertainment", categoryIcon: "🎬", confidence: 99, timestamp: new Date(Date.now() - 86400000 * 2) },
      { id: "2", name: "Trader Joe's", amount: 67.40, category: "Food & Drink", categoryIcon: "🍽️", confidence: 97, timestamp: new Date(Date.now() - 86400000) },
      { id: "3", name: "Shell Gas Station", amount: 54.20, category: "Transport", categoryIcon: "🚗", confidence: 96, timestamp: new Date(Date.now() - 3600000 * 5) },
    ]);
    setSpent(INITIAL_SPENT);
  }, []);

  const budgetPct = Math.min((spent / INITIAL_BUDGET) * 100, 100);
  const remaining = Math.max(INITIAL_BUDGET - spent, 0);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)] glass"
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
      role="region"
      aria-label="Interactive demo"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-[var(--text-tertiary)] font-medium">EXPOZOR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-live text-[10px]">Live demo</span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
            aria-label="Reset demo"
            title="Reset demo"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row" style={{ minHeight: 420 }}>
        {/* Left: Input panel */}
        <div className="md:w-64 border-b md:border-b-0 md:border-r border-[var(--border)] p-5 flex flex-col gap-4 bg-[var(--bg-surface)]">
          <div>
            <label
              htmlFor="demo-name"
              className="block text-xs font-medium text-[var(--text-tertiary)] mb-1.5"
            >
              Description
            </label>
            <input
              id="demo-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Coffee at Blue Bottle"
              disabled={step !== "entry"}
              maxLength={60}
              className="w-full px-3 py-2.5 text-sm rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            {/* Suggestions */}
            {step === "entry" && !name && (
              <div className="flex flex-wrap gap-1 mt-2">
                {SUGGESTIONS.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setName(s)}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--bg-overlay)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors truncate max-w-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="demo-amount"
              className="block text-xs font-medium text-[var(--text-tertiary)] mb-1.5"
            >
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm pointer-events-none">
                $
              </span>
              <input
                id="demo-amount"
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="4.50"
                disabled={step !== "entry"}
                className="w-full pl-7 pr-3 py-2.5 text-sm rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!name || !amount || step !== "entry"}
            className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--text-inverse)] text-sm font-semibold hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            aria-label="Add expense"
          >
            <Plus size={16} aria-hidden="true" />
            Add expense
          </button>

          {/* Budget mini-gauge */}
          <div className="pt-4 border-t border-[var(--border)]">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-[var(--text-tertiary)]">Monthly budget</span>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                ${INITIAL_BUDGET}
              </span>
            </div>
            <div
              className="h-1.5 rounded-full bg-[var(--bg-overlay)] overflow-hidden"
              role="progressbar"
              aria-label={`${Math.round(budgetPct)}% of budget spent`}
              aria-valuenow={Math.round(budgetPct)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    budgetPct > 90
                      ? "var(--danger)"
                      : budgetPct > 70
                        ? "var(--warn)"
                        : "var(--accent)",
                }}
                initial={{ width: `${(INITIAL_SPENT / INITIAL_BUDGET) * 100}%` }}
                animate={{ width: `${budgetPct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-1.5">
              <span className="text-[var(--accent-2)] font-medium">${remaining.toFixed(2)}</span> remaining
            </p>
          </div>
        </div>

        {/* Right: Transaction feed + AI overlay */}
        <div className="flex-1 p-5 relative overflow-hidden bg-[var(--bg)]">
          {/* AI categorization overlay */}
          <AnimatePresence>
            {(step === "categorizing" || step === "categorized") && currentTx && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-5 top-5 z-10 rounded-[var(--radius-lg)] glass border border-[var(--border-accent)] p-4"
                role="status"
                aria-live="polite"
                aria-label="AI categorization in progress"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-[var(--radius)] flex items-center justify-center text-lg shrink-0 bg-[var(--accent-subtle)]"
                    aria-hidden="true"
                  >
                    {step === "categorizing" ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="block"
                      >
                        ✨
                      </motion.span>
                    ) : (
                      currentTx.categoryIcon
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {currentTx.name}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {step === "categorizing" ? (
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={11} className="text-[var(--accent)]" aria-hidden="true" />
                          Analyzing with AI...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Check size={11} className="text-[var(--success)]" aria-hidden="true" />
                          {currentTx.category} · {currentTx.confidence}% confidence
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--accent-2)] shrink-0">
                    ${currentTx.amount.toFixed(2)}
                  </span>
                </div>

                {step === "categorized" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-[var(--border)]"
                  >
                    <p className="text-xs text-[var(--text-tertiary)]">
                      Categorized as{" "}
                      <strong className="text-[var(--accent)]">{currentTx.category}</strong> using
                      your rules + AI. You can edit anytime.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Budget update banner */}
          <AnimatePresence>
            {step === "budgetUpdate" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-5 top-5 z-10 rounded-[var(--radius-lg)] p-4 border border-[var(--border-accent)] bg-[var(--accent-subtle)]"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-3">
                  <TrendingDown size={18} className="text-[var(--accent-2)] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      Budget updated
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      <span className="text-[var(--accent-2)] font-semibold">
                        ${remaining.toFixed(2)}
                      </span>{" "}
                      remaining in Food & Drink this month
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transaction list */}
          <div
            className={`space-y-2 transition-all duration-300 ${
              step !== "entry" && step !== "budgetUpdate" ? "opacity-30 blur-[2px]" : "opacity-100"
            }`}
            aria-label="Recent transactions"
          >
            <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
              Recent
            </p>
            <AnimatePresence mode="popLayout">
              {transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: 16, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 p-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <span
                    className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-base bg-[var(--bg-overlay)] shrink-0"
                    aria-hidden="true"
                  >
                    {tx.categoryIcon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {tx.name}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{tx.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)] shrink-0">
                    −${tx.amount.toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
