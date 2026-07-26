import Link from "next/link";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export default async function CoachMessagesPage() {
  await requireCoach();
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      <div className="space-y-2">
        {(clients ?? []).length === 0 ? (
          <p className="text-sm text-neutral-600">No clients yet.</p>
        ) : (
          (clients ?? []).map((c) => (
            <Link
              key={c.id}
              href={`/coach/messages/${c.id}`}
              className="block rounded-xl border border-neutral-200 p-4 hover:border-accent"
            >
              {c.name ?? "Unnamed client"}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
