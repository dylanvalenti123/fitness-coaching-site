import Link from "next/link";

const FIRE = "#7a1810";

const features = [
  "Fully custom training program",
  "Daily food photo check-ins with Dylan",
  "Weekly 1-on-1 coaching calls",
  "Direct messaging with Dylan",
  "Progress tracking & weekly adjustments",
  "Built specifically for skinny guys who want to gain real size",
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-forge py-20 text-center sm:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <p className="font-sub text-xs font-semibold tracking-[0.3em]" style={{ color: FIRE }}>
            PRICING
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,4rem)] leading-none text-warm">
            ONE PLAN. THE RIGHT ONE.
          </h1>
          <p className="mt-6 text-base text-warm-muted">
            Dylan doesn&apos;t offer watered-down tiers. One coaching program, built around you, priced on your free call.
          </p>
        </div>
      </section>

      <section className="bg-forge-2 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <div className="card rounded-sm p-10">
            <p className="font-sub text-xs font-bold tracking-[0.3em]" style={{ color: FIRE }}>
              1-ON-1 COACHING
            </p>
            <h2 className="font-display mt-3 text-[clamp(2.5rem,6vw,4rem)] leading-none text-warm">
              CUSTOM PRICING
            </h2>
            <p className="mt-2 text-sm text-warm-muted">
              Based on your goals and timeline, confirmed on your free call.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-warm-muted">
                  <span className="mt-0.5 shrink-0 font-bold" style={{ color: FIRE }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/apply" className="btn-primary mt-10 block w-full text-center">
              BOOK YOUR FREE CALL
            </Link>
            <p className="mt-4 text-center text-xs text-warm-muted">
              No commitment. Just a call to see if it&apos;s the right fit.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
