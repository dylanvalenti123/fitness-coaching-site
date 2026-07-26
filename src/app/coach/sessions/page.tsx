import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { SessionStatusButtons } from "./session-status-buttons";

export default async function CoachSessionsPage() {
  await requireCoach();
  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, scheduled_at, status, notes, profiles:client_id(name)")
    .order("scheduled_at", { ascending: true });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Sessions</h1>
      <div className="space-y-3">
        {(sessions ?? []).length === 0 ? (
          <p className="text-sm text-neutral-600">No session requests yet.</p>
        ) : (
          (sessions ?? []).map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 text-sm">
              <div>
                <p className="font-medium">{s.profiles?.[0]?.name ?? "Client"}</p>
                <p className="text-neutral-500">{new Date(s.scheduled_at).toLocaleString()}</p>
                {s.notes && <p className="mt-1 text-neutral-500">{s.notes}</p>}
              </div>
              <SessionStatusButtons sessionId={s.id} status={s.status} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
