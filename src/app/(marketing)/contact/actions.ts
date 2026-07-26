"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactFormState = { error?: string; success?: boolean };

export async function submitContactRequest(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Please fill in every field." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_requests")
    .insert({ name, email, message });

  if (error) {
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
