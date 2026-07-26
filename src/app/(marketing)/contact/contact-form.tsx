"use client";

import { useActionState } from "react";
import { submitContactRequest, type ContactFormState } from "./actions";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactRequest,
    initialState
  );

  if (state.success) {
    return (
      <p className="border border-forge-4 bg-forge-3 p-4 text-center text-warm">
        Thanks for reaching out. We&apos;ll get back to you shortly.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
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
        <label htmlFor="message" className="block text-sm font-medium text-warm-muted">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
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
        {pending ? "Sending..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
