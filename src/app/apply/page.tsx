"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const QUESTIONS = [
  {
    id: "struggle",
    text: "What's your biggest struggle right now?",
    options: [
      "Too busy with work to stay consistent",
      "No structured plan that fits my schedule",
      "Training but not seeing real results",
      "Don't know how to eat to build muscle",
      "Other (tell us)",
    ],
  },
  {
    id: "weight",
    text: "What's your current weight?",
    options: ["Under 140lbs", "140–160lbs", "160–180lbs", "180lbs+", "Other (tell us)"],
  },
  {
    id: "experience",
    text: "What's your training experience?",
    options: [
      "Beginner (0–6 months)",
      "Some experience (6 months–2 years)",
      "Experienced, but stuck",
      "I used to train, took time off",
      "Other (tell us)",
    ],
  },
  {
    id: "days",
    text: "How many days a week can you realistically train?",
    options: ["3 days", "4 days", "5+ days", "Other (tell us)"],
  },
  {
    id: "goal",
    text: "What's your main goal?",
    options: [
      "Build muscle and get stronger",
      "Look better without spending hours in the gym",
      "Lose fat and build muscle at the same time",
      "Other (tell us)",
    ],
  },
  {
    id: "commitment",
    text: "How committed are you to making this work?",
    options: [
      "100%, I'm ready to do whatever it takes",
      "Pretty serious, I just need the right system",
      "Still figuring out if coaching is right for me",
    ],
  },
  {
    id: "investment",
    text: "Are you open to investing in yourself to get results faster?",
    options: [
      "Yes, I'm serious and ready to invest",
      "Depends on the value, tell me more on the call",
      "Not sure yet",
    ],
  },
];

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://calendly.com/dylanvalenti123/30min";

const RESULTS = [
  {
    name: "Aidan",
    result: "+18 lbs of muscle in 5 months",
    quote: "I had tried everything on my own. Dylan gave me a plan that actually fit my schedule and I finally started seeing real progress.",
    before: "/photos/aidan-before-2b.jpg",
    after: "/photos/aidan-after-2b.jpg",
  },
];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  function choose(option: string) {
    setSelected(option);
  }

  function next() {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (step === 0) return;
    setStep(step - 1);
    setSelected(answers[QUESTIONS[step - 1].id] || null);
  }

  function scrollToQuiz() {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="relative min-h-screen bg-forge px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,24,16,0.1)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-none text-warm">
            YOU&apos;RE A GOOD FIT.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-warm-muted">
            Pick a time below for your free 15-minute call. Dylan reviews every application personally.
          </p>

          {/* Embedded calendar */}
          <div className="mt-10 overflow-hidden rounded-sm border border-forge-4">
            <iframe
              src="https://calendly.com/dylanvalenti123/30min?embed_domain=dylanvalenticoaching.com&embed_type=Inline"
              style={{ border: 0, width: "100%", height: "700px" }}
              frameBorder="0"
            />
          </div>

          <p className="mt-6 text-xs text-warm-muted">
            No commitment. Just a call to see if it&apos;s the right fit.
          </p>
          <Link href="/" className="mt-4 block text-xs text-warm-muted underline hover:text-fire">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const STEP_SILHOUETTES = [
    "/photos/silhouette-flex-front.png",
    "/photos/silhouette-side-lean.png",
    "/photos/silhouette-front.jpg",
    "/photos/silhouette-flex-side.png",
    "/photos/silhouette-back-side.png",
    "/photos/silhouette-arms-wide.png",
    "/photos/silhouette-side-back.png",
  ];

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
          <source src="/photos/dylan-bench-315-crop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-forge/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(122,24,16,0.08)_0%,transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-4xl">

          {/* Eyebrow */}
          <p className="font-sub text-xs font-semibold tracking-[0.3em] text-fire">
            1-ON-1 ONLINE COACHING
          </p>

          {/* Headline */}
          <h1 className="font-display mt-3 text-[clamp(2.8rem,8vw,6rem)] leading-none text-warm">
            BUILT FOR MEN<br />WHO ARE BUSY.
          </h1>

          {/* Sub */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm-muted">
            Dylan works with men who have real careers, real schedules, and real life getting in the way.
            No cookie-cutter plans. Just a program built around you.
          </p>

          {/* Who it's for */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-2xl">
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
                  {/* Before/After photos */}
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
                  {/* Name + result */}
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
              onClick={scrollToQuiz}
              className="border border-fire bg-fire/10 px-8 py-3 text-sm font-sub font-bold tracking-wider text-fire transition hover:bg-fire/20"
            >
              APPLY NOW ↓
            </button>
          </div>

        </div>
      </section>

      {/* ── QUIZ SECTION ── */}
      <section ref={quizRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image
            key={step}
            src={STEP_SILHOUETTES[step]}
            alt=""
            width={600}
            height={600}
            style={{ objectFit: "contain", opacity: 0.9 }}
            className="transition-opacity duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(122,24,16,0.06)_0%,transparent_60%)]" />

        <div className="relative w-full max-w-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="font-sub text-xs font-semibold tracking-[0.3em] text-fire">
              FREE CONSULTATION
            </p>
            <h2 className="font-display mt-2 text-[clamp(2rem,6vw,4rem)] leading-none text-warm">
              BOOK YOUR FREE CALL.
            </h2>
            <p className="mt-3 text-sm text-warm-muted">
              Answer a few quick questions so Dylan can review your situation before your
              call. It takes under a minute.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-sm p-8">
            {/* Progress bar */}
            <div className="mb-6 h-0.5 w-full bg-forge-4">
              <div
                className="h-full bg-gradient-to-r from-fire-dark to-fire transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-sub text-xs font-semibold tracking-widest text-fire">
              QUESTION {step + 1} OF {QUESTIONS.length}
            </p>
            <h3 className="font-display mt-3 text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-warm">
              {current.text}
            </h3>

            <div className="mt-6 space-y-3">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  className={`w-full rounded-sm border px-6 py-4 text-left text-sm font-sub font-medium transition ${
                    selected === opt
                      ? "border-fire bg-fire/10 text-fire"
                      : "border-forge-4 bg-transparent text-warm hover:border-fire hover:text-warm hover:shadow-[0_0_12px_rgba(122,24,16,0.4)]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button
                  onClick={back}
                  className="text-sm font-sub font-medium text-warm-muted transition hover:text-warm"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={next}
                disabled={!selected}
                className="border border-[rgba(122,24,16,0.3)] bg-[#22110a] px-8 py-3 text-sm font-sub font-bold tracking-wider text-warm transition hover:border-[rgba(122,24,16,0.6)] hover:bg-[#2c1810] disabled:cursor-not-allowed disabled:opacity-40"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
