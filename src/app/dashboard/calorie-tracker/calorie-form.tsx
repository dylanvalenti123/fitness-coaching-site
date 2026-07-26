"use client";

import { useActionState, useRef, useState } from "react";
import { scanMealPhoto, type CalorieScanState } from "./actions";

const initialState: CalorieScanState = {};

export function CalorieForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(scanMealPhoto, initialState);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-2xl border border-neutral-200 p-6"
    >
      <div>
        <label htmlFor="photo" className="block text-sm font-medium">Photo of your meal</label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="mt-1 w-full text-sm"
        />
      </div>

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Meal preview" className="max-h-64 rounded-lg object-cover" />
      )}

      {state.error && <p className="text-sm text-accent">{state.error}</p>}

      {state.result && (
        <div className="rounded-xl bg-neutral-50 p-4 text-sm">
          <p className="font-semibold">{state.result.description}</p>
          <div className="mt-2 grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-accent">{state.result.calories}</p>
              <p className="text-xs text-neutral-500">calories</p>
            </div>
            <div>
              <p className="text-lg font-bold">{state.result.protein_g}g</p>
              <p className="text-xs text-neutral-500">protein</p>
            </div>
            <div>
              <p className="text-lg font-bold">{state.result.carbs_g}g</p>
              <p className="text-xs text-neutral-500">carbs</p>
            </div>
            <div>
              <p className="text-lg font-bold">{state.result.fat_g}g</p>
              <p className="text-xs text-neutral-500">fat</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-accent disabled:opacity-50"
      >
        {pending ? "Scanning..." : "Scan Meal"}
      </button>
    </form>
  );
}
