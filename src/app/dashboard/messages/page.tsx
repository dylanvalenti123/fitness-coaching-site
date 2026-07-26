import { getProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { MessageThread } from "@/components/message-thread";

export default async function ClientMessagesPage() {
  const profile = await getProfile();
  const supabase = await createClient();

  const { data: coach } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("role", "coach")
    .limit(1)
    .maybeSingle();

  if (!coach) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold">Messages</h1>
        <p className="text-neutral-600">Your coach hasn&apos;t set up their account yet.</p>
      </div>
    );
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .or(`and(sender_id.eq.${profile.id},recipient_id.eq.${coach.id}),and(sender_id.eq.${coach.id},recipient_id.eq.${profile.id})`)
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Messages with {coach.name ?? "your coach"}</h1>
      <MessageThread
        messages={messages ?? []}
        currentUserId={profile.id}
        recipientId={coach.id}
      />
    </div>
  );
}
