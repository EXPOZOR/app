"use client";

import { deleteExpense } from "@/app/actions/expenses";
import { type EditableExpense, ExpenseForm } from "@/components/app/expense-form";
import { QuickAddExpense } from "@/components/app/quick-add-expense";
import { buttonClassName } from "@/components/ui/button";
import { categoryChartColor, categoryTone } from "@/lib/category-style";
import { cn } from "@/lib/cn";
import type { DashboardExpense } from "@/lib/dashboard";
import { formatExpenseDate, formatMoney } from "@/lib/format";
import { MoreHorizontal, Pencil, ReceiptText, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

type CategoryOption = { id: string; name: string; color: string };

export function ExpenseList({
  expenses,
  categories,
  currency,
}: {
  expenses: DashboardExpense[];
  categories: CategoryOption[];
  currency: string;
}) {
  const router = useRouter();
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState<EditableExpense | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isDeleting, startDelete] = useTransition();

  useEffect(() => {
    const dialog = editDialogRef.current;
    if (!dialog) return;
    if (editing && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!editing && dialog.open) {
      dialog.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editing]);

  function remove(id: string) {
    setError("");
    const formData = new FormData();
    formData.set("id", id);
    startDelete(async () => {
      const result = await deleteExpense(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setPendingDelete(null);
      router.refresh();
    });
  }

  function closeEdit() {
    setEditing(null);
    document.body.style.overflow = "";
  }

  if (expenses.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-border-strong bg-bg-elev-1 px-6 py-16 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-subtle),transparent_42%)]" />
        <div className="relative mx-auto max-w-md">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-border-accent bg-accent-subtle text-accent shadow-[var(--shadow-card)]">
            <ReceiptText size={24} aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-text-primary">
            Your ledger is ready
          </h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            No expenses match this view yet. Capture your first one or clear the filters to reveal
            more history.
          </p>
          <div className="mt-6 flex justify-center">
            <QuickAddExpense
              categories={categories}
              currency={currency}
              variant="empty"
              label="Add first expense"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-elev-1 shadow-[var(--shadow-card)]">
        {error && (
          <p
            role="alert"
            className="border-b border-danger/30 bg-danger-subtle px-5 py-3 text-sm text-danger"
          >
            {error}
          </p>
        )}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-bg-elev-2/80 text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Merchant
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Category
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-5 py-4 text-right font-semibold">
                  Amount
                </th>
                <th scope="col" className="w-28 px-5 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="group align-middle transition-colors hover:bg-bg-elev-2/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-xl border text-sm font-bold"
                        style={{
                          color: categoryChartColor(expense.categoryColor),
                          borderColor: `color-mix(in oklch, ${categoryChartColor(expense.categoryColor)} 28%, transparent)`,
                          background: `color-mix(in oklch, ${categoryChartColor(expense.categoryColor)} 10%, transparent)`,
                        }}
                      >
                        {expense.merchant.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-text-primary">
                          {expense.merchant}
                        </div>
                        <div className="mt-0.5 max-w-[280px] truncate text-xs text-text-tertiary">
                          {expense.description || "No note added"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                        categoryTone(expense.categoryColor),
                      )}
                    >
                      {expense.categoryName ?? "Uncategorized"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                    {formatExpenseDate(expense.expenseDate, true)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right text-base font-semibold tabular-nums text-text-primary">
                    {formatMoney(expense.amount, currency)}
                  </td>
                  <td className="px-5 py-4">
                    {pendingDelete === expense.id ? (
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => remove(expense.id)}
                          className="min-h-10 rounded-lg px-2 text-xs font-semibold text-danger hover:bg-danger-subtle"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(null)}
                          className="grid size-10 place-items-center rounded-lg text-text-secondary hover:bg-bg-overlay"
                          aria-label="Cancel delete"
                        >
                          <X size={15} aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        <button
                          type="button"
                          className={buttonClassName({
                            variant: "ghost",
                            size: "icon",
                            className: "rounded-lg",
                          })}
                          aria-label={`Edit ${expense.merchant}`}
                          onClick={() => setEditing(expense)}
                        >
                          <Pencil size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className={buttonClassName({
                            variant: "ghost",
                            size: "icon",
                            className: "rounded-lg text-danger hover:text-danger",
                          })}
                          aria-label={`Delete ${expense.merchant}`}
                          onClick={() => setPendingDelete(expense.id)}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-border md:hidden">
          {expenses.map((expense) => (
            <article key={expense.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl border text-sm font-bold"
                    style={{
                      color: categoryChartColor(expense.categoryColor),
                      borderColor: `color-mix(in oklch, ${categoryChartColor(expense.categoryColor)} 28%, transparent)`,
                      background: `color-mix(in oklch, ${categoryChartColor(expense.categoryColor)} 10%, transparent)`,
                    }}
                  >
                    {expense.merchant.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-text-primary">{expense.merchant}</h3>
                    <p className="mt-1 truncate text-xs text-text-tertiary">
                      {formatExpenseDate(expense.expenseDate, true)} ·{" "}
                      {expense.categoryName ?? "Uncategorized"}
                    </p>
                  </div>
                </div>
                <p className="whitespace-nowrap font-semibold tabular-nums text-text-primary">
                  {formatMoney(expense.amount, currency)}
                </p>
              </div>
              {expense.description && (
                <p className="mt-3 text-sm leading-6 text-text-secondary">{expense.description}</p>
              )}
              <div className="mt-3 flex items-center justify-end gap-2">
                {pendingDelete === expense.id ? (
                  <>
                    <span className="mr-auto text-xs text-text-secondary">
                      Remove this expense?
                    </span>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => remove(expense.id)}
                      className="min-h-11 rounded-lg bg-danger-subtle px-3 text-sm font-semibold text-danger"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(null)}
                      className="min-h-11 rounded-lg px-3 text-sm text-text-secondary hover:bg-bg-elev-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className={buttonClassName({
                        variant: "ghost",
                        size: "sm",
                        className: "rounded-lg",
                      })}
                      onClick={() => setEditing(expense)}
                    >
                      <Pencil size={14} aria-hidden="true" /> Edit
                    </button>
                    <button
                      type="button"
                      className={buttonClassName({
                        variant: "ghost",
                        size: "icon",
                        className: "rounded-lg",
                      })}
                      aria-label={`More actions for ${expense.merchant}`}
                      onClick={() => setPendingDelete(expense.id)}
                    >
                      <MoreHorizontal size={17} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <dialog
        ref={editDialogRef}
        aria-labelledby="edit-expense-title"
        onClose={closeEdit}
        onCancel={(event) => {
          event.preventDefault();
          closeEdit();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,620px)] overflow-y-auto rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        {editing && (
          <>
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-elev-1/95 px-6 py-5 backdrop-blur-xl sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Edit transaction
                </p>
                <h2
                  id="edit-expense-title"
                  className="mt-1 text-xl font-semibold tracking-[-0.03em]"
                >
                  Update {editing.merchant}
                </h2>
              </div>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
                aria-label="Close edit form"
                onClick={closeEdit}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 sm:p-7">
              <ExpenseForm
                categories={categories}
                currency={currency}
                initial={editing}
                formId={`edit-${editing.id}`}
                onCancel={closeEdit}
                onSuccess={closeEdit}
              />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
