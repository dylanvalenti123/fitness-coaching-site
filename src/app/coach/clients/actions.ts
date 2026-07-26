"use server";

import { revalidatePath } from "next/cache";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type AssignFormState = { error?: string };

export async function assignProgram(
  _prevState: AssignFormState,
  formData: FormData
): Promise<AssignFormState> {
  await requireCoach();

  const clientId = String(formData.get("client_id") ?? "");
  const programId = String(formData.get("program_id") ?? "");

  if (!clientId || !programId) {
    return { error: "Choose a program to assign." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("program_assignments")
    .upsert({ client_id: clientId, program_id: programId });

  if (error) {
    return { error: "Could not assign program." };
  }

  revalidatePath("/coach/clients");
  return {};
}
