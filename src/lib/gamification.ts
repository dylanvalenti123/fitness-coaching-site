import type { SupabaseClient } from "@supabase/supabase-js";

export interface BadgeDef {
  key: string;
  label: string;
  description: string;
}

export const BADGE_DEFS: BadgeDef[] = [
  { key: "first_log", label: "First Log", description: "Logged your first entry" },
  { key: "streak_3", label: "3-Day Streak", description: "Logged 3 days in a row" },
  { key: "streak_7", label: "7-Day Streak", description: "Logged 7 days in a row" },
  { key: "streak_30", label: "30-Day Streak", description: "Logged 30 days in a row" },
  { key: "logs_10", label: "10 Logs Strong", description: "Logged 10 total entries" },
  { key: "logs_50", label: "50 Logs Strong", description: "Logged 50 total entries" },
];

function toUTCDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00Z`);
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

// Walks distinct log dates (desc) and counts the unbroken run ending at the
// most recent date, since logProgress always inserts today's date first.
function computeCurrentStreak(distinctDatesDesc: string[]): number {
  if (distinctDatesDesc.length === 0) return 0;

  let streak = 1;
  let cursor = toUTCDate(distinctDatesDesc[0]);

  for (let i = 1; i < distinctDatesDesc.length; i++) {
    const next = toUTCDate(distinctDatesDesc[i]);
    if (daysBetween(cursor, next) === 1) {
      streak++;
      cursor = next;
    } else {
      break;
    }
  }

  return streak;
}

// Call right after inserting a progress_logs row. Updates the streak on
// profiles and awards any newly-earned badges. Best-effort — failures here
// shouldn't block the user's actual log from succeeding.
export async function updateStreakAndBadges(
  supabase: SupabaseClient,
  clientId: string
): Promise<{ currentStreak: number; newBadges: BadgeDef[] }> {
  const { data: logs } = await supabase
    .from("progress_logs")
    .select("log_date")
    .eq("client_id", clientId)
    .order("log_date", { ascending: false });

  const allDates = (logs ?? []).map((l) => l.log_date as string);
  const distinctDatesDesc = Array.from(new Set(allDates));
  const totalLogs = allDates.length;
  const currentStreak = computeCurrentStreak(distinctDatesDesc);

  const { data: profile } = await supabase
    .from("profiles")
    .select("longest_streak")
    .eq("id", clientId)
    .single();

  const longestStreak = Math.max(profile?.longest_streak ?? 0, currentStreak);

  await supabase
    .from("profiles")
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_log_date: distinctDatesDesc[0] ?? null,
    })
    .eq("id", clientId);

  const eligible = BADGE_DEFS.filter((b) => {
    if (b.key === "first_log") return totalLogs >= 1;
    if (b.key === "streak_3") return currentStreak >= 3;
    if (b.key === "streak_7") return currentStreak >= 7;
    if (b.key === "streak_30") return currentStreak >= 30;
    if (b.key === "logs_10") return totalLogs >= 10;
    if (b.key === "logs_50") return totalLogs >= 50;
    return false;
  });

  if (eligible.length === 0) {
    return { currentStreak, newBadges: [] };
  }

  const { data: existing } = await supabase
    .from("badges")
    .select("badge_key")
    .eq("client_id", clientId);

  const earnedKeys = new Set((existing ?? []).map((b) => b.badge_key as string));
  const toAward = eligible.filter((b) => !earnedKeys.has(b.key));

  if (toAward.length > 0) {
    await supabase
      .from("badges")
      .insert(toAward.map((b) => ({ client_id: clientId, badge_key: b.key })));
  }

  return { currentStreak, newBadges: toAward };
}
