"use client";

import { cn } from "@/lib/cn";
import {
  BarChart3,
  Command,
  Download,
  ListFilter,
  Plus,
  Search,
  Settings2,
  Tags,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const ACTIONS = [
  {
    id: "new",
    label: "Add a new expense",
    hint: "Capture spending instantly",
    icon: Plus,
    event: "expozor:quick-add",
  },
  {
    id: "search",
    label: "Search transactions",
    hint: "Jump to your ledger",
    icon: Search,
    href: "#transactions",
  },
  {
    id: "analytics",
    label: "Open analytics",
    hint: "See your spending signals",
    icon: BarChart3,
    href: "#analytics",
  },
  {
    id: "planning",
    label: "Plan category budgets",
    hint: "Set guardrails for the month",
    icon: Tags,
    href: "#planning",
  },
  {
    id: "recurring",
    label: "Manage recurring expenses",
    hint: "Subscriptions and commitments",
    icon: ListFilter,
    href: "#recurring",
  },
  {
    id: "settings",
    label: "Open workspace settings",
    hint: "Currency, target, categories",
    icon: Settings2,
    event: "expozor:settings",
  },
  {
    id: "export",
    label: "Export all expenses",
    hint: "Download a clean CSV",
    icon: Download,
    href: "/api/expenses/export",
  },
] as const;

export function CommandPalette({ compact = false }: { compact?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = ACTIONS.filter((action) =>
    `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !(event.target as HTMLElement)?.matches("input, textarea, select")
      ) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 30);
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function choose(action: (typeof ACTIONS)[number]) {
    if ("event" in action) window.dispatchEvent(new CustomEvent(action.event));
    if (action.id === "search")
      window.setTimeout(() => document.getElementById("expense-search")?.focus(), 80);
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-bg-elev-1 px-3 text-sm font-medium text-text-secondary transition-colors hover:border-border-strong hover:bg-bg-elev-2 hover:text-text-primary",
          compact && "grid size-11 place-items-center p-0",
        )}
        aria-label="Open command center"
      >
        <Command size={16} aria-hidden="true" />
        {!compact && (
          <>
            <span>Command center</span>
            <kbd className="ml-1 hidden rounded-md border border-border bg-bg-elev-2 px-1.5 py-0.5 font-mono text-[10px] text-text-tertiary sm:inline">
              ⌘K
            </kbd>
          </>
        )}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          setQuery("");
          document.body.style.overflow = "";
        }}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        className="m-auto w-[min(94vw,620px)] overflow-hidden rounded-2xl border border-border-strong bg-bg-elev-1 p-0 text-text-primary shadow-[var(--shadow-xl)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <div className="border-b border-border p-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-elev-2 px-4">
            <Search size={18} className="shrink-0 text-text-tertiary" aria-hidden="true" />
            <label htmlFor={`${titleId}-input`} className="sr-only">
              Search command center
            </label>
            <input
              ref={inputRef}
              id={`${titleId}-input`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search actions…"
              className="min-h-12 min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
            <kbd className="hidden rounded-md border border-border px-1.5 py-1 font-mono text-[10px] text-text-tertiary sm:inline">
              ESC
            </kbd>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-9 place-items-center rounded-lg text-text-secondary hover:bg-bg-overlay"
              aria-label="Close command center"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="max-h-[min(60vh,480px)] overflow-y-auto p-2">
          <div className="px-3 pb-2 pt-1">
            <h2
              id={titleId}
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
            >
              Suggested actions
            </h2>
          </div>
          {filtered.length ? (
            filtered.map((action) => {
              const Icon = action.icon;
              const content = (
                <>
                  <span className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elev-2 text-accent">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block truncate text-sm font-semibold text-text-primary">
                      {action.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-text-secondary">
                      {action.hint}
                    </span>
                  </span>
                </>
              );
              if ("href" in action)
                return (
                  <Link
                    key={action.id}
                    href={action.href}
                    download={action.id === "export"}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex min-h-14 w-full items-center gap-3 rounded-xl px-3 no-underline transition-colors hover:bg-bg-elev-2"
                  >
                    {content}
                  </Link>
                );
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => choose(action)}
                  className="flex min-h-14 w-full items-center gap-3 rounded-xl px-3 transition-colors hover:bg-bg-elev-2"
                >
                  {content}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-10 text-center text-sm text-text-secondary">
              No actions match “{query}”.
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-border px-4 py-3 text-xs text-text-tertiary">
          <Command size={13} aria-hidden="true" /> Press{" "}
          <kbd className="rounded border border-border bg-bg-elev-2 px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>{" "}
          anytime to open this center.
        </div>
      </dialog>
    </>
  );
}
