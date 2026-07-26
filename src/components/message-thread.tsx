"use client";

import { useActionState } from "react";
import type { Message } from "@/lib/types";
import { sendMessage, type MessageFormState } from "@/app/dashboard/messages/actions";

const initialState: MessageFormState = {};

export function MessageThread({
  messages,
  currentUserId,
  recipientId,
}: {
  messages: Message[];
  currentUserId: string;
  recipientId: string;
}) {
  const action = sendMessage.bind(null, recipientId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="flex h-[60vh] flex-col rounded-2xl border border-neutral-200">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-neutral-500">No messages yet. Say hello!</p>
        )}
        {messages.map((m) => {
          const isMine = m.sender_id === currentUserId;
          return (
            <div
              key={m.id}
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                isMine ? "ml-auto bg-accent text-white" : "bg-neutral-100"
              }`}
            >
              {m.body}
            </div>
          );
        })}
      </div>
      <form action={formAction} className="flex gap-2 border-t border-neutral-200 p-3">
        <input
          name="body"
          type="text"
          placeholder="Type a message..."
          required
          className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-accent disabled:opacity-50"
        >
          Send
        </button>
      </form>
      {state.error && <p className="px-4 pb-2 text-sm text-accent">{state.error}</p>}
    </div>
  );
}
