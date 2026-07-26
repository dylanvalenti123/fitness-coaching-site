import Link from "next/link";
import { getProfile } from "@/lib/dal";
import { UpgradeButton } from "./upgrade-button";

const tierLabels: Record<string, string> = {
  none: "No active plan",
  low_ticket: "Core Coaching",
  high_ticket: "1-on-1 Coaching",
};

export default async function BillingPage() {
  const profile = await getProfile();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Billing</h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
        <p className="text-sm text-neutral-500">Current plan</p>
        <p className="mt-1 text-xl font-semibold">{tierLabels[profile.subscription_tier]}</p>
        <p className="mt-1 text-sm capitalize text-neutral-500">
          Status: {profile.subscription_status}
        </p>

        <div className="mt-6 flex gap-3">
          {profile.subscription_tier === "none" && (
            <UpgradeButton label="Subscribe to Core Plan" />
          )}
          {profile.subscription_tier === "low_ticket" && (
            <Link
              href="/coaching"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark"
            >
              Learn About 1-on-1 Coaching
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
