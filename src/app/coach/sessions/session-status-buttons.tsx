"use client";

import { useTransition } from "react";
import { updateSessionStatus } from "./actions";
import type { SessionStatus } from "@/lib/types";

const options: SessionStatus[] = ["requested", "confirmed", "completed", "canceled"];

export function SessionStatusButtons({
  sessionId,
  status,
}: {
  sessionId: string;
  status: SessionStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() => updateSessionStatus(sessionId, e.target.value as SessionStatus))
      }
      className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold capitalize"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
