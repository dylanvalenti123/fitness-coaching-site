"use client";

import { useState } from "react";
import Image from "next/image";

const FIRE = "#b82818";

const QUESTIONS = [
  {
    id: "struggle",
    text: "What's your biggest struggle right now?",
    options: [
      "Can't gain weight no matter what I eat",
      "Don't know how to train properly",
      "No consistent plan to follow",
      "Tried everything, nothing has worked",
    ],
  },
  {
    id: "weight",
    text: "What's your current weight?",
    options: ["Under 140lbs", "140–160lbs", "160–180lbs", "180lbs+"],
  },
  {
    id: "experience",
    text: "How long have you been training?",
    options: [
      "Just starting out",
      "6 months – 2 years",
      "2+ years but stuck",
      "Took time off, getting back",
    ],
  },
  {
    id: "goal",
    text: "What's your main goal?",
    type: "text" as const,
    placeholder: "e.g. Put on 20lbs of muscle, look bigger in a fitted shirt...",
  },
  {
    id: "why",
    text: "Why do you want to make this change?",
    type: "text" as const,
    placeholder: "Be honest — what's really driving you to do this now?",
  },
  {
    id: "commitment",
    text: "How serious are you about making this change?",
    options: [
      "100%. I'm done being in my current position",
      "Very serious, I just need the right system",
      "Still figuring out if coaching is right for me",
    ],
  },
  {
    id: "investment",
    text: "If this is the right fit, are you open to investing in yourself to get there faster?",
    options: [
      "Yes. I'm ready to invest into myself",
      "Depends on what's included, tell me on the call",
      "Not sure yet",
    ],
  },
];

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Ze1sCmDHkFN-2-OGR4a_aUDmCZu147VwHkU0TrrsJPLDXhQqSR1LojpegJ3TrD1-H9-YuO4pn";

type Stage = "landing" | "quiz" | "done";

export default function ApplyIgPage() {
  const [stage, setStage] = useState<Stage>("landing");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  function next() {
    if (!selected || selected.trim() === "") return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStage("done");
    }
  }

  function back() {
    if (step === 0) return;
    setStep(step - 1);
    setSelected(answers[QUESTIONS[step - 1].id] || null);
  }

  if (stage === "landing") {
    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
        style={{ background: "#0c0802" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,40,24,0.12)_0%,transparent_60%)]" />

        <div className="relative w-full max-w-sm">
          <div className="mb-6 flex justify-center">
            <div
              className="relative h-44 w-44 overflow-hidden rounded-full"
            >
              <Image
                src="/photos/silhouette-hero.png"
                alt="Dylan Valenti Coaching"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <p
            className="font-sub text-xs font-bold tracking-[0.3em]"
            style={{ color: FIRE }}
          >
            DYLAN VALENTI COACHING
          </p>

          <h1
            className="font-display mt-4 leading-none text-warm"
            style={{ fontSize: "clamp(2.8rem,12vw,5rem)" }}
          >
            READY TO
            <br />
            <span style={{ color: FIRE }}>ACTUALLY</span>
            <br />
            BUILD SIZE?
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-warm-muted">
            I was the skinniest guy in the room for years. Then I gained 40 lbs in a
            year. If you&apos;re ready to stop guessing and build actual size and
            confidence, let&apos;s talk.
          </p>

          <button
            onClick={() => setStage("quiz")}
            className="mt-8 w-full py-4 font-sub text-sm font-bold tracking-wider text-white transition active:scale-[0.98]"
            style={{
              background: `linear-gradient(160deg, #1a0602 0%, ${FIRE} 45%, #7a1810 100%)`,
              boxShadow: `0 4px 24px rgba(184,40,24,0.45)`,
            }}
          >
            SEE IF YOU QUALIFY →
          </button>

          <p className="mt-3 text-xs text-warm-muted">
            Takes 60 seconds. Free call, no commitment.
          </p>
        </div>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
        style={{ background: "#0c0802" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,40,24,0.1)_0%,transparent_60%)]" />
        <div className="relative w-full max-w-sm">
          <div className="mb-4 flex justify-center">
            <Image
              src="/photos/silhouette-side.png"
              alt=""
              width={160}
              height={160}
              className="opacity-90"
            />
          </div>
          <h1
            className="font-display leading-none text-warm"
            style={{ fontSize: "clamp(2.5rem,10vw,4rem)" }}
          >
            YOU&apos;RE A
            <br />
            <span style={{ color: FIRE }}>GOOD FIT.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-warm-muted">
            Based on your answers, I can help you build real size. Book your free
            15-minute call and we&apos;ll map out exactly what your plan looks like.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block w-full py-4 font-sub text-sm font-bold tracking-wider text-white transition active:scale-[0.98]"
            style={{
              background: `linear-gradient(160deg, #1a0602 0%, ${FIRE} 45%, #7a1810 100%)`,
              boxShadow: `0 4px 24px rgba(184,40,24,0.45)`,
            }}
          >
            🔥 BOOK YOUR FREE CALL
          </a>
          <p className="mt-3 text-xs text-warm-muted">
            No commitment. Just a call to see if it&apos;s the right fit.
          </p>
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

  const STEP_OPACITIES = [0.22, 0.22, 0.55, 0.45, 0.45, 0.55, 0.45];

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{ background: "#0c0802" }}
    >
      {/* Per-step background silhouette */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          key={step}
          src={STEP_SILHOUETTES[step]}
          alt=""
          width={500}
          height={500}
          style={{ objectFit: "contain", opacity: STEP_OPACITIES[step] }}
          className="transition-opacity duration-500"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,40,24,0.06)_0%,transparent_60%)]" />

      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Image
            src="/photos/dylan-logo.jpg"
            alt="Dylan Valenti"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>

        {/* Progress */}
        <div className="mb-6 h-0.5 w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, background: FIRE }}
          />
        </div>

        <p className="font-sub text-xs font-semibold tracking-widest" style={{ color: FIRE }}>
          {step + 1} / {QUESTIONS.length}
        </p>

        <h2
          className="font-display mt-3 leading-tight text-warm"
          style={{ fontSize: "clamp(1.6rem,6vw,2.2rem)" }}
        >
          {current.text}
        </h2>

        <div className="mt-5">
          {current.type === "text" ? (
            <textarea
              rows={4}
              value={selected ?? ""}
              onChange={(e) => setSelected(e.target.value || null)}
              placeholder={"placeholder" in current ? current.placeholder : ""}
              className="w-full resize-none rounded-sm border px-5 py-4 text-sm font-sub leading-relaxed outline-none transition"
              style={{
                borderColor: selected ? FIRE : "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "#f5ebe3",
              }}
            />
          ) : (
            <div className="space-y-3">
              {"options" in current && current.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className="w-full rounded-sm border px-5 py-4 text-left text-sm font-sub font-medium transition"
                  style={
                    selected === opt
                      ? {
                          borderColor: FIRE,
                          background: "rgba(184,40,24,0.12)",
                          color: "#f5ebe3",
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.02)",
                          color: "#a89880",
                        }
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={back}
              className="font-sub text-sm font-medium text-warm-muted transition hover:text-warm"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={next}
            disabled={!selected || selected.trim() === ""}
            className="px-7 py-3 font-sub text-sm font-bold tracking-wider text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: selected
                ? `linear-gradient(160deg, #1a0602 0%, ${FIRE} 45%, #7a1810 100%)`
                : "rgba(255,255,255,0.06)",
            }}
          >
            CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
}
