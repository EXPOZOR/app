"use server";

import { z } from "zod";
import { db } from "@/db/client";
import { waitlist } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

/* ── Validation ─────────────────────────────────────────────── */
const WaitlistSchema = z.object({
  email:  z.string().email("Please enter a valid email address."),
  source: z.string().default("landing"),
});

/* ── Return type ────────────────────────────────────────────── */
export type WaitlistResult =
  | { success: true;  message: string }
  | { success: false; error: string };

/* ── Action ─────────────────────────────────────────────────── */
export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const parsed = WaitlistSchema.safeParse({
    email:  formData.get("email"),
    source: formData.get("source") ?? "landing",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid email address.",
    };
  }

  const { email, source } = parsed.data;

  try {
    const headersList = await headers();
    const referrer    = headersList.get("referer") ?? null;

    // Check for duplicate — return success (idempotent UX)
    const existing = await db
      .select({ id: waitlist.id })
      .from(waitlist)
      .where(eq(waitlist.email, email))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: true,
        message: "You're already on the list! We'll reach out soon.",
      };
    }

    await db.insert(waitlist).values({ email, source, referrer });

    // Confirmation email via Resend (non-blocking — safe to skip if key absent)
    void sendConfirmation(email).catch((err) =>
      console.error("[waitlist] email error:", err)
    );

    return {
      success: true,
      message: "You're on the list! Check your inbox for a confirmation.",
    };
  } catch (err) {
    console.error("[waitlist] db error:", err instanceof Error ? err.message : String(err));
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}

/* ── Email helper (optional — skipped if RESEND_API_KEY not set) ── */
async function sendConfirmation(email: string): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "EXPOZOR <hello@expozor.app>",
    to:   email,
    subject: "You're on the EXPOZOR waitlist 🎉",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;color:#F4F4F5;background:#09090B;padding:48px 32px;border-radius:20px;border:1px solid rgba(255,255,255,0.08);">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#5EEAD4,#A78BFA);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#09090B;margin-bottom:24px;">E</div>
        <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;color:#F4F4F5;letter-spacing:-0.02em;">You're on the list.</h1>
        <p style="color:#A1A1AA;line-height:1.7;margin:0 0 20px;font-size:15px;">
          Thanks for joining the EXPOZOR waitlist. We're building something you're going to love —
          calm, intelligent money management that respects your time and privacy.
        </p>
        <p style="color:#A1A1AA;line-height:1.7;margin:0 0 32px;font-size:15px;">
          We'll send your early access link as soon as your spot is ready.
        </p>
        <div style="padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="color:#71717A;font-size:13px;margin:0;">— The EXPOZOR team</p>
        </div>
      </div>
    `,
  });
}
