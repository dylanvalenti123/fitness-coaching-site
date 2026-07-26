import { BADGE_DEFS } from "@/lib/gamification";

export function BadgeGrid({ earnedKeys }: { earnedKeys: Set<string> }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {BADGE_DEFS.map((badge) => {
        const earned = earnedKeys.has(badge.key);
        return (
          <div
            key={badge.key}
            className={`rounded-xl border p-4 text-center ${
              earned
                ? "border-accent bg-accent/5"
                : "border-neutral-200 opacity-50"
            }`}
          >
            <p className={`text-sm font-semibold ${earned ? "text-accent" : "text-neutral-500"}`}>
              {badge.label}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}
