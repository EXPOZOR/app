"use client";

import { ExpenseForm } from "@/components/app/expense-form";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Plus, ReceiptText, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type CategoryOption = { id: string; name: string; color: string };

export function QuickAddExpense({
  categories,
  currency,
  variant = "primary",
  label = "Add expense",
}: {
  categories: CategoryOption[];
  currency: string;
  variant?: "primary" | "sidebar" | "empty";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();

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
    if (variant !== "primary") return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if (event.key.toLowerCase() === "n" && !isTyping && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [variant]);

  const triggerClass =
    variant === "sidebar"
      ? buttonClassName({
          size: "md",
          fullWidth: true,
          className: "justify-start rounded-xl px-4 shadow-[var(--shadow-glow)]",
        })
      : variant === "empty"
        ? buttonClassName({ size: "lg", className: "rounded-xl shadow-[var(--shadow-glow)]" })
        : buttonClassName({ size: "md", className: "rounded-xl shadow-[var(--shadow-glow)]" });

  return (
    <>
      <button type="button" className={triggerClass} onClick={() => setOpen(true)}>
        <Plus size={17} aria-hidden="true" />
        {label}
        {variant === "primary" && (
          <span className="ml-1 hidden rounded-md border border-black/15 bg-black/10 px-1.5 py-0.5 text-[10px] font-bold sm:inline">
            N
          </span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${formId}-title`}
        onClose={() => {
          setOpen(false);
          document.body.style.overflow = "";
        }}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        className={cn(
          "m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,620px)] overflow-y-auto rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)]",
          "backdrop:bg-black/75 backdrop:backdrop-blur-sm",
        )}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-elev-1/95 px-6 py-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border-accent bg-accent-subtle text-accent">
              <ReceiptText size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <Sparkles size={13} aria-hidden="true" /> Quick capture
              </p>
              <h2 id={`${formId}-title`} className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                Add a new expense
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Capture it now. Understand it later.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 shrink-0 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
            aria-label="Close expense form"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <div className="p-6 sm:p-7">
          <ExpenseForm
            categories={categories}
            currency={currency}
            formId={`${formId}-expense`}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </dialog>
    </>
  );
}
