"use server";

import { db } from "@/db/client";
import { waitlist } from "@/db/schema";
import { BRAND_COLORS, BRAND_EFFECTS } from "@/lib/brand-colors";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const WaitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  source: z.string().trim().max(80).default("landing"),
  locale: z.literal("en").default("en"),
  productUpdatesConsent: z.enum(["on", "true", "1"]).optional(),
  website: z.string().optional(),
});

export type WaitlistResult = { success: true; message: string } | { success: false; error: string };

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 20;
const RATE_LIMIT_MAX_PER_EMAIL = 5;

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, maxAttempts: number): boolean {
  const now = Date.now();
  const entry = rateLimits.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= maxAttempts) return false;

  entry.count += 1;
  return true;
}

function getClientIp(headersList: Headers): string {
  const forwardedFor = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor || headersList.get("x-real-ip") || headersList.get("cf-connecting-ip") || "unknown"
  );
}

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const parsed = WaitlistSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? "landing",
    locale: formData.get("locale") ?? "en",
    productUpdatesConsent: formData.get("productUpdatesConsent") || undefined,
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid waitlist submission.",
    };
  }

  const { email, source, locale, productUpdatesConsent, website } = parsed.data;

  if (website) {
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }

  try {
    const headersList = await headers();
    const referrer = headersList.get("referer") ?? null;
    const clientIp = getClientIp(headersList);

    if (
      !checkRateLimit(`ip:${clientIp}`, RATE_LIMIT_MAX_PER_IP) ||
      !checkRateLimit(`email:${email}`, RATE_LIMIT_MAX_PER_EMAIL)
    ) {
      return {
        success: false,
        error: "Too many attempts. Please try again later.",
      };
    }

    const hasProductUpdatesConsent = Boolean(productUpdatesConsent);
    const consentedAt = hasProductUpdatesConsent ? new Date() : null;

    const inserted = await db
      .insert(waitlist)
      .values({
        email,
        source,
        referrer,
        locale,
        product_updates_consent: hasProductUpdatesConsent,
        product_updates_consent_at: consentedAt,
      })
      .onConflictDoNothing({ target: waitlist.email })
      .returning({ id: waitlist.id });

    if (inserted.length > 0) {
      void sendConfirmation(email).catch((err) => console.error("[waitlist] email error:", err));
    } else if (hasProductUpdatesConsent) {
      await db
        .update(waitlist)
        .set({
          product_updates_consent: true,
          product_updates_consent_at: consentedAt,
        })
        .where(eq(waitlist.email, email));
    }

    return {
      success: true,
      message: "You're on the list!",
    };
  } catch (err) {
    console.error("[waitlist] db error:", err instanceof Error ? err.message : String(err));
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}

async function sendConfirmation(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "EXPOZOR <support@expozor.com>",
    to: email,
    subject: "You're on the EXPOZOR waitlist",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;color:#F4F4F5;background:#09090B;padding:48px 32px;border-radius:20px;border:1px solid rgba(255,255,255,0.08);">
        <div style="width:48px;height:48px;border-radius:12px;background:${BRAND_EFFECTS.gradient};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:${BRAND_COLORS.background};margin-bottom:24px;">E</div>
        <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;color:#F4F4F5;letter-spacing:-0.02em;">You're on the list.</h1>
        <p style="color:#A1A1AA;line-height:1.7;margin:0 0 20px;font-size:15px;">
          Thanks for joining the EXPOZOR waitlist. We're building calm, intelligent expense tracking that respects your time and privacy.
        </p>
        <p style="color:#A1A1AA;line-height:1.7;margin:0 0 32px;font-size:15px;">
          We'll send your early access link as soon as your spot is ready.
        </p>
        <div style="padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="color:${BRAND_COLORS.textTertiary};font-size:13px;margin:0;">The EXPOZOR team</p>
        </div>
      </div>
    `,
  });
}
