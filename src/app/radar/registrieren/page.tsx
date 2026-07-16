import type { Metadata } from "next";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "./OnboardingWizard";
import { messages } from "@/lib/radar/messages";

export const metadata: Metadata = { title: messages.onboarding.title };
export const dynamic = "force-dynamic";

export default async function RegistrierenPage() {
  const auth = await getAuthContext();
  // Already fully onboarded → straight to the feed
  if (auth?.companyId) redirect("/radar/portal");

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#1A3A2A" }}>
      <div className="max-w-xl mx-auto">
        <OnboardingWizard hasSession={Boolean(auth)} />
      </div>
    </div>
  );
}
