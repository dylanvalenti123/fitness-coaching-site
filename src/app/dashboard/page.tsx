import Link from "next/link";
import { getProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { hasActiveAccess, trialDaysLeft } from "@/lib/access";

const FIRE = "#7a1810";

export default async function DashboardOverviewPage() {
  const profile = await getProfile();
  const supabase = await createClient();

  const { data: assignment } = await supabase
    .from("program_assignments")
    .select("programs(title)")
    .eq("client_id", profile.id)
    .limit(1)
    .maybeSingle();

  const { count: unreadCount } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("recipient_id", profile.id)
    .is("read_at", null);

  const programTitle = assignment?.programs?.[0]?.title;
  const unlocked = hasActiveAccess(profile);
  const daysLeft = trialDaysLeft(profile);

  return (
    <div>
      <h1 className="font-display mb-6 text-3xl leading-none text-warm">
        WELCOME BACK{profile.name ? `, ${profile.name.toUpperCase()}` : ""}
      </h1>

      {profile.subscription_tier === "none" && (
        <div
          className="mb-6 border p-5"
          style={{
            borderColor: unlocked ? "rgba(122,24,16,0.4)" : "rgba(240,235,227,0.1)",
            background: unlocked ? "rgba(122,24,16,0.08)" : "rgba(240,235,227,0.04)",
          }}
        >
          {unlocked ? (
            <>
              <p className="font-sub font-semibold text-warm">
                {daysLeft} day{daysLeft === 1 ? "" : "s"} left in your free trial
              </p>
              <p className="mt-1 text-sm text-warm-muted">
                Subscribe before your trial ends to keep full access.
              </p>
            </>
          ) : (
            <>
              <p className="font-sub font-semibold text-warm">Your free trial has ended</p>
              <p className="mt-1 text-sm text-warm-muted">
                Subscribe to keep using your coaching dashboard and tools.
              </p>
            </>
          )}
          <Link
            href="/dashboard/billing"
            className="btn-primary mt-3 inline-block px-5 py-2 font-sub text-sm font-bold tracking-wide"
          >
            Subscribe Now
          </Link>
        </div>
      )}

      {profile.subscription_tier === "low_ticket" && (
        <div
          className="mb-6 border p-5"
          style={{ borderColor: "rgba(122,24,16,0.4)", background: "rgba(122,24,16,0.08)" }}
        >
          <p className="font-sub font-semibold" style={{ color: FIRE }}>Want faster results?</p>
          <p className="mt-1 text-sm text-warm-muted">
            See what 1-on-1 coaching includes: 2 weekly calls, my personal phone number, and
            a fully custom diet and training plan.
          </p>
          <Link
            href="/coaching"
            className="btn-primary mt-3 inline-block px-5 py-2 font-sub text-sm font-bold tracking-wide"
          >
            Learn more
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="border border-forge-4 bg-forge-2 p-6">
          <h2 className="font-sub font-semibold text-warm">Your Program</h2>
          <p className="mt-2 text-sm text-warm-muted">
            {programTitle ?? "No program assigned yet. Your coach will set one up soon."}
          </p>
          <Link href="/dashboard/programs" className="mt-4 inline-block font-sub text-sm font-medium hover:underline" style={{ color: FIRE }}>
            View program →
          </Link>
        </div>

        <div className="border border-forge-4 bg-forge-2 p-6">
          <h2 className="font-sub font-semibold text-warm">Messages</h2>
          <p className="mt-2 text-sm text-warm-muted">
            {unreadCount ? `${unreadCount} unread message${unreadCount === 1 ? "" : "s"}` : "No new messages"}
          </p>
          <Link href="/dashboard/messages" className="mt-4 inline-block font-sub text-sm font-medium hover:underline" style={{ color: FIRE }}>
            Open messages →
          </Link>
        </div>

        <div className="border border-forge-4 bg-forge-2 p-6">
          <h2 className="font-sub font-semibold text-warm">Streak</h2>
          <p className="font-display mt-2 text-4xl leading-none" style={{ color: FIRE }}>
            {profile.current_streak}
            <span className="font-sub text-base font-medium text-warm-muted"> days</span>
          </p>
          <Link href="/dashboard/progress" className="mt-4 inline-block font-sub text-sm font-medium hover:underline" style={{ color: FIRE }}>
            Log progress →
          </Link>
        </div>
      </div>
    </div>
  );
}
