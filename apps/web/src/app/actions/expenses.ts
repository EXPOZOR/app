"use server";

import { db } from "@/db/client";
import { categories, expenses } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type ExpenseActionResult = { success: true } | { success: false; error: string };

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
  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 40) {
    return { success: false, error: "Category names must be 2–40 characters." };
  }

  try {
    await db.insert(categories).values({ user_id: user.id, name: name.trim(), color: "mint" });
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
