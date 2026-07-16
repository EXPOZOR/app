"use client";

import { deleteCategory } from "@/app/actions/expenses";
import { updateWorkspacePreferences } from "@/app/actions/preferences";
import { CategoryForm } from "@/components/app/category-form";
import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryChartColor, categoryTone } from "@/lib/category-style";
import { cn } from "@/lib/cn";
import { Check, Loader2, Settings2, SlidersHorizontal, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";

type CategoryOption = { id: string; name: string; color: string };

const CURRENCIES = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "MAD", label: "MAD — Moroccan Dirham" },
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "AUD", label: "AUD — Australian Dollar" },
] as const;

export function WorkspaceSettings({
  currency,
  monthlyBudget,
  categories,
  variant = "sidebar",
}: {
  currency: string;
  monthlyBudget: string | null;
  categories: CategoryOption[];
  variant?: "sidebar" | "budget" | "icon";
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

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

  useEffect(() => {
    const openFromCommand = () => setOpen(true);
    window.addEventListener("expozor:settings", openFromCommand);
    return () => window.removeEventListener("expozor:settings", openFromCommand);
  }, []);

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const formData = new FormData(event.currentTarget);
    startSaving(async () => {
      const result = await updateWorkspacePreferences(formData);
      if (!result.success) {
        setMessage(result.error);
        return;
      }
      setMessage("Workspace preferences saved.");
      router.refresh();
    });
  }

  function removeCategory(id: string) {
    const formData = new FormData();
    formData.set("id", id);
    startDeleting(async () => {
      const result = await deleteCategory(formData);
      if (!result.success) {
        setMessage(result.error);
        return;
      }
      setPendingDelete(null);
      router.refresh();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "sidebar"
            ? "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
            : variant === "icon"
              ? buttonClassName({ variant: "ghost", size: "icon", className: "rounded-xl" })
              : buttonClassName({ variant: "secondary", size: "sm", className: "rounded-lg" })
        }
        aria-label={variant === "icon" ? "Open workspace settings" : undefined}
      >
        {variant === "sidebar" || variant === "icon" ? (
          <Settings2 size={18} aria-hidden="true" />
        ) : (
          <SlidersHorizontal size={15} aria-hidden="true" />
        )}
        {variant === "sidebar" ? (
          "Workspace settings"
        ) : variant === "icon" ? (
          <span className="sr-only">Workspace settings</span>
        ) : monthlyBudget ? (
          "Edit target"
        ) : (
          "Set target"
        )}
      </button>

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
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,720px)] overflow-y-auto rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-elev-1/95 px-6 py-5 backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Personalize
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Workspace settings
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Shape the dashboard around the way you track money.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 shrink-0 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
            aria-label="Close workspace settings"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <section aria-labelledby={`${titleId}-money`}>
            <div className="mb-5">
              <h3 id={`${titleId}-money`} className="text-base font-semibold text-text-primary">
                Money preferences
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Currency changes how amounts are displayed. Your monthly target powers budget
                progress.
              </p>
            </div>
            <form onSubmit={save} className="grid gap-4 sm:grid-cols-2" noValidate>
              <div>
                <label htmlFor={`${titleId}-currency`} className="mb-2 block text-sm font-medium">
                  Display currency
                </label>
                <select
                  id={`${titleId}-currency`}
                  name="currency"
                  defaultValue={currency}
                  className="min-h-12 w-full rounded-md border border-border bg-bg-elevated px-4 text-sm text-text-primary outline-none focus:border-accent"
                >
                  {CURRENCIES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${titleId}-budget`} className="mb-2 block text-sm font-medium">
                  Monthly spending target
                </label>
                <Input
                  id={`${titleId}-budget`}
                  name="monthlyBudget"
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  defaultValue={monthlyBudget ?? ""}
                  placeholder="e.g. 2500"
                  className="tabular-nums"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={buttonClassName({ size: "md", className: "rounded-lg" })}
                >
                  {isSaving ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Check size={16} aria-hidden="true" />
                  )}
                  Save preferences
                </button>
                {message && (
                  <output
                    aria-live="polite"
                    className={cn(
                      "text-sm",
                      message.includes("saved") ? "text-positive" : "text-danger",
                    )}
                  >
                    {message}
                  </output>
                )}
              </div>
            </form>
          </section>

          <section
            id="categories"
            aria-labelledby={`${titleId}-categories`}
            className="border-t border-border pt-8"
          >
            <div>
              <h3
                id={`${titleId}-categories`}
                className="text-base font-semibold text-text-primary"
              >
                Categories
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Add custom categories or remove ones you no longer use. Existing expenses become
                uncategorized.
              </p>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border bg-bg-elev-2/60 px-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: categoryChartColor(category.color) }}
                    />
                    <span className="truncate text-sm font-medium text-text-primary">
                      {category.name}
                    </span>
                  </div>
                  {pendingDelete === category.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => removeCategory(category.id)}
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
                      onClick={() => setPendingDelete(category.id)}
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-lg border transition-colors",
                        categoryTone(category.color),
                        "hover:border-danger/40 hover:bg-danger-subtle hover:text-danger",
                      )}
                      aria-label={`Remove ${category.name}`}
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <CategoryForm />
          </section>
        </div>
      </dialog>
    </>
  );
}
