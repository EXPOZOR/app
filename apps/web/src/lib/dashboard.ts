import { db } from "@/db/client";
import { categories, expenses } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";

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

function monthKey(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
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

export async function getDashboardData(userId: string, filters: DashboardFilters) {
  const [categoryRows, expenseRows] = await Promise.all([
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
  ]);

  const allExpenses = expenseRows.map(toExpense);
  const month = filters.month && /^\d{4}-\d{2}$/.test(filters.month) ? filters.month : monthKey();
  const hasExplicitMonth = Boolean(filters.month && /^\d{4}-\d{2}$/.test(filters.month));
  const monthExpenses = allExpenses.filter((expense) => expense.expenseDate.startsWith(month));
  const normalizedSearch = filters.search?.trim().toLowerCase();
  const filteredExpenses = allExpenses.filter((expense) => {
    const matchesMonth = !hasExplicitMonth || expense.expenseDate.startsWith(month);
    const matchesCategory = !filters.categoryId || expense.categoryId === filters.categoryId;
    const haystack = `${expense.merchant} ${expense.description ?? ""}`.toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    return matchesMonth && matchesCategory && matchesSearch;
  });

  const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = new Map<string, number>();
  for (const expense of monthExpenses) {
    const key = expense.categoryName ?? "Uncategorized";
    categoryTotals.set(key, (categoryTotals.get(key) ?? 0) + expense.amount);
  }
  const topCategory = [...categoryTotals.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    categories: categoryRows,
    expenses: filteredExpenses,
    selectedMonth: month,
    summary: {
      total,
      count: monthExpenses.length,
      average: monthExpenses.length ? total / monthExpenses.length : 0,
      topCategory: topCategory?.[0] ?? "No expenses yet",
      topCategoryTotal: topCategory?.[1] ?? 0,
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
