import type { Profile } from "@/lib/types";

export function hasActiveAccess(profile: Profile): boolean {
  if (profile.subscription_tier !== "none") return true;
  return new Date(profile.trial_ends_at) > new Date();
}

export function trialDaysLeft(profile: Profile): number {
  const ms = new Date(profile.trial_ends_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}
