"use client";

import { createCategory } from "@/app/actions/expenses";
import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_COLOR_OPTIONS, categoryChartColor } from "@/lib/category-style";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";

export function CategoryForm() {
  const router = useRouter();
  const formId = useId();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    startTransition(async () => {
      const result = await createCategory(new FormData(form));
      if (!result.success) {
        setError(result.error);
        return;
      }
      form.reset();
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5" noValidate>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_120px_auto]">
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">
            New category name
          </label>
          <Input
            id={`${formId}-name`}
            name="name"
            placeholder="New category name"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-color`} className="sr-only">
            Category color
          </label>
          <select
            id={`${formId}-color`}
            name="color"
            defaultValue="mint"
            disabled={isPending}
            className="min-h-12 w-full rounded-md border border-border bg-bg-elevated px-3 text-sm text-text-primary outline-none focus:border-accent"
          >
            {CATEGORY_COLOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={buttonClassName({ size: "md", className: "rounded-md" })}
        >
          {isPending ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Plus size={16} aria-hidden="true" />
          )}
          Add
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
        {CATEGORY_COLOR_OPTIONS.map((option) => (
          <span
            key={option.value}
            className="size-2.5 rounded-full"
            style={{ background: categoryChartColor(option.value) }}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
}
