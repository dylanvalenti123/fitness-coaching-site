import { notFound } from "next/navigation";
import { requireCoach } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { MessageThread } from "@/components/message-thread";

export default async function CoachMessageThreadPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const coach = await requireCoach();
  const { clientId } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("id", clientId)
    .single();

  if (!client) notFound();

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .or(`and(sender_id.eq.${coach.id},recipient_id.eq.${clientId}),and(sender_id.eq.${clientId},recipient_id.eq.${coach.id})`)
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{client.name ?? "Client"}</h1>
      <MessageThread
        messages={messages ?? []}
        currentUserId={coach.id}
        recipientId={clientId}
      />
    </div>
  );
}
