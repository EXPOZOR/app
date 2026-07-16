import { CategoryForm } from "@/components/app/category-form";
import { ExpenseForm } from "@/components/app/expense-form";
import { ExpenseList } from "@/components/app/expense-list";
import { SignOutButton } from "@/components/app/sign-out-button";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";
import {
  CalendarDays,
  Download,
  Filter,
  LayoutDashboard,
  ReceiptText,
  Tags,
  WalletCards,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your workspace",
  description: "Your private EXPOZOR expense workspace.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function money(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default async function AppPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/app");

  const params = await searchParams;
  const filters = {
    search: one(params.search),
    categoryId: one(params.category),
    month: one(params.month),
  };
  const data = await getDashboardData(user.id, filters);
  const exportParams = new URLSearchParams();
  const exportHref = `/api/expenses/export${exportParams.toString() ? `?${exportParams}` : ""}`;

  return (
    <div className="min-h-dvh bg-bg text-text-primary">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/app"
            className="inline-flex min-h-11 items-center gap-3 font-semibold tracking-[-0.02em] text-text-primary no-underline"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-accent text-lg font-black text-text-inverse">
              E
            </span>
            <span>EXPOZOR</span>
            <span className="hidden rounded-full border border-border-accent bg-accent-subtle px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent sm:inline-flex">
              Workspace
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-text-secondary sm:inline">{user.name}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              <LayoutDashboard size={16} aria-hidden="true" /> Your overview
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-4xl">
              A clearer picture of your spending.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
              Add expenses as they happen, then use the monthly view to spot patterns without
              connecting a bank account.
            </p>
          </div>
          <a
            href={exportHref}
            download
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-border bg-bg-elev-1 px-5 text-sm font-semibold text-text-primary no-underline transition-colors hover:border-border-strong hover:bg-bg-elev-2"
          >
            <Download size={17} aria-hidden="true" /> Export CSV
          </a>
        </div>

        <section aria-labelledby="monthly-summary" className="mt-8">
          <h2 id="monthly-summary" className="sr-only">
            Monthly summary
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={<WalletCards size={18} aria-hidden="true" />}
              label={`Spent in ${data.selectedMonth}`}
              value={money(data.summary.total)}
              detail={
                data.summary.count
                  ? `${data.summary.count} tracked ${data.summary.count === 1 ? "expense" : "expenses"}`
                  : "Add your first expense"
              }
            />
            <SummaryCard
              icon={<ReceiptText size={18} aria-hidden="true" />}
              label="Average expense"
              value={money(data.summary.average)}
              detail="Across this month"
            />
            <SummaryCard
              icon={<Tags size={18} aria-hidden="true" />}
              label="Top category"
              value={data.summary.topCategory}
              detail={
                data.summary.topCategoryTotal
                  ? `${money(data.summary.topCategoryTotal)} this month`
                  : "Your patterns will appear here"
              }
            />
            <SummaryCard
              icon={<CalendarDays size={18} aria-hidden="true" />}
              label="Tracking since"
              value={user.created_at.toISOString().slice(0, 10)}
              detail="Your private workspace"
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section
            aria-labelledby="add-expense"
            className="rounded-xl border border-border bg-bg-elev-1 p-5 sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Manual entry
                </p>
                <h2
                  id="add-expense"
                  className="mt-2 text-xl font-semibold tracking-[-0.03em] text-text-primary"
                >
                  Add an expense
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Keep the details you’ll want when you review the month.
                </p>
              </div>
              <span className="grid size-10 place-items-center rounded-xl bg-accent-subtle text-accent">
                <ReceiptText size={19} aria-hidden="true" />
              </span>
            </div>
            <ExpenseForm categories={data.categories} />
          </section>

          <section
            aria-labelledby="categories"
            className="rounded-xl border border-border bg-bg-elev-1 p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Your system
                </p>
                <h2
                  id="categories"
                  className="mt-2 text-xl font-semibold tracking-[-0.03em] text-text-primary"
                >
                  Categories
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Start with the defaults, then add categories that fit your real life.
                </p>
              </div>
              <span className="grid size-10 place-items-center rounded-xl bg-accent-subtle text-accent">
                <Tags size={19} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full border border-border px-3 py-2 text-sm text-text-secondary"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <CategoryForm />
          </section>
        </div>

        <section aria-labelledby="expense-history" className="mt-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                <ReceiptText size={16} aria-hidden="true" /> Your ledger
              </p>
              <h2
                id="expense-history"
                className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text-primary"
              >
                Expense history
              </h2>
            </div>
            <FilterBar
              categories={data.categories}
              filters={filters}
              selectedMonth={data.selectedMonth}
            />
          </div>
          <div className="mt-5">
            <ExpenseList expenses={data.expenses} categories={data.categories} />
          </div>
        </section>
      </main>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  detail,
}: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return (
    <article className="rounded-xl border border-border bg-bg-elev-1 p-5">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span className="text-accent">{icon}</span>
        {label}
      </div>
      <p className="mt-4 truncate text-2xl font-semibold tracking-[-0.04em] text-text-primary">
        {value}
      </p>
      <p className="mt-2 truncate text-xs text-text-tertiary">{detail}</p>
    </article>
  );
}

function FilterBar({
  categories,
  filters,
  selectedMonth,
}: {
  categories: { id: string; name: string }[];
  filters: { search?: string | undefined; categoryId?: string | undefined };
  selectedMonth: string;
}) {
  return (
    <form
      method="get"
      className="grid gap-3 sm:grid-cols-[minmax(180px,1fr)_minmax(145px,auto)_auto_auto] md:min-w-[560px]"
    >
      <div className="relative">
        <label htmlFor="expense-search" className="sr-only">
          Search expenses
        </label>
        <input
          id="expense-search"
          name="search"
          defaultValue={filters.search}
          placeholder="Search merchant or note"
          className="min-h-11 w-full rounded border border-border bg-bg-elev-1 px-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="expense-category" className="sr-only">
          Filter by category
        </label>
        <select
          id="expense-category"
          name="category"
          defaultValue={filters.categoryId ?? ""}
          className="min-h-11 w-full rounded border border-border bg-bg-elev-1 px-3 text-sm text-text-primary outline-none focus:border-accent"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="expense-month" className="sr-only">
          Filter by month
        </label>
        <input
          id="expense-month"
          name="month"
          type="month"
          defaultValue={selectedMonth}
          className="min-h-11 w-full rounded border border-border bg-bg-elev-1 px-3 text-sm text-text-primary outline-none focus:border-accent"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-bg-elev-2 px-4 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-overlay"
        >
          <Filter size={15} aria-hidden="true" />
          Filter
        </button>
        <Link
          href="/app"
          className="inline-flex min-h-11 items-center justify-center rounded px-3 text-sm font-medium text-text-tertiary no-underline hover:bg-bg-elev-2 hover:text-text-primary"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
