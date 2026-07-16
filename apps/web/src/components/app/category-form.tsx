"use client";

import { createCategory } from "@/app/actions/expenses";
import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function CategoryForm() {
  const router = useRouter();
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
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row" noValidate>
      <label htmlFor="new-category" className="sr-only">
        New category name
      </label>
      <Input
        id="new-category"
        name="name"
        placeholder="e.g. Travel"
        required
        disabled={isPending}
      />
      <button type="submit" disabled={isPending} className={buttonClassName({ size: "md" })}>
        {isPending ? (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <Plus size={16} aria-hidden="true" />
        )}
        Add category
      </button>
      {error && (
        <p role="alert" className="text-sm text-danger sm:self-center">
          {error}
        </p>
      )}
    </form>
  );
}
