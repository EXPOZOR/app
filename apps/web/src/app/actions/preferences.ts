"use server";

import { db } from "@/db/client";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const preferencesSchema = z.object({
  currency: z.enum(["USD", "EUR", "GBP", "MAD", "CAD", "AUD"]),
  monthlyBudget: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || (/^\d+(\.\d{1,2})?$/.test(value) && Number(value) > 0),
      "Enter a positive monthly target.",
    ),
});

export type PreferencesActionResult = { success: true } | { success: false; error: string };

export async function updateWorkspacePreferences(
  formData: FormData,
): Promise<PreferencesActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to update your workspace." };

  const parsed = preferencesSchema.safeParse({
    currency: formData.get("currency"),
    monthlyBudget: formData.get("monthlyBudget"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Check your preferences." };
  }

  try {
    await db
      .update(users)
      .set({
        currency: parsed.data.currency,
        monthly_budget: parsed.data.monthlyBudget || null,
        updated_at: new Date(),
      })
      .where(eq(users.id, user.id));
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error(
      "[preferences] update error:",
      error instanceof Error ? error.message : String(error),
    );
    return { success: false, error: "We could not update your preferences. Please try again." };
  }
}
