"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteCapacity } from "./actions";
import { messages } from "@/lib/radar/messages";

export function DeleteCapacityButton({ capacityId }: { capacityId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await deleteCapacity(capacityId);
          router.refresh();
        })
      }
      disabled={pending}
      title={messages.common.delete}
      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
