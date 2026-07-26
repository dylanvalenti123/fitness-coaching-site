import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

// Centralizes auth/authorization checks close to the data, per Next.js DAL
// guidance — proxy.ts only does the cheap optimistic redirect.
export const verifySession = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { userId: user.id, email: user.email };
});

export const getProfile = cache(async (): Promise<Profile> => {
  const session = await verifySession();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.userId)
    .single();

  if (error || !data) {
    redirect("/login");
  }

  return data as Profile;
});

export const requireCoach = cache(async (): Promise<Profile> => {
  const profile = await getProfile();
  if (profile.role !== "coach") {
    redirect("/dashboard");
  }
  return profile;
});
