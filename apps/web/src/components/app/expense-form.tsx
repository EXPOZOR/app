"use client";

import { createExpense, updateExpense } from "@/app/actions/expenses";
import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, CircleDollarSign, Loader2, Plus, Save, Store, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";

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
  onSuccess,
  currency = "USD",
  formId,
}: {
  categories: CategoryOption[];
  initial?: EditableExpense;
  onCancel?: () => void;
  onSuccess?: () => void;
  currency?: string;
  formId?: string;
}) {
  const router = useRouter();
  const generatedId = useId();
  const idPrefix = formId ?? generatedId;
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
      onSuccess?.();
      router.refresh();
    });
  }

  const currencySymbol =
    new Intl.NumberFormat("en-US", { style: "currency", currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? currency;
  const fieldId = (name: string) => `${idPrefix}-${name}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={fieldId("merchant")}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Merchant
          </label>
          <div className="relative">
            <Store
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
            />
            <Input
              id={fieldId("merchant")}
              name="merchant"
              defaultValue={initial?.merchant}
              placeholder="Where did you spend?"
              className="pl-11"
              autoFocus
              required
              disabled={isPending}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={fieldId("amount")}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Amount <span className="font-normal text-text-tertiary">({currencySymbol})</span>
          </label>
          <div className="relative">
            <CircleDollarSign
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
            />
            <Input
              id={fieldId("amount")}
              name="amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              defaultValue={initial ? initial.amount.toFixed(2) : undefined}
              placeholder="0.00"
              className="pl-11 tabular-nums"
              required
              disabled={isPending}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={fieldId("expenseDate")}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Date
          </label>
          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
            />
            <Input
              id={fieldId("expenseDate")}
              name="expenseDate"
              type="date"
              defaultValue={initial?.expenseDate ?? today()}
              className="pl-11"
              required
              disabled={isPending}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={fieldId("categoryId")}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Category
          </label>
          <select
            id={fieldId("categoryId")}
            name="categoryId"
            defaultValue={initial?.categoryId ?? ""}
            disabled={isPending}
            className="min-h-12 w-full rounded-md border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none transition-colors focus:border-accent"
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
            htmlFor={fieldId("description")}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Note <span className="font-normal text-text-tertiary">(optional)</span>
          </label>
          <Input
            id={fieldId("description")}
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
          className="rounded-md border border-danger/40 bg-danger-subtle px-4 py-3 text-sm text-text-primary"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <button
          type="submit"
          disabled={isPending}
          className={buttonClassName({ size: "md", className: "shadow-[var(--shadow-glow)]" })}
        >
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
