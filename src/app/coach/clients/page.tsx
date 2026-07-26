import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AssignProgramForm } from "./assign-program-form";

export default async function CoachClientsPage() {
  await requireCoach();
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, name, subscription_tier, subscription_status")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  const { data: programs } = await supabase
    .from("programs")
    .select("id, title")
    .order("created_at", { ascending: false });

  const { data: assignments } = await supabase
    .from("program_assignments")
    .select("client_id, program_id");

  const assignmentByClient = new Map(
    (assignments ?? []).map((a) => [a.client_id, a.program_id])
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Clients</h1>

      {(clients ?? []).length === 0 ? (
        <p className="text-neutral-600">No clients have signed up yet.</p>
      ) : (
        <div className="space-y-4">
          {(clients ?? []).map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between rounded-xl border border-neutral-200 p-4"
            >
              <div>
                <p className="font-medium">{client.name ?? "Unnamed client"}</p>
                <p className="text-xs text-neutral-500 capitalize">
                  {client.subscription_tier.replace("_", " ")} · {client.subscription_status}
                </p>
              </div>
              <AssignProgramForm
                clientId={client.id}
                programs={programs ?? []}
                currentProgramId={assignmentByClient.get(client.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
