import { CommandPalette } from "@/components/app/command-palette";
import { QuickAddExpense } from "@/components/app/quick-add-expense";
import { SignOutButton } from "@/components/app/sign-out-button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { WorkspaceSettings } from "@/components/app/workspace-settings";
import { BarChart3, LayoutDashboard, ListFilter, Tags } from "lucide-react";
import Link from "next/link";

type CategoryOption = { id: string; name: string; color: string };

const NAV_ITEMS = [
  { href: "#overview", label: "Overview", icon: LayoutDashboard },
  { href: "#analytics", label: "Analytics", icon: BarChart3 },
  { href: "#transactions", label: "Transactions", icon: ListFilter },
  { href: "#categories", label: "Categories", icon: Tags },
] as const;

export function AppNavigation({
  user,
  categories,
}: {
  user: { name: string; email: string; currency: string; monthly_budget: string | null };
  categories: CategoryOption[];
}) {
  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[272px] flex-col border-r border-border bg-bg-elev-1/90 p-4 backdrop-blur-xl lg:flex">
        <Link
          href="/app"
          className="flex min-h-14 items-center gap-3 rounded-xl px-3 font-semibold tracking-[-0.02em] text-text-primary no-underline"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-lg font-black text-text-inverse shadow-[var(--shadow-glow)]">
            E
          </span>
          <span>
            <span className="block text-[15px]">EXPOZOR</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Private workspace
            </span>
          </span>
        </Link>

        <div className="mt-5">
          <QuickAddExpense
            categories={categories}
            currency={user.currency}
            variant="sidebar"
            label="New expense"
          />
        </div>
        <div className="mt-3">
          <CommandPalette />
        </div>

        <nav aria-label="Workspace navigation" className="mt-7 space-y-1">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Workspace
          </p>
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium no-underline transition-colors ${
                  index === 0
                    ? "border border-border-accent bg-accent-subtle text-accent"
                    : "border border-transparent text-text-secondary hover:bg-bg-elev-2 hover:text-text-primary"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                {item.label}
                {index === 0 && <span className="ml-auto size-1.5 rounded-full bg-accent" />}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2">
          <div className="rounded-2xl border border-border bg-bg-elev-2/70 p-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-decorative-subtle to-accent-subtle text-sm font-bold text-text-primary">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">{user.name}</p>
                <p className="truncate text-xs text-text-tertiary">{user.email}</p>
              </div>
              <SignOutButton compact />
            </div>
          </div>
          <ThemeToggle />
          <WorkspaceSettings
            currency={user.currency}
            monthlyBudget={user.monthly_budget}
            categories={categories}
          />
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur-xl lg:hidden">
        <Link
          href="/app"
          className="flex min-h-11 items-center gap-2.5 font-semibold text-text-primary no-underline"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-accent font-black text-text-inverse">
            E
          </span>
          EXPOZOR
        </Link>
        <div className="flex items-center gap-1">
          <CommandPalette compact />
          <ThemeToggle compact />
          <WorkspaceSettings
            currency={user.currency}
            monthlyBudget={user.monthly_budget}
            categories={categories}
            variant="icon"
          />
          <SignOutButton compact />
        </div>
      </header>

      <nav
        aria-label="Mobile workspace navigation"
        className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border border-border-strong bg-bg-elev-1/95 p-1.5 shadow-[var(--shadow-xl)] backdrop-blur-xl lg:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium text-text-secondary no-underline transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
