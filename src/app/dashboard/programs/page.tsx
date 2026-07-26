import { getProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { LockedOverlay } from "@/components/locked-overlay";
import { hasActiveAccess } from "@/lib/access";

export default async function ClientProgramsPage() {
  const profile = await getProfile();
  const supabase = await createClient();
  const unlocked = hasActiveAccess(profile);

  const { data: assignments } = await supabase
    .from("program_assignments")
    .select("programs(id, title, description)")
    .eq("client_id", profile.id);

  const programs = (assignments ?? [])
    .flatMap((a) => a.programs ?? []);

  if (programs.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold">My Program</h1>
        <p className="text-neutral-600">No program has been assigned to you yet.</p>
      </div>
    );
  }

  const program = programs[0];

  const { data: workouts } = await supabase
    .from("workouts")
    .select("id, name, notes, sort_order, exercises(id, name, sets, reps, weight_target, notes)")
    .eq("program_id", program.id)
    .order("sort_order");

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{program.title}</h1>
      {program.description && (
        <p className="mb-6 text-neutral-600">{program.description}</p>
      )}

      <LockedOverlay unlocked={unlocked}>
        <div className="space-y-6">
          {(workouts ?? []).map((workout) => (
            <div key={workout.id} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold">{workout.name}</h2>
              {workout.notes && <p className="mt-1 text-sm text-neutral-500">{workout.notes}</p>}
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-500">
                    <th className="pb-2">Exercise</th>
                    <th className="pb-2">Sets</th>
                    <th className="pb-2">Reps</th>
                    <th className="pb-2">Target</th>
                  </tr>
                </thead>
                <tbody>
                  {(workout.exercises ?? []).map((ex) => (
                    <tr key={ex.id} className="border-t border-neutral-100">
                      <td className="py-2">{ex.name}</td>
                      <td className="py-2">{ex.sets ?? "-"}</td>
                      <td className="py-2">{ex.reps ?? "-"}</td>
                      <td className="py-2">{ex.weight_target ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {(workouts ?? []).length === 0 && (
            <p className="text-neutral-600">Your coach hasn&apos;t added workouts to this program yet.</p>
          )}
        </div>
      </LockedOverlay>
    </div>
  );
}
