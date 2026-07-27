"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const QUESTIONS = [
  {
    id: "struggle",
    text: "What's your biggest struggle right now?",
    options: [
      "Can't gain weight no matter what I eat",
      "Don't know how to train properly",
      "No consistent plan to follow",
      "Tried everything, nothing has worked",
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
      "Put on as much muscle as possible",
      "Gain weight without getting fat",
      "Look bigger and stronger overall",
      "Build a specific physique / frame",
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
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Ze1sCmDHkFN-2-OGR4a_aUDmCZu147VwHkU0TrrsJPLDXhQqSR1LojpegJ3TrD1-H9-YuO4pn";

function Dots() {
  const positions = [
    { top: "15%", left: "8%" }, { top: "30%", left: "92%" }, { top: "55%", left: "5%" },
    { top: "70%", left: "88%" }, { top: "85%", left: "15%" }, { top: "20%", left: "75%" },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-fire/40"
          style={pos}
        />
      ))}
    </>
  );
}

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

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

  if (done) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-forge px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,24,16,0.1)_0%,transparent_60%)]" />
        <Dots />
        <div className="relative max-w-xl">
          <span className="text-5xl">🔥</span>
          <h1 className="font-display mt-6 text-[clamp(2.5rem,8vw,5rem)] leading-none text-warm">
            YOU&apos;RE A GOOD FIT.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-warm-muted">
            Based on your answers, Dylan can help you build real size fast. Book your free
            15-minute call to map out exactly what your plan looks like.
          </p>
          <Link
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-[rgba(122,24,16,0.3)] bg-[#22110a] px-10 py-4 text-sm font-sub font-bold tracking-wider text-warm transition hover:border-[rgba(122,24,16,0.6)] hover:bg-[#2c1810]"
          >
            BOOK YOUR FREE CALL
          </Link>
          <p className="mt-4 text-xs text-warm-muted">
            No commitment. Just a call to see if it&apos;s the right fit.
          </p>
          <Link href="/" className="mt-6 block text-xs text-warm-muted underline hover:text-fire">
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
  const STEP_OPACITIES = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-forge px-6 py-20">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          key={step}
          src={STEP_SILHOUETTES[step]}
          alt=""
          width={600}
          height={600}
          style={{ objectFit: "contain", opacity: STEP_OPACITIES[step] }}
          className="transition-opacity duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(122,24,16,0.06)_0%,transparent_60%)]" />
      <Dots />
      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-sub text-xs font-semibold tracking-[0.3em] text-fire">
            FREE CONSULTATION
          </p>
          <h1 className="font-display mt-2 text-[clamp(2rem,6vw,4rem)] leading-none text-warm">
            BOOK YOUR FREE CALL.
          </h1>
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
          <h2 className="font-display mt-3 text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-warm">
            {current.text}
          </h2>

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
    </div>
  );
}
