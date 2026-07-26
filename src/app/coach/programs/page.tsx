import Link from "next/link";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { NewProgramForm } from "./new-program-form";

export default async function CoachProgramsPage() {
  await requireCoach();
  const supabase = await createClient();

  const { data: programs } = await supabase
    .from("programs")
    .select("id, title, description")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Programs</h1>
      <NewProgramForm />

      <div className="mt-8 space-y-3">
        {(programs ?? []).length === 0 ? (
          <p className="text-sm text-neutral-600">No programs yet. Create one above.</p>
        ) : (
          (programs ?? []).map((p) => (
            <Link
              key={p.id}
              href={`/coach/programs/${p.id}`}
              className="block rounded-xl border border-neutral-200 p-4 hover:border-accent"
            >
              <p className="font-medium">{p.title}</p>
              {p.description && <p className="text-sm text-neutral-500">{p.description}</p>}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
