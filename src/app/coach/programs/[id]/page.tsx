import { notFound } from "next/navigation";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { addWorkout, addExercise } from "../actions";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireCoach();
  const { id } = await params;
  const supabase = await createClient();

  const { data: program } = await supabase
    .from("programs")
    .select("id, title, description")
    .eq("id", id)
    .single();

  if (!program) notFound();

  const { data: workouts } = await supabase
    .from("workouts")
    .select("id, name, exercises(id, name, sets, reps, weight_target)")
    .eq("program_id", id)
    .order("sort_order");

  const addWorkoutAction = async (formData: FormData) => {
    "use server";
    await addWorkout(id, formData);
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{program.title}</h1>
      {program.description && <p className="mb-6 text-neutral-600">{program.description}</p>}

      <div className="space-y-6">
        {(workouts ?? []).map((workout) => {
          const addExerciseAction = async (formData: FormData) => {
            "use server";
            await addExercise(workout.id, id, formData);
          };

          return (
            <div key={workout.id} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold">{workout.name}</h2>

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

              <form action={addExerciseAction} className="mt-4 flex flex-wrap gap-2">
                <input name="name" placeholder="Exercise name" required className="rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
                <input name="sets" type="number" placeholder="Sets" className="w-20 rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
                <input name="reps" type="number" placeholder="Reps" className="w-20 rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
                <input name="weight_target" placeholder="Target weight" className="rounded-lg border border-neutral-300 px-2 py-1 text-sm" />
                <button type="submit" className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white hover:bg-accent">
                  Add Exercise
                </button>
              </form>
            </div>
          );
        })}
      </div>

      <form action={addWorkoutAction} className="mt-6 flex gap-2">
        <input
          name="name"
          placeholder="New workout name (e.g. Day 1 - Push)"
          required
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-accent">
          Add Workout
        </button>
      </form>
    </div>
  );
}
