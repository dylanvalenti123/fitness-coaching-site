"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const RESULTS = [
  {
    name: "Aidan",
    result: "+18 lbs of muscle in 4 months",
    quote: "I had tried everything on my own. Dylan gave me a plan that actually fit my schedule and I finally started seeing real progress.",
    before: "/photos/aidan-before-2b.jpg",
    after: "/photos/aidan-after-2b.jpg",
  },
];

export default function ApplyPage() {
  const calRef = useRef<HTMLDivElement>(null);

  function scrollToCal() {
    calRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-forge text-warm">

      {/* ── PROOF SECTION ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 py-24 overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full"
          style={{ opacity: 0.45 }}
        >
          <source src="/photos/dylan-bench-v3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-forge/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(122,24,16,0.08)_0%,transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-4xl">

          <p className="font-sub text-xs font-semibold tracking-[0.3em] text-fire">
            1-ON-1 ONLINE COACHING
          </p>

          <h1 className="font-display mt-3 text-[clamp(2.8rem,8vw,6rem)] leading-none text-warm">
            BUILT FOR MEN<br />WHO ARE BUSY.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm-muted">
            Dylan works with men who have real careers, real schedules, and real life getting in the way.
            No cookie-cutter plans. Just a program built around you.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-2xl">
            {[
              "You're working full-time and can't afford to waste hours in the gym",
              "You want to build muscle but have no idea where to start",
              "You've tried before — it didn't stick because the plan didn't fit your life",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4" style={{ background: "rgba(12,8,2,0.6)", backdropFilter: "blur(8px)", borderLeft: "1px solid rgba(122,24,16,0.4)" }}>
                <span className="mt-0.5 text-fire font-sub font-bold text-xs flex-shrink-0">0{i + 1}</span>
                <p className="text-sm text-warm-muted leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Dylan intro */}
          <div className="mt-14 relative overflow-hidden max-w-2xl">
            <div className="absolute inset-0">
              <Image
                src="/photos/dylan-arms-crossed.jpg"
                alt=""
                fill
                className="object-cover object-top"
                sizes="672px"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,8,2,0.92) 0%, rgba(12,8,2,0.7) 60%, rgba(12,8,2,0.92) 100%)" }} />
            </div>
            <div className="relative p-8">
              <p className="font-sub text-xs font-bold tracking-widest text-fire">THE COACH</p>
              <h2 className="font-display mt-1 text-2xl leading-tight text-warm">DYLAN VALENTI</h2>
              <p className="mt-3 text-sm text-warm-muted leading-relaxed">
                I went from 170 to 200 lbs and have coached dozens of men through the same process.
                I give you my personal number, review what you eat, check your form, and adjust your
                plan every week. You&apos;re not getting an app. You&apos;re getting a coach.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="mt-16">
            <p className="font-sub text-xs font-bold tracking-[0.3em] text-fire mb-8">1 CLIENT RESULT</p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {RESULTS.map((r) => (
                <div key={r.name} className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                      <Image src={r.before} alt={`${r.name} before`} fill className="object-cover object-top" sizes="200px" />
                      <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[9px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}>BEFORE</div>
                    </div>
                    <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                      <Image src={r.after} alt={`${r.name} after`} fill className="object-cover object-top" sizes="200px" />
                      <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[9px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.8)", color: "#f0ebe3" }}>AFTER</div>
                    </div>
                  </div>
                  <div>
                    <p className="font-sub text-xs font-bold tracking-widest text-fire">{r.name.toUpperCase()}</p>
                    <p className="mt-0.5 text-sm font-medium text-warm">{r.result}</p>
                    <p className="mt-2 text-xs text-warm-muted leading-relaxed italic">&ldquo;{r.quote}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll CTA */}
          <div className="mt-8 flex flex-col items-start gap-3">
            <p className="text-sm text-warm-muted">
              If this sounds like you, take 60 seconds to answer a few questions below.
              Dylan reviews every application personally.
            </p>
            <button
              onClick={scrollToCal}
              className="border border-fire bg-fire/10 px-8 py-3 text-sm font-sub font-bold tracking-wider text-fire transition hover:bg-fire/20"
            >
              APPLY NOW ↓
            </button>
          </div>

        </div>
      </section>

      {/* ── CALENDLY SECTION ── */}
      <section ref={calRef} className="bg-forge px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display mt-2 text-[clamp(2rem,6vw,4rem)] leading-none text-warm">
            BOOK YOUR FREE CALL.
          </h2>
          <p className="mt-3 text-sm text-warm-muted">
            Answer a few quick questions and pick a time that works for you.
          </p>
          <div className="mt-10 overflow-hidden rounded-sm border border-forge-4">
            <iframe
              src="https://calendly.com/dylanvalenti123/30min?embed_domain=dylanvalenticoaching.com&embed_type=Inline"
              style={{ border: 0, width: "100%", height: "700px" }}
              frameBorder="0"
            />
          </div>
          <Link href="/" className="mt-6 block text-xs text-warm-muted underline hover:text-fire">
            ← Back to home
          </Link>
        </div>
      </section>

    </div>
  );
}
