"use client";

import { deleteCategoryBudget, upsertCategoryBudget } from "@/app/actions/budgets";
import { buttonClassName } from "@/components/ui/button";
import { categoryChartColor } from "@/lib/category-style";
import type { CategoryBreakdown, DashboardBudget } from "@/lib/dashboard";
import { formatMoney } from "@/lib/format";
import { Check, Gauge, Loader2, Plus, Target, Trash2, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useTransition } from "react";

type CategoryOption = { id: string; name: string; color: string };

export function BudgetPlanner({
  budgets,
  categories,
  breakdown,
  month,
  monthLabel,
  currency,
}: {
  budgets: DashboardBudget[];
  categories: CategoryOption[];
  breakdown: CategoryBreakdown[];
  month: string;
  monthLabel: string;
  currency: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = breakdown.reduce((sum, category) => sum + category.total, 0);
  const totalPercent = totalBudget ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    startSaving(async () => {
      const result = await upsertCategoryBudget(data);
      setMessage(result.success ? "Budget saved." : result.error);
      if (result.success) form.reset();
    });
  }

  function remove(id: string) {
    const data = new FormData();
    data.set("id", id);
    startDeleting(async () => {
      const result = await deleteCategoryBudget(data);
      setMessage(result.success ? "Budget removed." : result.error);
      if (result.success) setPendingDelete(null);
    });
  }

  return (
    <article
      id="planning"
      className="scroll-mt-24 rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <Target size={15} aria-hidden="true" /> Planning layer
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-text-primary">
            Category budgets
          </h2>
          <p className="mt-1 max-w-lg text-sm leading-6 text-text-secondary">
            Give every important category a lane. Your dashboard will show the pace before the month
            gets away from you.
          </p>
        </div>
        <button
          type="button"
          className={buttonClassName({ variant: "secondary", size: "sm", className: "rounded-lg" })}
          onClick={() => setOpen(true)}
        >
          <Plus size={15} aria-hidden="true" /> Manage budgets
        </button>
      </div>

      {budgets.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {budgets.map((budget) => {
            const spent =
              breakdown.find((category) => category.name === budget.categoryName)?.total ?? 0;
            const percent = Math.min((spent / budget.amount) * 100, 100);
            return (
              <div key={budget.id} className="rounded-xl border border-border bg-bg-elev-2/55 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: categoryChartColor(budget.categoryColor) }}
                    />
                    <span className="truncate text-sm font-semibold text-text-primary">
                      {budget.categoryName}
                    </span>
                  </div>
                  <span className="text-xs tabular-nums text-text-secondary">
                    {percent.toFixed(0)}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-muted">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-300"
                    style={{ width: `${Math.max(spent ? 5 : 0, percent)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between gap-3 text-xs text-text-tertiary">
                  <span>{formatMoney(spent, currency)} spent</span>
                  <span>{formatMoney(budget.amount, currency)} limit</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-dashed border-border-strong bg-bg-elev-2/40 p-5 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-elev-2 text-accent">
              <Gauge size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                No category plan for {monthLabel}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Add a few guardrails and turn tracking into a plan.
              </p>
            </div>
          </div>
          <button
            type="button"
            className={buttonClassName({ size: "sm", className: "rounded-lg" })}
            onClick={() => setOpen(true)}
          >
            <Plus size={15} aria-hidden="true" /> Set a budget
          </button>
        </div>
      )}

      {budgets.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <span className="text-text-secondary">
            {formatMoney(totalSpent, currency)} of {formatMoney(totalBudget, currency)} planned
          </span>
          <span className={`font-semibold ${totalPercent > 90 ? "text-warn" : "text-positive"}`}>
            {totalPercent.toFixed(0)}% of plan used
          </span>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          document.body.style.overflow = "";
        }}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,700px)] overflow-y-auto rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-elev-1/95 px-6 py-5 backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Plan {monthLabel}
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Category budget planner
            </h2>
            <p className="mt-1 text-sm text-text-secondary">You can update a limit at any time.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-xl text-text-secondary hover:bg-bg-elev-2"
            aria-label="Close budget planner"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <div className="space-y-7 p-6 sm:p-8">
          <form
            onSubmit={save}
            className="grid gap-4 rounded-xl border border-border bg-bg-elev-2/55 p-4 sm:grid-cols-[1fr_120px_auto] sm:items-end"
            noValidate
          >
            <input type="hidden" name="month" value={month} />
            <div>
              <label
                htmlFor={`${titleId}-category`}
                className="mb-2 block text-xs font-semibold text-text-secondary"
              >
                Category
              </label>
              <select
                id={`${titleId}-category`}
                name="categoryId"
                className="min-h-12 w-full rounded-xl border border-border bg-bg-elev-1 px-3 text-sm text-text-primary outline-none focus:border-accent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`${titleId}-amount`}
                className="mb-2 block text-xs font-semibold text-text-secondary"
              >
                Limit
              </label>
              <input
                id={`${titleId}-amount`}
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                placeholder="0.00"
                className="min-h-12 w-full rounded-xl border border-border bg-bg-elev-1 px-3 text-sm tabular-nums text-text-primary outline-none focus:border-accent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className={buttonClassName({ size: "md", className: "rounded-xl" })}
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Check size={16} aria-hidden="true" />
              )}{" "}
              Save
            </button>
          </form>
          {message && (
            <output aria-live="polite" className="text-sm text-positive">
              {message}
            </output>
          )}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-text-tertiary">
              Active limits
            </p>
            {budgets.length ? (
              budgets.map((budget) => (
                <div
                  key={budget.id}
                  className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-border bg-bg-elev-2/55 px-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: categoryChartColor(budget.categoryColor) }}
                    />
                    <span className="truncate text-sm font-medium">{budget.categoryName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tabular-nums">
                      {formatMoney(budget.amount, currency)}
                    </span>
                    {pendingDelete === budget.id ? (
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => remove(budget.id)}
                          className="min-h-9 rounded-lg px-2 text-xs font-semibold text-danger hover:bg-danger-subtle"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(null)}
                          className="min-h-9 rounded-lg px-2 text-xs text-text-secondary hover:bg-bg-overlay"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPendingDelete(budget.id)}
                        className="grid size-10 place-items-center rounded-lg text-text-tertiary hover:bg-danger-subtle hover:text-danger"
                        aria-label={`Remove ${budget.categoryName} budget`}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-border-strong p-5 text-sm text-text-secondary">
                Your saved category limits will appear here.
              </p>
            )}
          </div>
        </div>
      </dialog>
    </article>
  );
}
