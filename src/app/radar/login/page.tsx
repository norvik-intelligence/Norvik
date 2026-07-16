import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { messages } from "@/lib/radar/messages";

export const metadata: Metadata = { title: messages.auth.loginTitle };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#1A3A2A" }}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
