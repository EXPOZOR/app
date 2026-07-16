"use server";

import { authenticate, clearSession, registerUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name.").max(80, "Name is too long."),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters.").max(128, "Password is too long."),
});

const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type AuthActionResult = { success: true } | { success: false; error: string };

export async function signUp(formData: FormData): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Check your details." };
  }

  try {
    await registerUser(parsed.data.name, parsed.data.email, parsed.data.password);
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { success: false, error: "An account already exists for that email." };
    }
    console.error("[auth] signup error:", error instanceof Error ? error.message : String(error));
    return { success: false, error: "We could not create your account. Please try again." };
  }
}

export async function signIn(formData: FormData): Promise<AuthActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Check your details." };
  }

  try {
    const user = await authenticate(parsed.data.email, parsed.data.password);
    if (!user) return { success: false, error: "Email or password is incorrect." };
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error("[auth] signin error:", error instanceof Error ? error.message : String(error));
    return { success: false, error: "We could not sign you in. Please try again." };
  }
}

export async function signOut(): Promise<AuthActionResult> {
  try {
    await clearSession();
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error("[auth] signout error:", error instanceof Error ? error.message : String(error));
    return { success: false, error: "We could not sign you out. Please try again." };
  }
}
