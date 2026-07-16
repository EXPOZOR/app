import { CategoryDonut, MonthlyBars, SpendingTrendChart } from "@/components/app/analytics-charts";
import { AppNavigation } from "@/components/app/app-navigation";
import { BudgetPlanner } from "@/components/app/budget-planner";
import { ExpenseList } from "@/components/app/expense-list";
import { ImportExpenses } from "@/components/app/import-expenses";
import { QuickAddExpense } from "@/components/app/quick-add-expense";
import { RecurringManager } from "@/components/app/recurring-manager";
import { SpendingHeatmap } from "@/components/app/spending-heatmap";
import { WorkspaceSettings } from "@/components/app/workspace-settings";
import { getCurrentUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";
import { formatExpenseDate, formatMoney } from "@/lib/format";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Filter,
  Gauge,
  ReceiptText,
  Search,
  Sparkles,
  Tags,
  Target,
  TrendingUp,
  Trophy,
  WalletCards,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Financial command center",
  description: "Your private EXPOZOR spending dashboard and expense workspace.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
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
  const currency = user.currency || "USD";
  const budget = Number(user.monthly_budget ?? 0);
  const firstName = user.name.trim().split(/\s+/)[0] || "there";
  const exportHref = "/api/expenses/export";

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_78%_0%,var(--decorative-subtle),transparent_30%),var(--bg)] text-text-primary">
      <AppNavigation user={user} categories={data.categories} />

      <div className="lg:pl-[272px]">
        <main
          id="main-content"
          className="mx-auto max-w-[1540px] px-4 pb-32 pt-7 sm:px-6 sm:pt-9 lg:px-8 lg:pb-16 xl:px-10"
        >
          <header className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                <span>Workspace</span>
                <ChevronRight size={13} aria-hidden="true" />
                <span className="text-accent">Overview</span>
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-4xl">
                Welcome back, {firstName}.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                Your spending signals, monthly pace, and every transaction—organized in one private
                workspace.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex min-h-12 items-center rounded-xl border border-border bg-bg-elev-1 p-1 shadow-[var(--shadow-xs)]">
                <Link
                  href={`/app?month=${data.navigation.previousMonth}`}
                  className="grid size-10 place-items-center rounded-lg text-text-secondary no-underline transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </Link>
                <span className="min-w-32 px-2 text-center text-sm font-semibold text-text-primary sm:min-w-36">
                  {data.selectedMonthLabel}
                </span>
                <Link
                  href={`/app?month=${data.navigation.nextMonth}`}
                  className="grid size-10 place-items-center rounded-lg text-text-secondary no-underline transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <QuickAddExpense categories={data.categories} currency={currency} />
            </div>
          </header>

          {data.analytics.allTimeCount === 0 && (
            <section className="relative mt-8 overflow-hidden rounded-2xl border border-border-accent bg-[linear-gradient(135deg,var(--accent-subtle),var(--bg-elev-1)_48%,var(--decorative-subtle))] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-border-accent opacity-40" />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    <Sparkles size={15} aria-hidden="true" /> Your workspace is ready
                  </p>
                  <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.04em] text-text-primary sm:text-3xl">
                    One expense unlocks your first real insight.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
                    No fake demo numbers. Start with something you bought today and EXPOZOR will
                    build the picture from your real life.
                  </p>
                  <div className="mt-6">
                    <QuickAddExpense
                      categories={data.categories}
                      currency={currency}
                      variant="empty"
                      label="Capture first expense"
                    />
                  </div>
                </div>
                <ol className="grid gap-3" aria-label="Getting started steps">
                  {[
                    ["01", "Capture", "Add the merchant, amount, and date."],
                    ["02", "Organize", "Assign a category that makes sense to you."],
                    ["03", "Understand", "Watch patterns and monthly pace take shape."],
                  ].map(([number, title, copy]) => (
                    <li
                      key={number}
                      className="flex items-center gap-4 rounded-xl border border-border bg-bg/45 p-4 backdrop-blur-sm"
                    >
                      <span className="font-mono text-xs font-semibold text-accent">{number}</span>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-text-secondary">{copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          <section id="overview" aria-labelledby="overview-title" className="scroll-mt-24 pt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Live overview
                </p>
                <h2
                  id="overview-title"
                  className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text-primary"
                >
                  {data.selectedMonthLabel} at a glance
                </h2>
              </div>
              <p className="hidden items-center gap-2 text-xs text-text-tertiary sm:flex">
                <span className="size-1.5 rounded-full bg-positive" /> Synced with your ledger
              </p>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-12">
              <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7 xl:col-span-8">
                <div className="pointer-events-none absolute right-0 top-0 h-52 w-72 bg-[radial-gradient(circle_at_100%_0%,var(--accent-subtle),transparent_68%)]" />
                <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                      <WalletCards size={17} className="text-accent" aria-hidden="true" /> Total
                      spent this month
                    </p>
                    <p className="mt-3 text-4xl font-semibold tracking-[-0.055em] tabular-nums text-text-primary sm:text-5xl">
                      {formatMoney(data.summary.total, currency)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <ChangeBadge change={data.analytics.monthlyChange} />
                      <span className="text-xs text-text-tertiary">
                        compared with {formatMoney(data.analytics.previousTotal, currency)} last
                        month
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-bg-elev-2/70 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
                      Projected month
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-text-primary">
                      {formatMoney(data.analytics.projectedTotal, currency)}
                    </p>
                  </div>
                </div>
                <SpendingTrendChart points={data.analytics.dailyTrend} currency={currency} />
              </article>

              <BudgetCard
                total={data.summary.total}
                budget={budget}
                currency={currency}
                categories={data.categories}
                monthlyBudget={user.monthly_budget}
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={<Gauge size={18} aria-hidden="true" />}
                label="Daily pace"
                value={formatMoney(data.analytics.dailyAverage, currency)}
                detail="Average per elapsed day"
              />
              <MetricCard
                icon={<ReceiptText size={18} aria-hidden="true" />}
                label="Transactions"
                value={String(data.summary.count)}
                detail={`${data.analytics.allTimeCount} tracked all time`}
              />
              <MetricCard
                icon={<Trophy size={18} aria-hidden="true" />}
                label="Largest expense"
                value={
                  data.analytics.largestExpense
                    ? formatMoney(data.analytics.largestExpense.amount, currency)
                    : "—"
                }
                detail={data.analytics.largestExpense?.merchant ?? "Waiting for your first expense"}
              />
              <MetricCard
                icon={<Tags size={18} aria-hidden="true" />}
                label="Leading category"
                value={data.summary.topCategory}
                detail={
                  data.summary.topCategoryTotal
                    ? formatMoney(data.summary.topCategoryTotal, currency)
                    : "Categories will rank automatically"
                }
              />
            </div>
          </section>

          <section id="analytics" aria-labelledby="analytics-title" className="scroll-mt-24 pt-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Analytics
              </p>
              <h2
                id="analytics-title"
                className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text-primary"
              >
                See what the totals are really saying
              </h2>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-12">
              <article
                id="categories"
                className="scroll-mt-24 rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7 xl:col-span-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Category mix</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      Where this month’s money is concentrated.
                    </p>
                  </div>
                  <WorkspaceSettings
                    currency={currency}
                    monthlyBudget={user.monthly_budget}
                    categories={data.categories}
                    variant="icon"
                  />
                </div>
                <CategoryDonut
                  categories={data.analytics.categoryBreakdown}
                  total={data.summary.total}
                  currency={currency}
                />
              </article>

              <article className="rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7 xl:col-span-5">
                <div>
                  <p className="text-sm font-semibold text-text-primary">Six-month rhythm</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    A clean view of how your monthly totals move.
                  </p>
                </div>
                <MonthlyBars points={data.analytics.monthlyTrend} currency={currency} />
                <div className="mt-6 rounded-xl border border-border bg-bg-elev-2/55 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    <TrendingUp size={14} aria-hidden="true" /> All-time tracked
                  </p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-text-primary">
                    {formatMoney(data.analytics.allTimeTotal, currency)}
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <SignalCard
                icon={<CircleDollarSign size={18} aria-hidden="true" />}
                eyebrow="Top merchant"
                title={data.analytics.topMerchant?.name ?? "No merchant yet"}
                copy={
                  data.analytics.topMerchant
                    ? `${formatMoney(data.analytics.topMerchant.total, currency)} across ${data.analytics.topMerchant.count} ${data.analytics.topMerchant.count === 1 ? "expense" : "expenses"}.`
                    : "Your most significant merchant will appear here."
                }
              />
              <SignalCard
                icon={<CalendarDays size={18} aria-hidden="true" />}
                eyebrow="Highest-spend day"
                title={
                  data.analytics.busiestDay
                    ? formatExpenseDate(data.analytics.busiestDay.date)
                    : "No activity yet"
                }
                copy={
                  data.analytics.busiestDay
                    ? `${formatMoney(data.analytics.busiestDay.total, currency)} over ${data.analytics.busiestDay.count} ${data.analytics.busiestDay.count === 1 ? "transaction" : "transactions"}.`
                    : "We’ll highlight the day with the most spending."
                }
              />
              <SignalCard
                icon={<Clock3 size={18} aria-hidden="true" />}
                eyebrow="Monthly direction"
                title={directionTitle(data.analytics.monthlyChange)}
                copy={directionCopy(data.analytics.monthlyChange)}
              />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-12">
              <article className="rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7 xl:col-span-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Spending heatmap</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      A quick read on when your month gets busiest.
                    </p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elev-2 text-accent">
                    <CalendarDays size={17} aria-hidden="true" />
                  </span>
                </div>
                <SpendingHeatmap
                  points={data.analytics.dailyTrend}
                  monthLabel={data.selectedMonthLabel}
                  currency={currency}
                />
              </article>
              <article className="rounded-2xl border border-border bg-[linear-gradient(145deg,var(--bg-elev-1),var(--accent-subtle))] p-5 shadow-[var(--shadow-card)] sm:p-7 xl:col-span-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  <Sparkles size={15} aria-hidden="true" /> Productive next move
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-text-primary">
                  Turn awareness into a system.
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Set category guardrails, keep recurring commitments visible, and import your older
                  history so the signal gets smarter over time.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border border-border bg-bg/35 p-3">
                    <p className="text-lg font-semibold text-text-primary">{data.budgets.length}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-text-tertiary">
                      Budgets
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-bg/35 p-3">
                    <p className="text-lg font-semibold text-text-primary">
                      {data.recurring.filter((item) => item.active).length}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-text-tertiary">
                      Recurring
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-bg/35 p-3">
                    <p className="text-lg font-semibold text-text-primary">
                      {data.categories.length}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-text-tertiary">
                      Categories
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="grid gap-5 pt-10 xl:grid-cols-2" aria-label="Planning and automation">
            <BudgetPlanner
              budgets={data.budgets}
              categories={data.categories}
              breakdown={data.analytics.categoryBreakdown}
              month={data.selectedMonth}
              monthLabel={data.selectedMonthLabel}
              currency={currency}
            />
            <RecurringManager
              recurring={data.recurring}
              categories={data.categories}
              currency={currency}
            />
          </section>

          <section
            id="transactions"
            aria-labelledby="transactions-title"
            className="scroll-mt-24 pt-10"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Ledger
                </p>
                <h2
                  id="transactions-title"
                  className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text-primary"
                >
                  Every transaction, under control
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  {data.analytics.filteredCount}{" "}
                  {data.analytics.filteredCount === 1 ? "result" : "results"} in this view
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ImportExpenses />
                <a
                  href={exportHref}
                  download
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-bg-elev-1 px-4 text-sm font-semibold text-text-primary no-underline transition-colors hover:border-border-strong hover:bg-bg-elev-2"
                >
                  <Download size={16} aria-hidden="true" /> Export CSV
                </a>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-bg-elev-1 p-4 shadow-[var(--shadow-xs)] sm:p-5">
              <FilterBar
                categories={data.categories}
                filters={filters}
                selectedMonth={data.selectedMonth}
              />
            </div>
            <div className="mt-4">
              <ExpenseList
                expenses={data.expenses}
                categories={data.categories}
                currency={currency}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ChangeBadge({ change }: { change: number | null }) {
  if (change === null) {
    return (
      <span className="rounded-full border border-border bg-bg-elev-2 px-2.5 py-1 text-xs text-text-secondary">
        First comparable month
      </span>
    );
  }
  const down = change <= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${down ? "border-positive-border bg-positive-subtle text-positive" : "border-warn/30 bg-warn-subtle text-warn"}`}
    >
      {down ? (
        <ArrowDownRight size={13} aria-hidden="true" />
      ) : (
        <ArrowUpRight size={13} aria-hidden="true" />
      )}
      {Math.abs(change).toFixed(0)}% {down ? "lower" : "higher"}
    </span>
  );
}

function BudgetCard({
  total,
  budget,
  currency,
  categories,
  monthlyBudget,
}: {
  total: number;
  budget: number;
  currency: string;
  categories: { id: string; name: string; color: string }[];
  monthlyBudget: string | null;
}) {
  const percentage = budget ? Math.min((total / budget) * 100, 100) : 0;
  const remaining = budget - total;
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-card)] sm:p-7 xl:col-span-4">
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-accent-subtle blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Target size={17} className="text-accent" aria-hidden="true" /> Monthly target
          </p>
          <p className="mt-1 text-xs text-text-tertiary">A live guardrail, not a restriction.</p>
        </div>
        <WorkspaceSettings
          currency={currency}
          monthlyBudget={monthlyBudget}
          categories={categories}
          variant="budget"
        />
      </div>
      <div className="relative mx-auto mt-8 size-48">
        <div
          className="size-full rounded-full p-[14px]"
          style={{
            background: `conic-gradient(var(--accent) 0% ${percentage}%, var(--bg-muted) ${percentage}% 100%)`,
          }}
          role="img"
          aria-label={
            budget
              ? `${percentage.toFixed(0)} percent of monthly target used.`
              : "No monthly target set."
          }
        >
          <div className="grid size-full place-items-center rounded-full border border-border bg-bg-elev-1 text-center shadow-[inset_0_0_24px_rgba(0,0,0,0.2)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.13em] text-text-tertiary">Used</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-text-primary">
                {budget ? `${percentage.toFixed(0)}%` : "—"}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {budget ? `of ${formatMoney(budget, currency, true)}` : "Set a target"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 rounded-xl border border-border bg-bg-elev-2/55 p-4 text-center">
        <p className="text-xs text-text-tertiary">
          {budget
            ? remaining >= 0
              ? "Still available"
              : "Over target"
            : "Build a healthier monthly rhythm"}
        </p>
        <p
          className={`mt-1 text-lg font-semibold tabular-nums ${remaining < 0 && budget ? "text-danger" : "text-text-primary"}`}
        >
          {budget ? formatMoney(Math.abs(remaining), currency) : "Add your monthly goal"}
        </p>
      </div>
    </article>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: { icon: ReactNode; label: string; value: string; detail: string }) {
  return (
    <article className="group rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-xs)] transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elev-2 text-accent transition-colors group-hover:border-border-accent group-hover:bg-accent-subtle">
          {icon}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-text-tertiary">
          {label}
        </span>
      </div>
      <p className="mt-5 truncate text-2xl font-semibold tracking-[-0.04em] tabular-nums text-text-primary">
        {value}
      </p>
      <p className="mt-1 truncate text-xs text-text-tertiary">{detail}</p>
    </article>
  );
}

function SignalCard({
  icon,
  eyebrow,
  title,
  copy,
}: { icon: ReactNode; eyebrow: string; title: string; copy: string }) {
  return (
    <article className="rounded-2xl border border-border bg-bg-elev-1 p-5 shadow-[var(--shadow-xs)]">
      <span className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elev-2 text-accent">
        {icon}
      </span>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-tertiary">
        {eyebrow}
      </p>
      <h3 className="mt-2 truncate text-lg font-semibold tracking-[-0.025em] text-text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{copy}</p>
    </article>
  );
}

function directionTitle(change: number | null) {
  if (change === null) return "Building your baseline";
  if (change <= -10) return "Trending meaningfully lower";
  if (change < 10) return "Holding relatively steady";
  return "Trending higher this month";
}

function directionCopy(change: number | null) {
  if (change === null)
    return "After another month, you’ll see a useful period-over-period comparison here.";
  if (change <= -10) return `Spending is ${Math.abs(change).toFixed(0)}% below the previous month.`;
  if (change < 10)
    return `Spending is within ${Math.abs(change).toFixed(0)}% of the previous month.`;
  return `Spending is ${change.toFixed(0)}% above the previous month. Review the category mix for context.`;
}

function FilterBar({
  categories,
  filters,
  selectedMonth,
}: {
  categories: { id: string; name: string }[];
  filters: {
    search?: string | undefined;
    categoryId?: string | undefined;
    month?: string | undefined;
  };
  selectedMonth: string;
}) {
  return (
    <form
      method="get"
      className="grid gap-4 lg:grid-cols-[minmax(220px,1fr)_190px_170px_auto] lg:items-end"
    >
      <div>
        <label
          htmlFor="expense-search"
          className="mb-2 block text-xs font-semibold text-text-secondary"
        >
          Search transactions
        </label>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
            aria-hidden="true"
          />
          <input
            id="expense-search"
            name="search"
            defaultValue={filters.search}
            placeholder="Merchant or note"
            className="min-h-12 w-full rounded-xl border border-border bg-bg-elev-2 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="expense-category"
          className="mb-2 block text-xs font-semibold text-text-secondary"
        >
          Category
        </label>
        <select
          id="expense-category"
          name="category"
          defaultValue={filters.categoryId ?? ""}
          className="min-h-12 w-full rounded-xl border border-border bg-bg-elev-2 px-4 text-sm text-text-primary outline-none focus:border-accent"
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
        <label
          htmlFor="expense-month"
          className="mb-2 block text-xs font-semibold text-text-secondary"
        >
          Month
        </label>
        <input
          id="expense-month"
          name="month"
          type="month"
          defaultValue={filters.month ?? selectedMonth}
          className="min-h-12 w-full rounded-xl border border-border bg-bg-elev-2 px-4 text-sm text-text-primary outline-none focus:border-accent"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-bg-elev-2 px-4 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-overlay lg:flex-none"
        >
          <Filter size={15} aria-hidden="true" /> Apply
        </button>
        <Link
          href="/app#transactions"
          className="inline-flex min-h-12 items-center justify-center rounded-xl px-4 text-sm font-medium text-text-tertiary no-underline hover:bg-bg-elev-2 hover:text-text-primary"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
