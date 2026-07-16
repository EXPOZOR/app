"use client";

import { signOut } from "@/app/actions/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await signOut();
          router.push("/");
          router.refresh();
        })
      }
      className="inline-flex min-h-11 items-center gap-2 rounded px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary disabled:opacity-50"
    >
      <LogOut size={16} aria-hidden="true" />
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
