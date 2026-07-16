"use server";

import { db } from "@/db/client";
import { categories, category_budgets } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const budgetSchema = z.object({
  categoryId: z.string().uuid("Choose a category."),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Choose a month."),
  amount: z
    .string()
    .trim()
    .refine(
      (value) => /^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0,
      "Enter a positive budget.",
    ),
});

export type BudgetActionResult = { success: true } | { success: false; error: string };

export async function upsertCategoryBudget(formData: FormData): Promise<BudgetActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to set a category budget." };

  const parsed = budgetSchema.safeParse({
    categoryId: formData.get("categoryId"),
    month: formData.get("month"),
    amount: formData.get("amount"),
  });
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Check the budget details.",
    };

  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(eq(categories.id, parsed.data.categoryId), eq(categories.user_id, user.id)))
    .limit(1);
  if (!category) return { success: false, error: "Choose one of your categories." };

  try {
    await db
      .insert(category_budgets)
      .values({
        user_id: user.id,
        category_id: parsed.data.categoryId,
        month: parsed.data.month,
        amount: parsed.data.amount,
      })
      .onConflictDoUpdate({
        target: [category_budgets.user_id, category_budgets.category_id, category_budgets.month],
        set: { amount: parsed.data.amount, updated_at: new Date() },
      });
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[budgets] upsert error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not save that budget. Please try again." };
  }
}

export async function deleteCategoryBudget(formData: FormData): Promise<BudgetActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to manage budgets." };
  const id = formData.get("id");
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success) {
    return { success: false, error: "That budget could not be found." };
  }

  await db
    .delete(category_budgets)
    .where(and(eq(category_budgets.id, id), eq(category_budgets.user_id, user.id)));
  revalidatePath("/app");
  return { success: true };
}
