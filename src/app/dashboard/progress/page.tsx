import { getProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { ProgressForm } from "./progress-form";
import { BadgeGrid } from "@/components/badge-grid";
import { LockedOverlay } from "@/components/locked-overlay";
import { hasActiveAccess } from "@/lib/access";

export default async function ProgressPage() {
  const profile = await getProfile();
  const supabase = await createClient();
  const unlocked = hasActiveAccess(profile);

  const { data: logs } = await supabase
    .from("progress_logs")
    .select("*")
    .eq("client_id", profile.id)
    .order("log_date", { ascending: false })
    .limit(20);

  const { data: badges } = await supabase
    .from("badges")
    .select("badge_key")
    .eq("client_id", profile.id);

  const earnedKeys = new Set((badges ?? []).map((b) => b.badge_key as string));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Progress</h1>

      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500">Current streak</p>
          <p className="mt-1 text-3xl font-bold text-accent">{profile.current_streak} days</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500">Longest streak</p>
          <p className="mt-1 text-3xl font-bold">{profile.longest_streak} days</p>
        </div>
      </div>

      <LockedOverlay unlocked={unlocked}>
        <ProgressForm />

        <div className="mt-8">
          <h2 className="mb-3 font-semibold">Badges</h2>
          <BadgeGrid earnedKeys={earnedKeys} />
        </div>

        <div className="mt-8">
          <h2 className="mb-3 font-semibold">History</h2>
          {(logs ?? []).length === 0 ? (
            <p className="text-sm text-neutral-600">No entries yet. Log your first one above.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Weight</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {(logs ?? []).map((log) => (
                  <tr key={log.id} className="border-t border-neutral-100">
                    <td className="py-2">{log.log_date}</td>
                    <td className="py-2">{log.weight ?? "-"}</td>
                    <td className="py-2">{log.notes ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </LockedOverlay>
    </div>
  );
}
