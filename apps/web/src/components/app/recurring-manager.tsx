"use client";

import {
  createRecurringExpense,
  deleteRecurringExpense,
  recordRecurringExpense,
  toggleRecurringExpense,
} from "@/app/actions/recurring";
import { buttonClassName } from "@/components/ui/button";
import { categoryChartColor } from "@/lib/category-style";
import type { DashboardRecurring } from "@/lib/dashboard";
import { formatExpenseDate, formatMoney } from "@/lib/format";
import { CalendarClock, Check, Loader2, Pause, Play, Plus, Repeat2, Trash2, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useTransition } from "react";

type CategoryOption = { id: string; name: string; color: string };

const CADENCE_LABELS = {
  weekly: "Every week",
  monthly: "Every month",
  yearly: "Every year",
} as const;

export function RecurringManager({
  recurring,
  categories,
  currency,
}: {
  recurring: DashboardRecurring[];
  categories: CategoryOption[];
  currency: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

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

  function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const result = await createRecurringExpense(data);
      setMessage(result.success ? "Recurring expense added." : result.error);
      if (result.success) form.reset();
    });
  }

  function run(id: string) {
    const data = new FormData();
    data.set("id", id);
    startTransition(async () => {
      const result = await recordRecurringExpense(data);
      setMessage(result.success ? "Expense recorded and next date advanced." : result.error);
    });
  }

  function toggle(item: DashboardRecurring) {
    const data = new FormData();
    data.set("id", item.id);
    data.set("active", String(!item.active));
    startTransition(async () => {
      const result = await toggleRecurringExpense(data);
      if (!result.success) setMessage(result.error);
    });
  }

  function remove(id: string) {
    const data = new FormData();
    data.set("id", id);
    startTransition(async () => {
      const result = await deleteRecurringExpense(data);
      if (!result.success) setMessage(result.error);
    });
  }

  return (
    <article
      id="recurring"
      className="scroll-mt-24 rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <Repeat2 size={15} aria-hidden="true" /> Autopilot
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-text-primary">
            Recurring expenses
          </h2>
          <p className="mt-1 max-w-lg text-sm leading-6 text-text-secondary">
            Keep subscriptions, rent, and repeat commitments ready to record in one tap—without
            losing control.
          </p>
        </div>
        <button
          type="button"
          className={buttonClassName({ variant: "secondary", size: "sm", className: "rounded-lg" })}
          onClick={() => setOpen(true)}
        >
          <Plus size={15} aria-hidden="true" /> Add recurring
        </button>
      </div>

      {recurring.length ? (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-bg-elev-2/45">
          {recurring.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between ${!item.active ? "opacity-55" : ""}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-elev-1"
                  style={{ color: categoryChartColor(item.categoryColor) }}
                >
                  <Repeat2 size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {item.merchant}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-tertiary">
                    <span>{CADENCE_LABELS[item.cadence]}</span>
                    <span aria-hidden="true">·</span>
                    <span>Next {formatExpenseDate(item.nextDate, true)}</span>
                    {item.categoryName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{item.categoryName}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-base font-semibold tabular-nums text-text-primary">
                  {formatMoney(item.amount, currency)}
                </span>
                {item.active && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => run(item.id)}
                    className={buttonClassName({ size: "sm", className: "rounded-lg" })}
                  >
                    <Check size={14} aria-hidden="true" /> Record
                  </button>
                )}
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => toggle(item)}
                  className="grid size-10 place-items-center rounded-lg text-text-tertiary hover:bg-bg-elev-1 hover:text-text-primary"
                  aria-label={item.active ? `Pause ${item.merchant}` : `Resume ${item.merchant}`}
                >
                  {item.active ? (
                    <Pause size={15} aria-hidden="true" />
                  ) : (
                    <Play size={15} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => remove(item.id)}
                  className="grid size-10 place-items-center rounded-lg text-text-tertiary hover:bg-danger-subtle hover:text-danger"
                  aria-label={`Delete ${item.merchant} recurring expense`}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-dashed border-border-strong bg-bg-elev-2/40 p-5 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-elev-2 text-accent">
              <CalendarClock size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">Nothing on autopilot yet</p>
              <p className="mt-1 text-sm text-text-secondary">
                Add rent, subscriptions, or any regular commitment.
              </p>
            </div>
          </div>
          <button
            type="button"
            className={buttonClassName({ size: "sm", className: "rounded-lg" })}
            onClick={() => setOpen(true)}
          >
            <Plus size={15} aria-hidden="true" /> Add one
          </button>
        </div>
      )}

      {message && (
        <output aria-live="polite" className="mt-4 text-sm text-positive">
          {message}
        </output>
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
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,650px)] overflow-y-auto rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-elev-1/95 px-6 py-5 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Set and forget
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Add recurring expense
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              You stay in control—EXPOZOR never posts automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-xl text-text-secondary hover:bg-bg-elev-2"
            aria-label="Close recurring expense form"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={create} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7" noValidate>
          <div className="sm:col-span-2">
            <label htmlFor={`${titleId}-merchant`} className="mb-2 block text-sm font-medium">
              Merchant
            </label>
            <input
              id={`${titleId}-merchant`}
              name="merchant"
              placeholder="Rent, Netflix, gym…"
              className="min-h-12 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label htmlFor={`${titleId}-amount`} className="mb-2 block text-sm font-medium">
              Amount ({currency})
            </label>
            <input
              id={`${titleId}-amount`}
              name="amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className="min-h-12 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm tabular-nums text-text-primary outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label htmlFor={`${titleId}-cadence`} className="mb-2 block text-sm font-medium">
              Repeats
            </label>
            <select
              id={`${titleId}-cadence`}
              name="cadence"
              defaultValue="monthly"
              className="min-h-12 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none focus:border-accent"
            >
              <option value="weekly">Every week</option>
              <option value="monthly">Every month</option>
              <option value="yearly">Every year</option>
            </select>
          </div>
          <div>
            <label htmlFor={`${titleId}-next-date`} className="mb-2 block text-sm font-medium">
              Next date
            </label>
            <input
              id={`${titleId}-next-date`}
              name="nextDate"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              className="min-h-12 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label htmlFor={`${titleId}-category`} className="mb-2 block text-sm font-medium">
              Category
            </label>
            <select
              id={`${titleId}-category`}
              name="categoryId"
              className="min-h-12 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none focus:border-accent"
            >
              <option value="">Uncategorized</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${titleId}-description`} className="mb-2 block text-sm font-medium">
              Note <span className="font-normal text-text-tertiary">(optional)</span>
            </label>
            <input
              id={`${titleId}-description`}
              name="description"
              placeholder="What is this commitment for?"
              className="min-h-12 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none focus:border-accent"
            />
          </div>
          <div className="flex justify-end border-t border-border pt-5 sm:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className={buttonClassName({ size: "md", className: "rounded-xl" })}
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Check size={16} aria-hidden="true" />
              )}{" "}
              Save recurring expense
            </button>
          </div>
        </form>
      </dialog>
    </article>
  );
}
