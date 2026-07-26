"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { getOpenAI } from "@/lib/openai";

export type CalorieScanState = {
  error?: string;
  result?: {
    description: string;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  };
};

export async function scanMealPhoto(
  _prevState: CalorieScanState,
  formData: FormData
): Promise<CalorieScanState> {
  const session = await verifySession();
  const photo = formData.get("photo") as File | null;

  if (!photo || photo.size === 0) {
    return { error: "Please choose a photo of your meal." };
  }

  const supabase = await createClient();
  const buffer = Buffer.from(await photo.arrayBuffer());
  const base64 = buffer.toString("base64");
  const mimeType = photo.type || "image/jpeg";

  let parsed: CalorieScanState["result"];
  try {
    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a nutrition estimation assistant. Look at the meal photo and estimate its nutritional content. Respond ONLY with JSON matching this shape: { \"description\": string (short name of the meal), \"calories\": number, \"protein_g\": number, \"carbs_g\": number, \"fat_g\": number }. These are estimates, so use your best judgment on typical portion sizes.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Estimate the calories and macros for this meal." },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
          ],
        },
      ],
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty response");
    parsed = JSON.parse(raw);
  } catch {
    return { error: "Could not analyze that photo. Please try again with a clearer shot." };
  }

  const path = `${session.userId}/${Date.now()}-${photo.name}`;
  const { error: uploadError } = await supabase.storage
    .from("meal-photos")
    .upload(path, photo);

  if (!uploadError) {
    await supabase.from("meal_logs").insert({
      client_id: session.userId,
      storage_path: path,
      description: parsed?.description ?? null,
      calories: parsed?.calories ?? null,
      protein_g: parsed?.protein_g ?? null,
      carbs_g: parsed?.carbs_g ?? null,
      fat_g: parsed?.fat_g ?? null,
    });
  }

  revalidatePath("/dashboard/calorie-tracker");
  return { result: parsed };
}
