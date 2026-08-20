import Link from "next/link";
import Image from "next/image";

const FIRE = "#7a1810";

const included = [
  {
    title: "2 weekly video calls",
    description: "Scheduled check-ins every week to review your training, food, and what's actually working.",
  },
  {
    title: "My personal phone number",
    description: "Direct line to me, not a support inbox. Question at 9pm before a workout? Text me.",
  },
  {
    title: "Custom diet plan",
    description: "Built around your numbers, your schedule, and food you'll actually eat, adjusted as your weight moves.",
  },
  {
    title: "Custom workout plan",
    description: "Programming written specifically for your training history and equipment, not a template.",
  },
  {
    title: "Full dashboard & progress tracking access",
    description: "The progress tracking dashboard and all coaching tools come included.",
  },
  {
    title: "Direct messaging with me",
    description: "Text me directly between calls whenever something comes up. This is the highest-touch version of working with me.",
  },
];


function StoryPhoto({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative aspect-[3/4] w-full border border-forge-4 ${className}`}>
      <Image src={src} alt="Dylan Valenti" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 500px" />
    </div>
  );
}

export default function CoachingPage() {
  return (
    <>
      <section className="bg-forge">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-28 sm:py-36 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-sub text-xs font-semibold tracking-[0.3em]" style={{ color: FIRE }}>
              1-ON-1 COACHING
            </p>
            <h1 className="font-display mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-none text-warm">
              THIS IS HOW I DID IT.
              <br />
              <span style={{ color: FIRE }}>NOW I&apos;LL DO IT WITH YOU.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base text-warm-muted">
              Custom diet and training, built around your life, with me on the other end of
              every call and every text.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/photos/silhouette-flex-back.png"
              alt="Dylan Valenti"
              width={480}
              height={480}
              className="opacity-90"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-forge-2 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-sub text-xs font-semibold tracking-[0.3em]" style={{ color: FIRE }}>
            MY STORY
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-none text-warm">
            30 LBS IN 7 MONTHS. 40 IN A YEAR.
          </h2>

          <div className="mt-14 max-w-2xl space-y-6 text-warm-muted">
            <p>
              Before any of that, I was the guy who trained hard and still couldn&apos;t put
              on weight. I followed programs I found online, ate &ldquo;a lot&rdquo; by my
              own standards, and the scale barely moved month to month.
            </p>
            <p>
              The problem was never effort. It was that nothing was actually structured. No
              real surplus target, no tracking, no plan for adjusting when progress stalled.
              I&apos;d eat big for a week, get discouraged when nothing changed, and quietly
              go back to eating like normal.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <StoryPhoto src="/photos/dylan-portrait-3.jpg" className="order-last lg:order-first" />
            <div className="space-y-6 text-warm-muted">
              <p>
                That changed when I stopped guessing. I started tracking everything: what I
                ate, what I lifted, how my weight trended week over week, and adjusting based
                on the data instead of how I felt that day.
              </p>
              <p>
                That&apos;s the entire difference between someone who bulks for a year and
                ends up exactly where they started, and someone who gains 30 lbs of mostly
                muscle in 7 months. It&apos;s not a different work ethic. It&apos;s a
                different process.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-warm-muted">
              <p>
                Once I had the system dialed in for myself, I started building it for other
                people. 1-on-1 coaching is that same system, but with me actively running it
                with you: reviewing your numbers every week on a call, adjusting your plan in
                real time, and being reachable when something comes up between sessions
                instead of making you wait for a scheduled check-in.
              </p>
              <p>
                This isn&apos;t a generic template with your name on it. It&apos;s the same
                process that got me from spinning my wheels to gaining 40 lbs in a year, run
                specifically for you.
              </p>
            </div>
            <StoryPhoto src="/photos/dylan-portrait-1.jpg" />
          </div>
        </div>
      </section>

      <section className="bg-forge py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-center text-[clamp(2rem,5vw,3.5rem)] leading-none text-warm">
            WHAT&apos;S INCLUDED
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden bg-forge-4 sm:grid-cols-3">
            {included.map((item) => (
              <div key={item.title} className="bg-forge-2 p-8">
                <div className="h-px w-10" style={{ background: FIRE }} />
                <h3 className="font-display mt-5 text-lg leading-none text-warm">{item.title}</h3>
                <p className="mt-3 text-sm text-warm-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forge py-24 text-center sm:py-32">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-warm">
            LET&apos;S SEE IF IT&apos;S A FIT
          </h2>
          <p className="mt-4 text-warm-muted">
            Pricing is custom based on your goals. We&apos;ll talk it through on a free call first.
          </p>
          <Link
            href="/apply"
            className="btn-primary mt-8 inline-block px-10 py-4 font-sub text-sm font-bold tracking-wider"
          >
            Book a Free Call
          </Link>
        </div>
      </section>
    </>
  );
}
