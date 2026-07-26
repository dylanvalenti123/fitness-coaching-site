"use client";

import { useActionState } from "react";
import { requestSession, type SessionFormState } from "./actions";

const initialState: SessionFormState = {};

export function SessionRequestForm() {
  const [state, formAction, pending] = useActionState(requestSession, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-neutral-200 p-6">
      <div>
        <label htmlFor="scheduled_at" className="block text-sm font-medium">Preferred date & time</label>
        <input
          id="scheduled_at"
          name="scheduled_at"
          type="datetime-local"
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
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
        {pending ? "Requesting..." : "Request Session"}
      </button>
    </form>
  );
}
