"use client";

import { deleteExpense } from "@/app/actions/expenses";
import { buttonClassName } from "@/components/ui/button";
import type { DashboardExpense } from "@/lib/dashboard";
import { Pencil, ReceiptText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { type EditableExpense, ExpenseForm } from "./expense-form";

type CategoryOption = { id: string; name: string; color: string };

function money(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function ExpenseList({
  expenses,
  categories,
}: { expenses: DashboardExpense[]; categories: CategoryOption[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<EditableExpense | null>(null);
  const [isDeleting, startDelete] = useTransition();

  function remove(id: string) {
    if (!window.confirm("Remove this expense? This cannot be undone.")) return;
    const formData = new FormData();
    formData.set("id", id);
    startDelete(async () => {
      const result = await deleteExpense(formData);
      if (!result.success) window.alert(result.error);
      router.refresh();
    });
  }

  if (expenses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-strong bg-bg-elev-1 px-6 py-14 text-center">
        <ReceiptText size={28} className="mx-auto text-text-tertiary" aria-hidden="true" />
        <h3 className="mt-4 text-base font-semibold text-text-primary">
          No expenses match this view
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
          Add your first expense or clear the filters to see more of your spending.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg-elev-1">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-border bg-bg-elev-2 text-xs uppercase tracking-[0.12em] text-text-tertiary">
            <tr>
              <th scope="col" className="px-5 py-4 font-medium">
                Expense
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Category
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Date
              </th>
              <th scope="col" className="px-5 py-4 text-right font-medium">
                Amount
              </th>
              <th scope="col" className="px-5 py-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {expenses.map((expense) => (
              <tr key={expense.id} className="align-middle transition-colors hover:bg-bg-elev-2/60">
                <td className="px-5 py-4">
                  <div className="font-medium text-text-primary">{expense.merchant}</div>
                  {expense.description && (
                    <div className="mt-1 max-w-[260px] truncate text-xs text-text-tertiary">
                      {expense.description}
                    </div>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full border border-border px-2.5 py-1 text-xs text-text-secondary">
                    {expense.categoryName ?? "Uncategorized"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                  {formatDate(expense.expenseDate)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-semibold tabular-nums text-text-primary">
                  {money(expense.amount)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      className={buttonClassName({ variant: "ghost", size: "icon" })}
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
                        className: "text-danger hover:text-danger",
                      })}
                      aria-label={`Delete ${expense.merchant}`}
                      aria-disabled={isDeleting}
                      disabled={isDeleting}
                      onClick={() => remove(expense.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
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
              <div>
                <h3 className="font-medium text-text-primary">{expense.merchant}</h3>
                <p className="mt-1 text-xs text-text-tertiary">
                  {formatDate(expense.expenseDate)} · {expense.categoryName ?? "Uncategorized"}
                </p>
              </div>
              <p className="whitespace-nowrap font-semibold tabular-nums text-text-primary">
                {money(expense.amount)}
              </p>
            </div>
            {expense.description && (
              <p className="mt-3 text-sm leading-6 text-text-secondary">{expense.description}</p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className={buttonClassName({ variant: "secondary", size: "sm" })}
                onClick={() => setEditing(expense)}
              >
                <Pencil size={14} aria-hidden="true" />
                Edit
              </button>
              <button
                type="button"
                className={buttonClassName({
                  variant: "ghost",
                  size: "sm",
                  className: "text-danger",
                })}
                disabled={isDeleting}
                onClick={() => remove(expense.id)}
              >
                <Trash2 size={14} aria-hidden="true" />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
      {editing && (
        <div className="border-t border-border bg-bg-elev-2 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Editing expense
              </p>
              <h3 className="mt-1 text-lg font-semibold text-text-primary">Update the details</h3>
            </div>
            <button
              type="button"
              className={buttonClassName({ variant: "ghost", size: "icon" })}
              aria-label="Close edit form"
              onClick={() => setEditing(null)}
            >
              ×
            </button>
          </div>
          <ExpenseForm
            categories={categories}
            initial={editing}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
    </div>
  );
}
