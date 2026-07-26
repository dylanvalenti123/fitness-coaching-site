import { getProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CalorieForm } from "./calorie-form";
import { LockedOverlay } from "@/components/locked-overlay";
import { hasActiveAccess } from "@/lib/access";

export default async function CalorieTrackerPage() {
  const profile = await getProfile();
  const supabase = await createClient();
  const unlocked = hasActiveAccess(profile);

  const { data: logs } = await supabase
    .from("meal_logs")
    .select("*")
    .eq("client_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const totalToday = (logs ?? [])
    .filter((l) => l.created_at.slice(0, 10) === new Date().toISOString().slice(0, 10))
    .reduce((sum, l) => sum + (l.calories ?? 0), 0);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">AI Calorie Tracker</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Snap a photo of your meal and get an instant calorie and macro estimate.
      </p>

      <LockedOverlay unlocked={unlocked}>
        <div className="mb-8 rounded-2xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500">Logged today</p>
          <p className="mt-1 text-3xl font-bold text-accent">{totalToday} cal</p>
        </div>

        <CalorieForm />

        <div className="mt-8">
          <h2 className="mb-3 font-semibold">History</h2>
          {(logs ?? []).length === 0 ? (
            <p className="text-sm text-neutral-600">No meals scanned yet. Try one above.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Meal</th>
                  <th className="pb-2">Calories</th>
                  <th className="pb-2">Protein</th>
                  <th className="pb-2">Carbs</th>
                  <th className="pb-2">Fat</th>
                </tr>
              </thead>
              <tbody>
                {(logs ?? []).map((log) => (
                  <tr key={log.id} className="border-t border-neutral-100">
                    <td className="py-2">{new Date(log.created_at).toLocaleDateString()}</td>
                    <td className="py-2">{log.description ?? "-"}</td>
                    <td className="py-2">{log.calories ?? "-"}</td>
                    <td className="py-2">{log.protein_g ?? "-"}g</td>
                    <td className="py-2">{log.carbs_g ?? "-"}g</td>
                    <td className="py-2">{log.fat_g ?? "-"}g</td>
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
