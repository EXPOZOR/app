import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { db } from "@/db/client";
import { type User, auth_sessions, categories, users } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";

const scrypt = promisify(scryptCallback) as (
  password: string | Buffer,
  salt: string | Buffer,
  keyLength: number,
) => Promise<Buffer>;

const SESSION_COOKIE = "expozor_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export const DEFAULT_CATEGORIES = [
  { name: "Food & drink", color: "mint" },
  { name: "Transport", color: "blue" },
  { name: "Home", color: "lilac" },
  { name: "Shopping", color: "amber" },
  { name: "Subscriptions", color: "rose" },
  { name: "Health", color: "cyan" },
  { name: "Other", color: "slate" },
] as const;

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

async function verifyPassword(password: string, storedHash: string) {
  const [, salt, storedKey] = storedHash.split("$");
  if (!salt || !storedKey) return false;

  const derivedKey = await scrypt(password, salt, 64);
  const expectedKey = Buffer.from(storedKey, "hex");
  return expectedKey.length === derivedKey.length && timingSafeEqual(expectedKey, derivedKey);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  await db.insert(auth_sessions).values({
    token_hash: hashSessionToken(token),
    user_id: userId,
    expires_at: expiresAt,
  });
  await setSessionCookie(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.delete(auth_sessions).where(eq(auth_sessions.token_hash, hashSessionToken(token)));
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [result] = await db
    .select({ user: users })
    .from(auth_sessions)
    .innerJoin(users, eq(auth_sessions.user_id, users.id))
    .where(
      and(
        eq(auth_sessions.token_hash, hashSessionToken(token)),
        gt(auth_sessions.expires_at, new Date()),
      ),
    )
    .limit(1);

  return result?.user ?? null;
}

export async function authenticate(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const [user] = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);
  if (!user || !(await verifyPassword(password, user.password_hash))) return null;

  await createSession(user.id);
  return user;
}

export async function registerUser(name: string, email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({ name: name.trim(), email: normalizedEmail, password_hash: passwordHash })
    .returning();

  if (!user) throw new Error("Unable to create account");

  await db
    .insert(categories)
    .values(DEFAULT_CATEGORIES.map((category) => ({ ...category, user_id: user.id })))
    .onConflictDoNothing();
  await createSession(user.id);
  return user;
}
