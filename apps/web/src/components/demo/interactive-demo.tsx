"use client";

import { Badge } from "@/components/ui/badge";
import { Button, IconButton, buttonClassName } from "@/components/ui/button";
import { cardClassName } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOTION_POLICY, TRANSITION } from "@/lib/motion";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  CarFront,
  Check,
  Clapperboard,
  HeartPulse,
  LoaderCircle,
  type LucideIcon,
  Plus,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type CategoryId = "food" | "transport" | "shopping" | "entertainment" | "health" | "utilities";

interface CategoryItem {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

interface Transaction {
  id: string;
  name: string;
  amount: number;
  categoryId: CategoryId;
}

type DemoStep = "entry" | "suggesting" | "review";

const DEFAULT_CATEGORY: CategoryItem = {
  id: "food",
  label: "Food & Drink",
  icon: Utensils,
};

const CATEGORIES: readonly CategoryItem[] = [
  DEFAULT_CATEGORY,
  { id: "transport", label: "Transport", icon: CarFront },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "entertainment", label: "Entertainment", icon: Clapperboard },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "utilities", label: "Utilities", icon: Zap },
];

const SUGGESTIONS = ["Coffee Shop", "Taxi to Airport", "Streaming Service"];
const INITIAL_BUDGET = 800;
const INITIAL_SPENT = 420;
const MAX_EXPENSE = 1_000_000;
const INITIAL_TRANSACTIONS: readonly Transaction[] = [
  { id: "1", name: "Streaming Service", amount: 9.99, categoryId: "entertainment" },
  { id: "2", name: "Grocery Store", amount: 67.4, categoryId: "food" },
  { id: "3", name: "Gas Station", amount: 54.2, categoryId: "transport" },
];

function getCategory(categoryId: CategoryId) {
  return CATEGORIES.find((category) => category.id === categoryId) ?? DEFAULT_CATEGORY;
}

function includesAny(value: string, keywords: readonly string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

function inferCategory(description: string): CategoryId {
  const value = description.toLowerCase();

  if (includesAny(value, ["coffee", "cafe", "restaurant", "grocery", "meal", "food", "bakery"]))
    return "food";
  if (includesAny(value, ["taxi", "ride", "gas", "fuel", "bus", "train", "airport"]))
    return "transport";
  if (includesAny(value, ["streaming", "netflix", "cinema", "movie", "game", "concert"]))
    return "entertainment";
  if (includesAny(value, ["gym", "health", "doctor", "pharma", "medicine"])) return "health";
  if (includesAny(value, ["electric", "water", "internet", "utility", "phone bill"]))
    return "utilities";
  if (includesAny(value, ["shop", "store", "market", "amazon", "retail", "clothing"]))
    return "shopping";
  return DEFAULT_CATEGORY.id;
}

function CategoryGlyph({ categoryId }: { categoryId: CategoryId }) {
  const Icon = getCategory(categoryId).icon;
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-accent-subtle text-accent"
      aria-hidden="true"
    >
      <Icon size={16} strokeWidth={1.8} />
    </span>
  );
}

/** Public, local-only simulation of EXPOZOR's planned expense-entry flow. */
export function InteractiveDemo() {
  const [step, setStep] = useState<DemoStep>("entry");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([...INITIAL_TRANSACTIONS]);
  const [currentTx, setCurrentTx] = useState<Transaction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(DEFAULT_CATEGORY.id);
  const [completionRemaining, setCompletionRemaining] = useState<number | null>(null);
  const [spent, setSpent] = useState(INITIAL_SPENT);
  const suggestionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSuggestionTimer = useCallback(() => {
    if (suggestionTimer.current) {
      clearTimeout(suggestionTimer.current);
      suggestionTimer.current = null;
    }
  }, []);

  useEffect(() => clearSuggestionTimer, [clearSuggestionTimer]);

  useEffect(() => {
    if (completionRemaining === null) return;
    const timer = setTimeout(() => setCompletionRemaining(null), 5_000);
    return () => clearTimeout(timer);
  }, [completionRemaining]);

  const handleAdd = useCallback(() => {
    const description = name.trim();
    const parsedAmount = Number(amount);

    if (!description) {
      setError("Enter a short expense description.");
      return;
    }
    if (!amount || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter an amount greater than $0.");
      return;
    }
    if (parsedAmount > MAX_EXPENSE) {
      setError("Enter an amount of $1,000,000 or less for this simulation.");
      return;
    }

    clearSuggestionTimer();
    setError(null);
    setCompletionRemaining(null);
    const categoryId = inferCategory(description);
    setCurrentTx({
      id: crypto.randomUUID(),
      name: description,
      amount: Number(parsedAmount.toFixed(2)),
      categoryId,
    });
    setSelectedCategory(categoryId);
    setStep("suggesting");
    suggestionTimer.current = setTimeout(() => {
      setStep("review");
      suggestionTimer.current = null;
    }, 650);
  }, [amount, clearSuggestionTimer, name]);

  const handleConfirm = useCallback(() => {
    if (!currentTx) return;
    const confirmedTransaction = { ...currentTx, categoryId: selectedCategory };
    const nextSpent = spent + confirmedTransaction.amount;

    clearSuggestionTimer();
    setTransactions((previous) => [confirmedTransaction, ...previous]);
    setSpent(nextSpent);
    setCompletionRemaining(Math.max(INITIAL_BUDGET - nextSpent, 0));
    setName("");
    setAmount("");
    setCurrentTx(null);
    setStep("entry");
  }, [clearSuggestionTimer, currentTx, selectedCategory, spent]);

  const handleEdit = useCallback(() => {
    clearSuggestionTimer();
    setCurrentTx(null);
    setStep("entry");
  }, [clearSuggestionTimer]);

  const handleReset = useCallback(() => {
    clearSuggestionTimer();
    setStep("entry");
    setName("");
    setAmount("");
    setError(null);
    setCurrentTx(null);
    setSelectedCategory(DEFAULT_CATEGORY.id);
    setCompletionRemaining(null);
    setTransactions([...INITIAL_TRANSACTIONS]);
    setSpent(INITIAL_SPENT);
  }, [clearSuggestionTimer]);

  const budgetPct = Math.min((spent / INITIAL_BUDGET) * 100, 100);
  const remaining = Math.max(INITIAL_BUDGET - spent, 0);
  const entryDisabled = step !== "entry";

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={cardClassName({
          surface: "glass",
          className: "relative mx-auto w-full max-w-4xl overflow-hidden",
        })}
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
        aria-label="Product simulation"
      >
        <div className="flex items-center justify-between border-b border-border bg-bg-elevated px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-3 rounded-full bg-chrome-close" />
              <span className="size-3 rounded-full bg-chrome-minimize" />
              <span className="size-3 rounded-full bg-chrome-maximize" />
            </div>
            <span className="text-xs font-medium text-text-tertiary">EXPOZOR</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="positive" badgeSize="xs" status>
              Local simulation
            </Badge>
            <IconButton
              onClick={handleReset}
              className="rounded-sm text-text-tertiary hover:bg-bg-overlay hover:text-text-primary"
              aria-label="Reset simulation"
              title="Reset simulation"
            >
              <RefreshCw size={14} />
            </IconButton>
          </div>
        </div>

        <div className="grid md:grid-cols-[18rem_minmax(0,1fr)]">
          <form
            className="flex flex-col gap-4 border-b border-border bg-bg-surface p-5 md:min-h-[31rem] md:border-r md:border-b-0"
            onSubmit={(event) => {
              event.preventDefault();
              handleAdd();
            }}
            noValidate
          >
            <div>
              <label
                htmlFor="demo-name"
                className="mb-1.5 block text-xs font-medium text-text-tertiary"
              >
                Description
              </label>
              <Input
                id="demo-name"
                type="text"
                controlSize="sm"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError(null);
                }}
                placeholder="e.g. Coffee Shop"
                disabled={entryDisabled}
                maxLength={60}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "demo-error" : "demo-privacy-note"}
              />
              {step === "entry" && !name && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setName(suggestion)}
                      className="min-h-11 max-w-full truncate rounded-full bg-bg-overlay px-3 py-1 text-xs text-text-tertiary transition-colors hover:bg-bg-muted hover:text-text-primary"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="demo-amount"
                className="mb-1.5 block text-xs font-medium text-text-tertiary"
              >
                Amount (USD)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-text-tertiary">
                  $
                </span>
                <Input
                  id="demo-amount"
                  type="number"
                  controlSize="sm"
                  inputMode="decimal"
                  min="0.01"
                  max={MAX_EXPENSE}
                  step="0.01"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                    setError(null);
                  }}
                  placeholder="4.50"
                  disabled={entryDisabled}
                  className="pl-7"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "demo-error" : "demo-privacy-note"}
                />
              </div>
            </div>

            {error && (
              <p id="demo-error" className="text-xs font-medium text-danger" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={!name.trim() || !amount || entryDisabled}
              buttonSize="sm"
              fullWidth
              className="mt-auto"
            >
              <Plus size={16} aria-hidden="true" />
              Review expense
            </Button>

            <p id="demo-privacy-note" className="text-xs leading-relaxed text-text-tertiary">
              Runs in your browser with sample data. Nothing is sent or saved.
            </p>

            <div className="border-t border-border pt-4">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-xs text-text-tertiary">Monthly budget</span>
                <span className="text-xs font-medium text-text-primary">${INITIAL_BUDGET}</span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-bg-overlay"
                role="progressbar"
                tabIndex={0}
                aria-label={`${Math.round(budgetPct)}% of budget spent`}
                aria-valuenow={Math.round(budgetPct)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="h-full w-full rounded-full"
                  style={{
                    originX: 0,
                    background:
                      budgetPct > 90
                        ? "var(--danger)"
                        : budgetPct > 70
                          ? "var(--warn)"
                          : "var(--accent)",
                  }}
                  initial={{ scaleX: INITIAL_SPENT / INITIAL_BUDGET }}
                  animate={{ scaleX: budgetPct / 100 }}
                  transition={TRANSITION.slow}
                />
              </div>
              <p className="mt-1.5 text-xs text-text-tertiary">
                <span className="font-medium text-accent-2">${remaining.toFixed(2)}</span> remaining
              </p>
            </div>
          </form>

          <div className="min-w-0 bg-bg p-5 md:min-h-[31rem]">
            <AnimatePresence mode="wait">
              {step === "suggesting" && currentTx && (
                <motion.div
                  key="suggesting"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={TRANSITION.slow}
                  className="mb-4 block w-full rounded-lg border border-border-accent bg-accent-subtle p-4"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded bg-bg-overlay text-accent"
                      aria-hidden="true"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: MOTION_POLICY.stateRepeat,
                          ease: "linear",
                        }}
                      >
                        <LoaderCircle size={17} />
                      </motion.span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-text-primary">
                        {currentTx.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-secondary">
                        <Sparkles size={12} className="text-accent" aria-hidden="true" />
                        Matching simple keyword rules locally…
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-text-primary">
                      ${currentTx.amount.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              )}

              {step === "review" && currentTx && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={TRANSITION.slow}
                  className="mb-4 rounded-lg border border-border-accent bg-accent-subtle p-4"
                  aria-labelledby="category-review-title"
                >
                  <div className="flex items-start gap-3">
                    <CategoryGlyph categoryId={selectedCategory} />
                    <div className="min-w-0 flex-1">
                      <p
                        id="category-review-title"
                        className="text-sm font-semibold text-text-primary"
                      >
                        Review category
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        Suggested from the description using local keyword rules. Confirm or change
                        it before adding the expense.
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-text-primary">
                      ${currentTx.amount.toFixed(2)}
                    </span>
                  </div>
                  <label
                    htmlFor="demo-category"
                    className="mt-4 mb-1.5 block text-xs font-medium text-text-tertiary"
                  >
                    Category for {currentTx.name}
                  </label>
                  <select
                    id="demo-category"
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value as CategoryId)}
                    className="control-transition min-h-11 w-full rounded-sm border border-border bg-bg-elevated px-3 text-sm text-text-primary focus:border-border-accent"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button variant="secondary" buttonSize="sm" onClick={handleEdit}>
                      Edit details
                    </Button>
                    <Button buttonSize="sm" onClick={handleConfirm}>
                      <Check size={16} aria-hidden="true" />
                      Confirm expense
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {completionRemaining !== null && (
                <motion.output
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={TRANSITION.slow}
                  className="mb-4 block w-full rounded-lg border border-border-accent bg-accent-subtle p-4"
                >
                  <div className="flex items-start gap-3">
                    <TrendingDown
                      size={18}
                      className="mt-0.5 shrink-0 text-accent-2"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-primary">Expense added</p>
                      <p className="mt-0.5 text-xs text-text-secondary">
                        <span className="font-semibold text-accent-2">
                          ${completionRemaining.toFixed(2)}
                        </span>{" "}
                        remaining in your monthly budget. You can add another expense now.
                      </p>
                      <Link
                        href="/#waitlist"
                        className="mt-2 inline-flex text-xs font-semibold text-accent hover:text-accent-hover"
                      >
                        Join early access →
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCompletionRemaining(null)}
                      className="flex size-11 shrink-0 items-center justify-center rounded-sm text-text-tertiary transition-colors hover:bg-bg-overlay hover:text-text-primary"
                      aria-label="Dismiss confirmation"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                </motion.output>
              )}
            </AnimatePresence>

            <div
              className={`space-y-2 transition-opacity ${step === "entry" ? "opacity-100" : "opacity-40"}`}
              aria-label="Recent transactions"
            >
              <p className="mb-3 text-xs font-semibold tracking-wider text-text-tertiary uppercase">
                Recent
              </p>
              <AnimatePresence mode="popLayout" initial={false}>
                {transactions.map((transaction) => {
                  const category = getCategory(transaction.categoryId);
                  return (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: 16, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={TRANSITION.slow}
                      className="flex items-center gap-3 rounded border border-border bg-bg-elevated p-3 transition-colors hover:border-border-strong"
                    >
                      <CategoryGlyph categoryId={transaction.categoryId} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {transaction.name}
                        </p>
                        <p className="mt-0.5 text-xs text-text-tertiary">{category.label}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-text-primary">
                        −${transaction.amount.toFixed(2)}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border bg-bg-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Want to follow the real product?
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Join early access for launch updates. No credit card required.
            </p>
          </div>
          <Link href="/#waitlist" className={buttonClassName({ size: "sm" })}>
            Join early access
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
}
