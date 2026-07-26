"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { updateStreakAndBadges, type BadgeDef } from "@/lib/gamification";

export type ProgressFormState = {
  error?: string;
  success?: boolean;
  currentStreak?: number;
  newBadges?: BadgeDef[];
};

export async function logProgress(
  _prevState: ProgressFormState,
  formData: FormData
): Promise<ProgressFormState> {
  const session = await verifySession();
  const supabase = await createClient();

  const weightRaw = formData.get("weight");
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const photo = formData.get("photo") as File | null;

  const weight = weightRaw ? Number(weightRaw) : null;
  if (weightRaw && Number.isNaN(weight)) {
    return { error: "Weight must be a number." };
  }

  const { error: logError } = await supabase.from("progress_logs").insert({
    client_id: session.userId,
    weight,
    notes,
  });

  if (logError) {
    return { error: "Could not save your progress. Please try again." };
  }

  if (photo && photo.size > 0) {
    const path = `${session.userId}/${Date.now()}-${photo.name}`;
    const { error: uploadError } = await supabase.storage
      .from("progress-photos")
      .upload(path, photo);

    if (!uploadError) {
      await supabase.from("progress_photos").insert({
        client_id: session.userId,
        storage_path: path,
      });
    }
  }

  const { currentStreak, newBadges } = await updateStreakAndBadges(supabase, session.userId);

  revalidatePath("/dashboard/progress");
  revalidatePath("/dashboard");
  return { success: true, currentStreak, newBadges };
}
