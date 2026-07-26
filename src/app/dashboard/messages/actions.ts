"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type MessageFormState = { error?: string };

export async function sendMessage(
  recipientId: string,
  _prevState: MessageFormState,
  formData: FormData
): Promise<MessageFormState> {
  const session = await verifySession();
  const body = String(formData.get("body") ?? "").trim();

  if (!body) {
    return { error: "Message can't be empty." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({
    sender_id: session.userId,
    recipient_id: recipientId,
    body,
  });

  if (error) {
    return { error: "Could not send message." };
  }

  revalidatePath("/dashboard/messages");
  revalidatePath("/coach/messages");
  return {};
}
