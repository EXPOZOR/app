import { AuthPanel } from "@/components/auth/auth-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your private EXPOZOR expense workspace.",
};

export default function LoginPage() {
  return <AuthPanel mode="login" />;
}
