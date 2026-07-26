"use client";

import { useActionState, useRef } from "react";
import { logProgress, type ProgressFormState } from "./actions";

const initialState: ProgressFormState = {};

export function ProgressForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(async (
    prev: ProgressFormState,
    formData: FormData
  ) => {
    const result = await logProgress(prev, formData);
    if (result.success) {
      formRef.current?.reset();
    }
    return result;
  }, initialState);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 rounded-2xl border border-neutral-200 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium">Weight (lbs)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium">Progress photo</label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="mt-1 w-full text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>
      {state.error && <p className="text-sm text-accent">{state.error}</p>}
      {state.success && (
        <div className="text-sm text-green-600">
          <p>Progress logged! {state.currentStreak}-day streak</p>
          {state.newBadges && state.newBadges.length > 0 && (
            <p className="mt-1 font-medium text-accent">
              New badge unlocked: {state.newBadges.map((b) => b.label).join(", ")}
            </p>
          )}
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-accent disabled:opacity-50"
      >
        {pending ? "Saving..." : "Log Progress"}
      </button>
    </form>
  );
}
