"use server";

import { db } from "@/db/client";
import { categories, expenses, recurring_expenses } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const recurringSchema = z.object({
  merchant: z.string().trim().min(1, "Add a merchant.").max(100, "Merchant is too long."),
  description: z.string().trim().max(240, "Description is too long.").optional(),
  amount: z
    .string()
    .trim()
    .refine(
      (value) => /^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0,
      "Enter a positive amount.",
    ),
  cadence: z.enum(["weekly", "monthly", "yearly"]),
  nextDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose the next date."),
  categoryId: z.string().uuid().optional().or(z.literal("")),
});

export type RecurringActionResult = { success: true } | { success: false; error: string };

async function ownedCategory(userId: string, categoryId: string | null) {
  if (!categoryId) return null;
  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(eq(categories.id, categoryId), eq(categories.user_id, userId)))
    .limit(1);
  return category?.id ?? null;
}

function parseRecurring(formData: FormData) {
  const parsed = recurringSchema.safeParse({
    merchant: formData.get("merchant"),
    description: formData.get("description") || undefined,
    amount: formData.get("amount"),
    cadence: formData.get("cadence"),
    nextDate: formData.get("nextDate"),
    categoryId: formData.get("categoryId") || "",
  });
  if (!parsed.success)
    return {
      error: parsed.error.errors[0]?.message ?? "Check the recurring expense details.",
    } as const;
  return {
    value: {
      ...parsed.data,
      description: parsed.data.description || null,
      categoryId: parsed.data.categoryId || null,
    },
  } as const;
}

export async function createRecurringExpense(formData: FormData): Promise<RecurringActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to create a recurring expense." };
  const parsed = parseRecurring(formData);
  if ("error" in parsed) return { success: false, error: parsed.error };
  const categoryId = await ownedCategory(user.id, parsed.value.categoryId);
  if (parsed.value.categoryId && !categoryId)
    return { success: false, error: "Choose one of your categories." };

  try {
    await db.insert(recurring_expenses).values({
      user_id: user.id,
      category_id: categoryId,
      merchant: parsed.value.merchant,
      description: parsed.value.description,
      amount: parsed.value.amount,
      cadence: parsed.value.cadence,
      next_date: parsed.value.nextDate,
    });
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[recurring] create error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not save that recurring expense." };
  }
}

export async function toggleRecurringExpense(formData: FormData): Promise<RecurringActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to manage recurring expenses." };
  const id = formData.get("id");
  const active = formData.get("active") === "true";
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success)
    return { success: false, error: "That recurring expense could not be found." };
  await db
    .update(recurring_expenses)
    .set({ active, updated_at: new Date() })
    .where(and(eq(recurring_expenses.id, id), eq(recurring_expenses.user_id, user.id)));
  revalidatePath("/app");
  return { success: true };
}

export async function deleteRecurringExpense(formData: FormData): Promise<RecurringActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to manage recurring expenses." };
  const id = formData.get("id");
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success)
    return { success: false, error: "That recurring expense could not be found." };
  await db
    .delete(recurring_expenses)
    .where(and(eq(recurring_expenses.id, id), eq(recurring_expenses.user_id, user.id)));
  revalidatePath("/app");
  return { success: true };
}

export async function recordRecurringExpense(formData: FormData): Promise<RecurringActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to record a recurring expense." };
  const id = formData.get("id");
  if (typeof id !== "string" || !z.string().uuid().safeParse(id).success)
    return { success: false, error: "That recurring expense could not be found." };

  const [recurring] = await db
    .select()
    .from(recurring_expenses)
    .where(
      and(
        eq(recurring_expenses.id, id),
        eq(recurring_expenses.user_id, user.id),
        eq(recurring_expenses.active, true),
      ),
    )
    .limit(1);
  if (!recurring) return { success: false, error: "That recurring expense is no longer active." };

  try {
    await db.insert(expenses).values({
      user_id: user.id,
      category_id: recurring.category_id,
      merchant: recurring.merchant,
      description: recurring.description,
      amount: recurring.amount,
      expense_date: recurring.next_date,
    });

    const next = new Date(`${recurring.next_date}T00:00:00Z`);
    if (recurring.cadence === "weekly") next.setUTCDate(next.getUTCDate() + 7);
    if (recurring.cadence === "monthly") next.setUTCMonth(next.getUTCMonth() + 1);
    if (recurring.cadence === "yearly") next.setUTCFullYear(next.getUTCFullYear() + 1);
    await db
      .update(recurring_expenses)
      .set({ next_date: next.toISOString().slice(0, 10), updated_at: new Date() })
      .where(and(eq(recurring_expenses.id, id), eq(recurring_expenses.user_id, user.id)));
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[recurring] record error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not record that recurring expense." };
  }
}
