"use client";

import { useTransition, useState } from "react";
import { Check } from "lucide-react";
import { verifyCompany } from "./actions";

export function VerifyCompanyButton({ companyId }: { companyId: string }) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
        <Check className="h-3 w-3" />
        Verifiziert
      </span>
    );
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await verifyCompany(companyId);
          setDone(true);
        })
      }
      disabled={pending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
    >
      <Check className="h-3 w-3" />
      Verifizieren
    </button>
  );
}
