"use server";

import { revalidatePath } from "next/cache";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import type { SessionStatus } from "@/lib/types";

export async function updateSessionStatus(sessionId: string, status: SessionStatus) {
  await requireCoach();
  const supabase = await createClient();
  await supabase.from("sessions").update({ status }).eq("id", sessionId);
  revalidatePath("/coach/sessions");
}
