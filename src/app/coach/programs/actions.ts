"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type ProgramFormState = { error?: string };

export async function createProgram(
  _prevState: ProgramFormState,
  formData: FormData
): Promise<ProgramFormState> {
  const profile = await requireCoach();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!title) {
    return { error: "Program title is required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .insert({ title, description, coach_id: profile.id })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Could not create program." };
  }

  revalidatePath("/coach/programs");
  redirect(`/coach/programs/${data.id}`);
}

export async function addWorkout(programId: string, formData: FormData) {
  await requireCoach();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = await createClient();
  await supabase.from("workouts").insert({ program_id: programId, name });
  revalidatePath(`/coach/programs/${programId}`);
}

export async function addExercise(workoutId: string, programId: string, formData: FormData) {
  await requireCoach();
  const name = String(formData.get("name") ?? "").trim();
  const sets = Number(formData.get("sets") ?? 0) || null;
  const reps = Number(formData.get("reps") ?? 0) || null;
  const weight_target = String(formData.get("weight_target") ?? "").trim() || null;

  if (!name) return;

  const supabase = await createClient();
  await supabase.from("exercises").insert({ workout_id: workoutId, name, sets, reps, weight_target });
  revalidatePath(`/coach/programs/${programId}`);
}
