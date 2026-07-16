"use client";

import { importExpenses } from "@/app/actions/expenses";
import { buttonClassName } from "@/components/ui/button";
import { FileSpreadsheet, Loader2, Upload, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useTransition } from "react";

export function ImportExpenses() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
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

  async function choose(next: File | null) {
    setFile(next);
    setMessage("");
    if (!next) {
      setPreview([]);
      return;
    }
    const text = (await next.text()).replace(/^\uFEFF/, "");
    setPreview(
      text
        .split(/\r?\n/)
        .filter((line) => line.trim())
        .slice(0, 5)
        .map((line) => line.split(",").map((cell) => cell.replace(/^"|"$/g, ""))),
    );
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setMessage("Choose a CSV file first.");
      return;
    }
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await importExpenses(data);
      if (!result.success) {
        setMessage(result.error);
        return;
      }
      setMessage(
        `${result.imported} expenses imported${result.skipped ? `, ${result.skipped} skipped` : ""}.`,
      );
      if (inputRef.current) inputRef.current.value = "";
      setFile(null);
      setPreview([]);
      window.setTimeout(() => setOpen(false), 1200);
    });
  }

  return (
    <>
      <button
        type="button"
        className={buttonClassName({ variant: "secondary", size: "sm", className: "rounded-lg" })}
        onClick={() => setOpen(true)}
      >
        <Upload size={15} aria-hidden="true" /> Import CSV
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
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,760px)] overflow-y-auto rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-elev-1/95 px-6 py-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border-accent bg-accent-subtle text-accent">
              <FileSpreadsheet size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Bring your history
              </p>
              <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                Import expenses from CSV
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Use Date, Merchant, and Amount columns. Category and Note are optional.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-xl text-text-secondary hover:bg-bg-elev-2"
            aria-label="Close CSV import"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-6 p-6 sm:p-8">
          <label
            htmlFor={`${titleId}-file`}
            className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-bg-elev-2/45 px-5 text-center transition-colors hover:border-border-accent hover:bg-accent-subtle/30"
          >
            <Upload size={24} className="text-accent" aria-hidden="true" />
            <span className="mt-3 text-sm font-semibold text-text-primary">
              {file ? file.name : "Choose a CSV file"}
            </span>
            <span className="mt-1 text-xs text-text-secondary">Up to 500 rows · 2 MB maximum</span>
            <input
              ref={inputRef}
              id={`${titleId}-file`}
              name="file"
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(event) => choose(event.target.files?.[0] ?? null)}
            />
          </label>
          {preview.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="border-b border-border bg-bg-elev-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary">
                Preview
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-xs">
                  <tbody className="divide-y divide-border">
                    {preview.map((row, rowIndex) => (
                      <tr
                        key={`${rowIndex}-${row.join("-")}`}
                        className={
                          rowIndex === 0
                            ? "bg-bg-elev-2/70 font-semibold text-text-primary"
                            : "text-text-secondary"
                        }
                      >
                        {row.map((cell, cellIndex) => (
                          <td key={`${cellIndex}-${cell}`} className="max-w-48 truncate px-4 py-3">
                            {cell || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {message && (
            <output
              aria-live="polite"
              className={`text-sm ${message.includes("imported") ? "text-positive" : "text-danger"}`}
            >
              {message}
            </output>
          )}
          <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={buttonClassName({ variant: "ghost", size: "md" })}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !file}
              className={buttonClassName({ size: "md", className: "rounded-xl" })}
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Upload size={16} aria-hidden="true" />
              )}{" "}
              Import expenses
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
