import { AuthPanel } from "@/components/auth/auth-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create your workspace",
  description: "Create a private EXPOZOR workspace for manual expense tracking.",
};

export default function SignupPage() {
  return <AuthPanel mode="signup" />;
}
