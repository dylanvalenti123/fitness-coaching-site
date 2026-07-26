"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type SessionFormState = { error?: string };

export async function requestSession(
  _prevState: SessionFormState,
  formData: FormData
): Promise<SessionFormState> {
  const session = await verifySession();
  const scheduledAt = String(formData.get("scheduled_at") ?? "");
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!scheduledAt) {
    return { error: "Please choose a date and time." };
  }

  const supabase = await createClient();

  const { data: coach } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "coach")
    .limit(1)
    .maybeSingle();

  if (!coach) {
    return { error: "No coach is set up yet." };
  }

  const { error } = await supabase.from("sessions").insert({
    client_id: session.userId,
    coach_id: coach.id,
    scheduled_at: new Date(scheduledAt).toISOString(),
    notes,
    status: "requested",
  });

  if (error) {
    return { error: "Could not request session." };
  }

  revalidatePath("/dashboard/sessions");
  return {};
}
