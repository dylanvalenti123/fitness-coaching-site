import Image from "next/image";

const FIRE = "#7a1810";

export default function AboutPage() {
  return (
    <>
      <section className="bg-forge py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-sub text-xs font-semibold tracking-[0.3em]" style={{ color: FIRE }}>
            ABOUT
          </p>
          <h1 className="font-display mt-4 text-[clamp(3rem,8vw,6rem)] leading-none text-warm">
            DYLAN VALENTI
          </h1>
        </div>
      </section>

      <section className="bg-forge-2 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="relative aspect-[3/4] w-full border border-forge-4">
              <Image
                src="/photos/dylan-portrait-1.jpg"
                alt="Dylan Valenti"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
            </div>
            <div>
              <blockquote
                className="border-l-2 pl-6 text-xl font-medium italic text-warm"
                style={{ borderColor: FIRE }}
              >
                I gained 30 lbs, mostly muscle, in 7 months, and 40 lbs over a year. Built
                with structure, not guesswork.
              </blockquote>

              <div className="mt-10 space-y-6 text-warm-muted">
                <p>
                  I built that size with structured programming, a real food surplus, and
                  consistent progressive overload, not random workouts and guesswork.
                </p>
                <p>
                  Now I coach lifters who want the same thing: to actually gain size, not just
                  gain weight. My coaching is built around bulking: programming that pushes
                  your lifts up every week, nutrition guidance to keep your surplus working for
                  you instead of against you, and accountability so you stay consistent through
                  the months it actually takes to put on real muscle.
                </p>
                <p>
                  Every client starts with a program built around their training experience,
                  current intake, and schedule. From there, I track your progress and adjust
                  your plan, and you can message me directly anytime. Clients who want more
                  direct feedback and faster progress can upgrade to 1-on-1 coaching for weekly
                  video sessions and fully personalized programming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
