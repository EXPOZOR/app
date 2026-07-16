"use client";

import { createExpense, updateExpense } from "@/app/actions/expenses";
import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type CategoryOption = { id: string; name: string; color: string };

export type EditableExpense = {
  id: string;
  merchant: string;
  description: string | null;
  amount: number;
  expenseDate: string;
  categoryId: string | null;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function ExpenseForm({
  categories,
  initial,
  onCancel,
}: {
  categories: CategoryOption[];
  initial?: EditableExpense;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const editing = Boolean(initial);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (initial) formData.set("id", initial.id);

    startTransition(async () => {
      const result = initial ? await updateExpense(formData) : await createExpense(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      if (!initial) form.reset();
      onCancel?.();
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={initial ? `edit-merchant-${initial.id}` : "merchant"}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Merchant
          </label>
          <Input
            id={initial ? `edit-merchant-${initial.id}` : "merchant"}
            name="merchant"
            defaultValue={initial?.merchant}
            placeholder="Coffee shop, rent, train…"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label
            htmlFor={initial ? `edit-amount-${initial.id}` : "amount"}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Amount
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">
              $
            </span>
            <Input
              id={initial ? `edit-amount-${initial.id}` : "amount"}
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              defaultValue={initial ? initial.amount.toFixed(2) : undefined}
              placeholder="0.00"
              className="pl-8"
              required
              disabled={isPending}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={initial ? `edit-date-${initial.id}` : "expenseDate"}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Date
          </label>
          <Input
            id={initial ? `edit-date-${initial.id}` : "expenseDate"}
            name="expenseDate"
            type="date"
            defaultValue={initial?.expenseDate ?? today()}
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label
            htmlFor={initial ? `edit-category-${initial.id}` : "categoryId"}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Category
          </label>
          <select
            id={initial ? `edit-category-${initial.id}` : "categoryId"}
            name="categoryId"
            defaultValue={initial?.categoryId ?? ""}
            disabled={isPending}
            className="min-h-12 w-full rounded border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none transition-colors focus:border-accent"
          >
            <option value="">Uncategorized</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={initial ? `edit-description-${initial.id}` : "description"}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Note <span className="font-normal text-text-tertiary">(optional)</span>
          </label>
          <Input
            id={initial ? `edit-description-${initial.id}` : "description"}
            name="description"
            defaultValue={initial?.description ?? ""}
            placeholder="What was it for?"
            disabled={isPending}
          />
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded border border-danger/40 bg-danger-subtle px-3 py-2 text-sm text-text-primary"
        >
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={isPending} className={buttonClassName({ size: "md" })}>
          {isPending ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : editing ? (
            <Save size={16} aria-hidden="true" />
          ) : (
            <Plus size={16} aria-hidden="true" />
          )}
          {isPending ? "Saving…" : editing ? "Save changes" : "Add expense"}
        </button>
        {editing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className={buttonClassName({ variant: "ghost", size: "md" })}
          >
            <X size={16} aria-hidden="true" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
