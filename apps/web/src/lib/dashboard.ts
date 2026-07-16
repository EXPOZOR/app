import { db } from "@/db/client";
import { categories, category_budgets, expenses, recurring_expenses } from "@/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export type DashboardFilters = {
  search?: string | undefined;
  categoryId?: string | undefined;
  month?: string | undefined;
};

export type DashboardExpense = {
  id: string;
  merchant: string;
  description: string | null;
  amount: number;
  expenseDate: string;
  categoryId: string | null;
  categoryName: string | null;
  categoryColor: string | null;
};

export type TrendPoint = { key: string; label: string; value: number };
export type CategoryBreakdown = {
  name: string;
  color: string;
  total: number;
  count: number;
  percentage: number;
};

export type DashboardBudget = {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  month: string;
  amount: number;
};

export type DashboardRecurring = {
  id: string;
  merchant: string;
  description: string | null;
  amount: number;
  cadence: "weekly" | "monthly" | "yearly";
  nextDate: string;
  active: boolean;
  categoryId: string | null;
  categoryName: string | null;
  categoryColor: string | null;
};

function monthKey(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function monthDate(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, 1));
}

function shiftMonth(key: string, amount: number) {
  const date = monthDate(key);
  date.setUTCMonth(date.getUTCMonth() + amount);
  return monthKey(date);
}

function shortMonth(key: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(
    monthDate(key),
  );
}

function toExpense(row: {
  id: string;
  merchant: string;
  description: string | null;
  amount: string;
  expenseDate: string;
  categoryId: string | null;
  categoryName: string | null;
  categoryColor: string | null;
}): DashboardExpense {
  return { ...row, amount: Number(row.amount) };
}

function buildDailyTrend(expensesForMonth: DashboardExpense[], selectedMonth: string) {
  const date = monthDate(selectedMonth);
  const days = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  const totals = new Map<number, number>();

  for (const expense of expensesForMonth) {
    const day = Number(expense.expenseDate.slice(8, 10));
    totals.set(day, (totals.get(day) ?? 0) + expense.amount);
  }

  return Array.from({ length: days }, (_, index) => ({
    key: `${selectedMonth}-${String(index + 1).padStart(2, "0")}`,
    label: String(index + 1),
    value: totals.get(index + 1) ?? 0,
  }));
}

function buildMonthlyTrend(allExpenses: DashboardExpense[], selectedMonth: string) {
  return Array.from({ length: 6 }, (_, index) => shiftMonth(selectedMonth, index - 5)).map(
    (key) => ({
      key,
      label: shortMonth(key),
      value: allExpenses
        .filter((expense) => expense.expenseDate.startsWith(key))
        .reduce((sum, expense) => sum + expense.amount, 0),
    }),
  );
}

export async function getDashboardData(userId: string, filters: DashboardFilters) {
  const requestedMonth =
    filters.month && /^\d{4}-\d{2}$/.test(filters.month) ? filters.month : null;
  const selectedMonth = requestedMonth ?? monthKey();
  const previousMonth = shiftMonth(selectedMonth, -1);

  const [categoryRows, expenseRows, budgetRows, recurringRows] = await Promise.all([
    db
      .select({ id: categories.id, name: categories.name, color: categories.color })
      .from(categories)
      .where(eq(categories.user_id, userId))
      .orderBy(asc(categories.name)),
    db
      .select({
        id: expenses.id,
        merchant: expenses.merchant,
        description: expenses.description,
        amount: expenses.amount,
        expenseDate: expenses.expense_date,
        categoryId: expenses.category_id,
        categoryName: categories.name,
        categoryColor: categories.color,
      })
      .from(expenses)
      .leftJoin(categories, eq(expenses.category_id, categories.id))
      .where(eq(expenses.user_id, userId))
      .orderBy(desc(expenses.expense_date), desc(expenses.created_at)),
    db
      .select({
        id: category_budgets.id,
        categoryId: category_budgets.category_id,
        categoryName: categories.name,
        categoryColor: categories.color,
        month: category_budgets.month,
        amount: category_budgets.amount,
      })
      .from(category_budgets)
      .innerJoin(categories, eq(category_budgets.category_id, categories.id))
      .where(and(eq(category_budgets.user_id, userId), eq(category_budgets.month, selectedMonth)))
      .orderBy(asc(categories.name)),
    db
      .select({
        id: recurring_expenses.id,
        merchant: recurring_expenses.merchant,
        description: recurring_expenses.description,
        amount: recurring_expenses.amount,
        cadence: recurring_expenses.cadence,
        nextDate: recurring_expenses.next_date,
        active: recurring_expenses.active,
        categoryId: recurring_expenses.category_id,
        categoryName: categories.name,
        categoryColor: categories.color,
      })
      .from(recurring_expenses)
      .leftJoin(categories, eq(recurring_expenses.category_id, categories.id))
      .where(eq(recurring_expenses.user_id, userId))
      .orderBy(asc(recurring_expenses.next_date), asc(recurring_expenses.merchant)),
  ]);

  const allExpenses = expenseRows.map(toExpense);
  const budgets: DashboardBudget[] = budgetRows.map((row) => ({
    ...row,
    amount: Number(row.amount),
  }));
  const recurring: DashboardRecurring[] = recurringRows.map((row) => ({
    ...row,
    amount: Number(row.amount),
    cadence: row.cadence as DashboardRecurring["cadence"],
  }));
  const monthExpenses = allExpenses.filter((expense) =>
    expense.expenseDate.startsWith(selectedMonth),
  );
  const previousMonthExpenses = allExpenses.filter((expense) =>
    expense.expenseDate.startsWith(previousMonth),
  );
  const normalizedSearch = filters.search?.trim().toLowerCase();
  const filteredExpenses = allExpenses.filter((expense) => {
    const matchesMonth = !requestedMonth || expense.expenseDate.startsWith(selectedMonth);
    const matchesCategory = !filters.categoryId || expense.categoryId === filters.categoryId;
    const haystack = `${expense.merchant} ${expense.description ?? ""}`.toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    return matchesMonth && matchesCategory && matchesSearch;
  });

  const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = new Map<string, { total: number; count: number; color: string }>();
  const merchantTotals = new Map<string, { total: number; count: number }>();
  const dayTotals = new Map<string, { total: number; count: number }>();

  for (const expense of monthExpenses) {
    const categoryName = expense.categoryName ?? "Uncategorized";
    const currentCategory = categoryTotals.get(categoryName) ?? {
      total: 0,
      count: 0,
      color: expense.categoryColor ?? "slate",
    };
    categoryTotals.set(categoryName, {
      ...currentCategory,
      total: currentCategory.total + expense.amount,
      count: currentCategory.count + 1,
    });

    const merchant = merchantTotals.get(expense.merchant) ?? { total: 0, count: 0 };
    merchantTotals.set(expense.merchant, {
      total: merchant.total + expense.amount,
      count: merchant.count + 1,
    });

    const day = dayTotals.get(expense.expenseDate) ?? { total: 0, count: 0 };
    dayTotals.set(expense.expenseDate, {
      total: day.total + expense.amount,
      count: day.count + 1,
    });
  }

  const categoryBreakdown: CategoryBreakdown[] = [...categoryTotals.entries()]
    .map(([name, value]) => ({
      name,
      ...value,
      percentage: total ? (value.total / total) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
  const largestExpense = [...monthExpenses].sort((a, b) => b.amount - a.amount)[0] ?? null;
  const topMerchant = [...merchantTotals.entries()].sort((a, b) => b[1].total - a[1].total)[0];
  const busiestDay = [...dayTotals.entries()].sort((a, b) => b[1].total - a[1].total)[0];

  const selectedDate = monthDate(selectedMonth);
  const daysInMonth = new Date(
    Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth() + 1, 0),
  ).getUTCDate();
  const today = new Date();
  const elapsedDays =
    selectedMonth === monthKey(today)
      ? Math.max(1, today.getUTCDate())
      : selectedDate < monthDate(monthKey(today))
        ? daysInMonth
        : 1;

  return {
    categories: categoryRows,
    budgets,
    recurring,
    expenses: filteredExpenses,
    selectedMonth,
    selectedMonthLabel: new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(selectedDate),
    navigation: {
      previousMonth: shiftMonth(selectedMonth, -1),
      nextMonth: shiftMonth(selectedMonth, 1),
    },
    analytics: {
      dailyTrend: buildDailyTrend(monthExpenses, selectedMonth),
      monthlyTrend: buildMonthlyTrend(allExpenses, selectedMonth),
      categoryBreakdown,
      previousTotal,
      monthlyChange: previousTotal ? ((total - previousTotal) / previousTotal) * 100 : null,
      largestExpense,
      topMerchant: topMerchant
        ? { name: topMerchant[0], total: topMerchant[1].total, count: topMerchant[1].count }
        : null,
      busiestDay: busiestDay
        ? { date: busiestDay[0], total: busiestDay[1].total, count: busiestDay[1].count }
        : null,
      dailyAverage: total / elapsedDays,
      projectedTotal: (total / elapsedDays) * daysInMonth,
      allTimeTotal: allExpenses.reduce((sum, expense) => sum + expense.amount, 0),
      allTimeCount: allExpenses.length,
      filteredCount: filteredExpenses.length,
    },
    summary: {
      total,
      count: monthExpenses.length,
      average: monthExpenses.length ? total / monthExpenses.length : 0,
      topCategory: categoryBreakdown[0]?.name ?? "No expenses yet",
      topCategoryTotal: categoryBreakdown[0]?.total ?? 0,
    },
  };
}

export async function getExpensesForExport(userId: string) {
  return db
    .select({
      date: expenses.expense_date,
      merchant: expenses.merchant,
      description: expenses.description,
      amount: expenses.amount,
      category: categories.name,
    })
    .from(expenses)
    .leftJoin(categories, eq(expenses.category_id, categories.id))
    .where(eq(expenses.user_id, userId))
    .orderBy(desc(expenses.expense_date), desc(expenses.created_at));
}
