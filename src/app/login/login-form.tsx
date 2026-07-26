"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, type AuthFormState } from "./actions";

const initialState: AuthFormState = {};

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirect" value={redirectTo} />
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
          className="mt-1.5 w-full input-field px-4 py-2.5"
        />
      </div>
      {state.error && <p className="text-sm text-fire">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full px-6 py-3.5 font-sub text-sm font-bold tracking-wide disabled:opacity-50"
      >
        {pending ? "Logging in..." : "LOG IN"}
      </button>
    </form>
  );
}
