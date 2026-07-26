import Link from "next/link";

export function LockedOverlay({
  unlocked,
  children,
}: {
  unlocked: boolean;
  children: React.ReactNode;
}) {
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/70">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-center shadow-lg">
          <svg
            className="mx-auto h-7 w-7 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <p className="mt-2 font-semibold">Upgrade to Continue</p>
          <p className="mt-1 text-sm text-neutral-500">
            Your free trial has ended. Subscribe to keep using this.
          </p>
          <Link
            href="/dashboard/billing"
            className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}
