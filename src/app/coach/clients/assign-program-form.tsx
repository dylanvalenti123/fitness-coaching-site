"use client";

import { useActionState } from "react";
import { assignProgram, type AssignFormState } from "./actions";

const initialState: AssignFormState = {};

export function AssignProgramForm({
  clientId,
  programs,
  currentProgramId,
}: {
  clientId: string;
  programs: { id: string; title: string }[];
  currentProgramId?: string;
}) {
  const [state, formAction, pending] = useActionState(assignProgram, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="client_id" value={clientId} />
      <select
        name="program_id"
        defaultValue={currentProgramId ?? ""}
        className="rounded-lg border border-neutral-300 px-2 py-1 text-sm"
      >
        <option value="" disabled>
          Assign a program...
        </option>
        {programs.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white hover:bg-accent disabled:opacity-50"
      >
        {pending ? "Saving..." : "Assign"}
      </button>
      {state.error && <span className="text-xs text-accent">{state.error}</span>}
    </form>
  );
}
