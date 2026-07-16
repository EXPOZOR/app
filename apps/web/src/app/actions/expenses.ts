"use server";

import { db } from "@/db/client";
import { categories, expenses } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type ExpenseActionResult = { success: true } | { success: false; error: string };

export type ImportActionResult =
  | { success: true; imported: number; skipped: number }
  | { success: false; error: string };

const expenseSchema = z.object({
  merchant: z.string().trim().min(1, "Add a merchant.").max(100, "Merchant is too long."),
  description: z.string().trim().max(240, "Description is too long.").optional(),
  amount: z
    .string()
    .trim()
    .refine(
      (value) => /^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0,
      "Enter a valid amount.",
    ),
  expenseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date."),
  categoryId: z.string().uuid().optional().or(z.literal("")),
});

const categoryColors = ["mint", "blue", "lilac", "amber", "rose", "cyan", "slate"] as const;

function parseExpense(formData: FormData) {
  const parsed = expenseSchema.safeParse({
    merchant: formData.get("merchant"),
    description: formData.get("description") || undefined,
    amount: formData.get("amount"),
    expenseDate: formData.get("expenseDate"),
    categoryId: formData.get("categoryId") || "",
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Check the expense details." } as const;
  }

  return {
    value: {
      ...parsed.data,
      description: parsed.data.description || null,
      categoryId: parsed.data.categoryId || null,
    },
  } as const;
}

async function ownedCategoryId(userId: string, categoryId: string | null) {
  if (!categoryId) return null;
  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(eq(categories.id, categoryId), eq(categories.user_id, userId)))
    .limit(1);
  return category?.id ?? null;
}

export async function createExpense(formData: FormData): Promise<ExpenseActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to add an expense." };

  const parsed = parseExpense(formData);
  if ("error" in parsed) return { success: false, error: parsed.error };

  try {
    const categoryId = await ownedCategoryId(user.id, parsed.value.categoryId);
    if (parsed.value.categoryId && !categoryId) {
      return { success: false, error: "Choose one of your categories." };
    }
    await db.insert(expenses).values({
      user_id: user.id,
      merchant: parsed.value.merchant,
      description: parsed.value.description,
      amount: parsed.value.amount,
      expense_date: parsed.value.expenseDate,
      category_id: categoryId,
    });
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[expenses] create error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not save that expense. Please try again." };
  }
}

export async function updateExpense(formData: FormData): Promise<ExpenseActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to edit an expense." };

  const id = formData.get("id");
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success) {
    return { success: false, error: "That expense could not be found." };
  }

  const parsed = parseExpense(formData);
  if ("error" in parsed) return { success: false, error: parsed.error };

  try {
    const categoryId = await ownedCategoryId(user.id, parsed.value.categoryId);
    if (parsed.value.categoryId && !categoryId) {
      return { success: false, error: "Choose one of your categories." };
    }
    const updated = await db
      .update(expenses)
      .set({
        merchant: parsed.value.merchant,
        description: parsed.value.description,
        amount: parsed.value.amount,
        expense_date: parsed.value.expenseDate,
        category_id: categoryId,
        updated_at: new Date(),
      })
      .where(and(eq(expenses.id, id), eq(expenses.user_id, user.id)))
      .returning({ id: expenses.id });

    if (updated.length === 0) return { success: false, error: "That expense could not be found." };
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[expenses] update error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not update that expense. Please try again." };
  }
}

export async function deleteExpense(formData: FormData): Promise<ExpenseActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to remove an expense." };

  const id = formData.get("id");
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success) {
    return { success: false, error: "That expense could not be found." };
  }

  try {
    await db.delete(expenses).where(and(eq(expenses.id, id), eq(expenses.user_id, user.id)));
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[expenses] delete error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not remove that expense. Please try again." };
  }
}

export async function createCategory(formData: FormData): Promise<ExpenseActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to create a category." };

  const name = formData.get("name");
  const color = formData.get("color");
  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 40) {
    return { success: false, error: "Category names must be 2–40 characters." };
  }
  const parsedColor = z.enum(categoryColors).safeParse(color);

  try {
    await db.insert(categories).values({
      user_id: user.id,
      name: name.trim(),
      color: parsedColor.success ? parsedColor.data : "mint",
    });
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "That category already exists." };
    }
    console.error(
      "[categories] create error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not create that category. Please try again." };
  }
}

export async function deleteCategory(formData: FormData): Promise<ExpenseActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to remove a category." };

  const id = formData.get("id");
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success) {
    return { success: false, error: "That category could not be found." };
  }

  try {
    const removed = await db
      .delete(categories)
      .where(and(eq(categories.id, id), eq(categories.user_id, user.id)))
      .returning({ id: categories.id });
    if (removed.length === 0) return { success: false, error: "That category could not be found." };
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[categories] delete error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not remove that category. Please try again." };
  }
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];
    if (character === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }
  values.push(current.trim());
  return values;
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export async function importExpenses(formData: FormData): Promise<ImportActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to import expenses." };
  const file = formData.get("file");
  if (!(file instanceof File)) return { success: false, error: "Choose a CSV file first." };
  if (file.size > 2_000_000)
    return { success: false, error: "CSV files must be smaller than 2 MB." };

  const lines = (await file.text())
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim());
  if (lines.length < 2) return { success: false, error: "That CSV has no expense rows." };
  const headers = parseCsvLine(lines[0] ?? "").map((header) => header.toLowerCase());
  const dateIndex = headers.findIndex((header) =>
    ["date", "expense date", "expensedate"].includes(header),
  );
  const merchantIndex = headers.findIndex((header) =>
    ["merchant", "payee", "name"].includes(header),
  );
  const amountIndex = headers.findIndex((header) => ["amount", "value", "price"].includes(header));
  const descriptionIndex = headers.findIndex((header) =>
    ["description", "note", "memo"].includes(header),
  );
  const categoryIndex = headers.findIndex((header) => header === "category");
  if (dateIndex < 0 || merchantIndex < 0 || amountIndex < 0) {
    return { success: false, error: "CSV needs Date, Merchant, and Amount columns." };
  }
  if (lines.length > 501) return { success: false, error: "Import up to 500 expenses at a time." };

  const categoryRows = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.user_id, user.id));
  const categoryMap = new Map(
    categoryRows.map((category) => [category.name.toLowerCase(), category.id]),
  );
  const values: Array<{
    user_id: string;
    category_id: string | null;
    merchant: string;
    description: string | null;
    amount: string;
    expense_date: string;
  }> = [];
  let skipped = 0;

  for (const line of lines.slice(1)) {
    const row = parseCsvLine(line);
    const date = row[dateIndex] ?? "";
    const merchant = row[merchantIndex]?.trim() ?? "";
    const amount = row[amountIndex]?.replace(/[$€£,\s]/g, "") ?? "";
    if (!merchant || !validDate(date) || !/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) {
      skipped += 1;
      continue;
    }
    const categoryName = categoryIndex >= 0 ? row[categoryIndex]?.toLowerCase() : "";
    values.push({
      user_id: user.id,
      category_id: categoryName ? (categoryMap.get(categoryName) ?? null) : null,
      merchant: merchant.slice(0, 100),
      description: descriptionIndex >= 0 ? row[descriptionIndex]?.slice(0, 240) || null : null,
      amount,
      expense_date: date,
    });
  }

  if (!values.length)
    return { success: false, error: "No valid expense rows were found in that file." };
  await db.insert(expenses).values(values);
  revalidatePath("/app");
  return { success: true, imported: values.length, skipped };
}
