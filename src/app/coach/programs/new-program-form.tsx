"use client";

import { useActionState } from "react";
import { createProgram, type ProgramFormState } from "./actions";

const initialState: ProgramFormState = {};

export function NewProgramForm() {
  const [state, formAction, pending] = useActionState(createProgram, initialState);

  return (
    <form action={formAction} className="space-y-3 rounded-2xl border border-neutral-200 p-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Program title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          rows={2}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>
      {state.error && <p className="text-sm text-accent">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-accent disabled:opacity-50"
      >
        {pending ? "Creating..." : "Create Program"}
      </button>
    </form>
  );
}
