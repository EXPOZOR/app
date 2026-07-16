"use client";

import { signIn, signUp } from "@/app/actions/auth";
import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type AuthMode = "login" | "signup";

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const isSignUp = mode === "signup";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = isSignUp ? await signUp(formData) : await signIn(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push("/app");
      router.refresh();
    });
  }

  return (
    <main className="min-h-dvh bg-bg px-5 py-8 text-text-primary sm:px-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-border bg-bg-elev-1 shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden flex-col justify-between bg-[radial-gradient(circle_at_15%_15%,rgba(61,220,151,0.22),transparent_38%),linear-gradient(145deg,#111114,#0a0a0b)] p-10 lg:flex">
            <div>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-3 font-semibold text-text-primary no-underline"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-accent text-lg font-black text-text-inverse">
                  E
                </span>
                EXPOZOR
              </Link>
              <div className="mt-24 max-w-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Your money, clearer
                </p>
                <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-text-primary">
                  A calmer way to understand every expense.
                </h1>
                <p className="mt-5 text-base leading-7 text-text-secondary">
                  Start with simple manual tracking. Keep your data close, review every category,
                  and build a picture you can trust.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-tertiary">
              <ShieldCheck size={18} className="text-accent" aria-hidden="true" />
              <span>Your account is protected with a private session.</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-14">
            <Link
              href="/"
              className="mb-10 inline-flex min-h-11 items-center gap-3 font-semibold text-text-primary no-underline lg:hidden"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-lg font-black text-text-inverse">
                E
              </span>
              EXPOZOR
            </Link>
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                Private workspace
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-text-primary">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mt-3 text-base leading-7 text-text-secondary">
                {isSignUp
                  ? "Set up your private expense workspace in under a minute."
                  : "Pick up where you left off with your spending picture."}
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                {isSignUp && (
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Your name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Mohamed Karrach"
                      disabled={isPending}
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Email address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    disabled={isPending}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Password
                    </label>
                    {isSignUp && <span className="text-xs text-text-tertiary">8+ characters</span>}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    required
                    minLength={isSignUp ? 8 : 1}
                    disabled={isPending}
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded border border-danger/40 bg-danger-subtle px-4 py-3 text-sm leading-6 text-text-primary"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className={buttonClassName({ fullWidth: true, size: "lg" })}
                >
                  {isPending ? (
                    <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                  ) : isSignUp ? (
                    <Check size={17} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={17} aria-hidden="true" />
                  )}
                  {isPending ? "Opening workspace…" : isSignUp ? "Create workspace" : "Sign in"}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-text-secondary">
                {isSignUp ? "Already have an account?" : "New to EXPOZOR?"}{" "}
                <Link
                  href={isSignUp ? "/login" : "/signup"}
                  className="font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {isSignUp ? "Sign in" : "Create an account"}
                </Link>
              </p>
              <p className="mt-8 text-center text-xs leading-5 text-text-tertiary">
                By continuing, you agree to use EXPOZOR for personal expense tracking. No bank
                connection is required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
