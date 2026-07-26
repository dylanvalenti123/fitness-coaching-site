"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signup, type SignupFormState } from "./actions";

const initialState: SignupFormState = {};

export function SignupForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "";
  const [state, formAction, pending] = useActionState(signup, initialState);

  if (state.success) {
    return (
      <p className="border border-forge-4 bg-forge-3 p-4 text-center text-warm">
        Check your email to confirm your account, then log in.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="plan" value={plan} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-warm-muted">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full input-field px-4 py-2.5"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-warm-muted">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full input-field px-4 py-2.5"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-warm-muted">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-1.5 w-full input-field px-4 py-2.5"
        />
      </div>
      {state.error && <p className="text-sm text-fire">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full px-6 py-3.5 font-sub text-sm font-bold tracking-wide disabled:opacity-50"
      >
        {pending ? "Creating account..." : "CREATE ACCOUNT"}
      </button>
    </form>
  );
}
