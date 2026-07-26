import { getProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { SessionRequestForm } from "./session-request-form";

export default async function ClientSessionsPage() {
  const profile = await getProfile();
  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("client_id", profile.id)
    .order("scheduled_at", { ascending: true });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Sessions</h1>
      <SessionRequestForm />

      <div className="mt-8 space-y-3">
        {(sessions ?? []).length === 0 ? (
          <p className="text-sm text-neutral-600">No sessions requested yet.</p>
        ) : (
          (sessions ?? []).map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 text-sm">
              <span>{new Date(s.scheduled_at).toLocaleString()}</span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold capitalize">
                {s.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
