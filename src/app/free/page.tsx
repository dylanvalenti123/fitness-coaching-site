"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const FIRE = "#b82818";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Ze1sCmDHkFN-2-OGR4a_aUDmCZu147VwHkU0TrrsJPLDXhQqSR1LojpegJ3TrD1-H9-YuO4pn";

type Stage = "landing" | "form" | "questions" | "booked";

const QUESTIONS = [
  {
    id: "goal",
    label: "What is your #1 goal and why?",
    type: "textarea" as const,
    placeholder: "e.g. Put on 20lbs of muscle so I stop feeling invisible in a room...",
  },
  {
    id: "serious",
    label: "How serious are you about making this change in the next 3 months?",
    type: "radio" as const,
    options: [
      "100%. I'm done being in my current position",
      "Very serious — I just need the right system",
      "Still figuring out if coaching is right for me",
    ],
  },
  {
    id: "holding",
    label: "What's been holding you back?",
    type: "radio" as const,
    options: [
      "I don't know what to do in the gym",
      "I need accountability — I can't stay consistent alone",
      "I've been training but not seeing results",
      "I keep starting and stopping",
    ],
  },
  {
    id: "invest",
    label: "If this is the right fit, are you open to investing in yourself to get there faster?",
    type: "radio" as const,
    options: [
      "Yes — I'm ready to invest in myself",
      "Depends on what's included, tell me on the call",
      "No — I'm not in a position to invest right now",
    ],
  },
  {
    id: "stats",
    label: "What's your current height and weight?",
    type: "text" as const,
    placeholder: "e.g. 5'11 / 155lbs",
  },
  {
    id: "platform",
    label: "Where did you find me?",
    type: "radio" as const,
    options: ["TikTok", "Instagram", "X (Twitter)", "Facebook", "Friend / referral", "Other"],
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3 w-3" style={{ fill: FIRE }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const testimonials = [
  {
    name: "Nick C.",
    duration: "4 weeks",
    quote: "Dylan's program is the first thing that's ever actually worked for me. I look completely different.",
    photo: "/photos/nick-after-1.jpg",
    objectPos: "center top",
  },
  {
    name: "Aidan",
    duration: "6 months",
    quote: "I went from having no idea what I was doing to actually looking like I lift. The back growth alone was insane.",
    photo: "/photos/aidan-after-2b.jpg",
    objectPos: "center top",
  },
  {
    name: "Nick C.",
    duration: "4 weeks",
    quote: "Dylan's program is the first thing that's ever actually worked for me. I look completely different.",
    photo: "/photos/nick-after-1.jpg" as string | undefined,
    objectPos: "center top",
  },
];

function CtaButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 font-sub text-sm font-bold tracking-wider text-white transition active:scale-[0.98]"
      style={{
        background: `linear-gradient(160deg, #1a0602 0%, ${FIRE} 45%, #7a1810 100%)`,
        boxShadow: `0 4px 24px rgba(184,40,24,0.45)`,
      }}
    >
      SEND ME THE FREE WORKOUT →
    </button>
  );
}

export default function FreePage() {
  const [stage, setStage] = useState<Stage>("landing");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function setField(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setAnswer(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  function formValid() {
    return form.firstName.trim() && form.email.trim() && form.phone.trim();
  }

  function questionsValid() {
    return QUESTIONS.every((q) => {
      if (q.type === "radio") return !!answers[q.id];
      return answers[q.id]?.trim();
    });
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setStage("questions");
  }

  async function submitQuestions(e: React.FormEvent) {
    e.preventDefault();
    if (!questionsValid()) return;
    setSubmitting(true);
    try {
      const supabase = createClient();
      await supabase.from("leads").insert({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        goal: answers.goal,
        serious: answers.serious,
        holding: answers.holding,
        invest: answers.invest,
        stats: answers.stats,
        platform: answers.platform,
      });
    } catch {
      // don't block the user if save fails
    }
    setSubmitting(false);
    setStage("booked");
  }

  /* ── LANDING ── */
  if (stage === "landing") {
    return (
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 py-16 text-center"
        style={{ background: "#0c0802" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,40,24,0.13)_0%,transparent_60%)]" />

        <div className="relative w-full max-w-sm">
          <p className="font-sub text-xs font-bold tracking-[0.3em]" style={{ color: FIRE }}>
            DYLAN VALENTI COACHING
          </p>

          <h1 className="font-display mt-4 leading-none text-warm"
            style={{ fontSize: "clamp(2.6rem,12vw,4.2rem)" }}>
            FREE<br />
            <span style={{ color: FIRE }}>BACK</span><br />
            WORKOUT
          </h1>

          <p className="mt-5 text-sm leading-relaxed" style={{ color: "#b8a898" }}>
            The exact back training protocol I used to go from 170 to 200lbs — thickness, width, and the V-taper that makes you look built in any shirt.
          </p>

          {/* Stats strip */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {[["30+", "lbs gained"], ["7mo", "transformation"], ["Free", "no bs"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl" style={{ color: "#f0ebe3" }}>{val}</p>
                <p className="font-sub text-[9px] uppercase tracking-wider" style={{ color: "#6b5c4d" }}>{label}</p>
              </div>
            )).reduce<React.ReactNode[]>((acc, el, i) => i === 0 ? [el] : [...acc, <div key={i} className="h-8 w-px" style={{ background: "#2e2010" }} />, el], [])}
          </div>

          {/* CTA above */}
          <div className="mt-8">
            <CtaButton onClick={() => setStage("form")} />
          </div>

          {/* Client transformations with quotes beneath */}
          <div className="mt-6 space-y-6">
            {/* Aidan */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-sub text-sm font-bold" style={{ color: "#f0ebe3" }}>Aidan</p>
                <p className="font-sub text-xs font-semibold" style={{ color: FIRE }}>6 MONTHS</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm" style={{ border: "1px solid #2e2010" }}>
                  <Image src="/photos/aidan-before-2b.jpg" alt="Aidan before" fill className="object-cover object-top" sizes="160px" />
                  <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest"
                    style={{ background: "rgba(12,8,2,0.9)", color: "#b8a898" }}>BEFORE</div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm" style={{ border: `1px solid rgba(184,40,24,0.6)` }}>
                  <Image src="/photos/aidan-after-2b.jpg" alt="Aidan after" fill className="object-cover object-top" sizes="160px" />
                  <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest"
                    style={{ background: "rgba(184,40,24,0.9)", color: "#f0ebe3" }}>AFTER</div>
                </div>
              </div>
              <div className="mt-2 rounded-sm p-4 text-left" style={{ background: "#251a0a", border: "1px solid #2e2010" }}>
                <StarRow />
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#c8b8a8" }}>
                  &ldquo;I went from having no idea what I was doing to actually looking like I lift. The back growth alone was insane.&rdquo;
                </p>
              </div>
            </div>

            {/* Nick C. */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-sub text-sm font-bold" style={{ color: "#f0ebe3" }}>Nick C.</p>
                <p className="font-sub text-xs font-semibold" style={{ color: FIRE }}>4 WEEKS</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm" style={{ border: "1px solid #2e2010" }}>
                  <Image src="/photos/nick-before-1.jpg" alt="Nick before" fill className="object-cover object-top" sizes="160px" />
                  <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest"
                    style={{ background: "rgba(12,8,2,0.9)", color: "#b8a898" }}>BEFORE</div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm" style={{ border: `1px solid rgba(184,40,24,0.6)` }}>
                  <Image src="/photos/nick-after-1.jpg" alt="Nick after" fill className="object-cover object-top" sizes="160px" />
                  <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest"
                    style={{ background: "rgba(184,40,24,0.9)", color: "#f0ebe3" }}>AFTER</div>
                </div>
              </div>
              <div className="mt-2 rounded-sm p-4 text-left" style={{ background: "#251a0a", border: "1px solid #2e2010" }}>
                <StarRow />
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#c8b8a8" }}>
                  &ldquo;Dylan&apos;s program is the first thing that&apos;s ever actually worked for me. I look completely different.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Dylan's transformation */}
          <div className="mt-6">
            <p className="font-sub text-[10px] font-bold tracking-[0.25em] mb-3 text-left" style={{ color: FIRE }}>THE COACH — 170 → 200 LBS</p>
            <div className="flex gap-2 overflow-hidden rounded-sm" style={{ border: "1px solid #2e2010" }}>
              <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                <Image src="/photos/dylan-back-before-correct.jpg" alt="Dylan before" fill className="object-cover"
                  style={{ objectPosition: "center 20%" }} sizes="160px" />
                <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[9px] font-bold tracking-widest"
                  style={{ background: "rgba(12,8,2,0.85)", color: "#b8a898" }}>BEFORE · 170 LBS</div>
              </div>
              <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                <Image src="/photos/dylan-back-after2.jpg" alt="Dylan after" fill className="object-cover object-top" sizes="160px" />
                <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[9px] font-bold tracking-widest"
                  style={{ background: "rgba(184,40,24,0.85)", color: "#f0ebe3" }}>AFTER · 200 LBS</div>
              </div>
            </div>
          </div>

          {/* CTA below */}
          <div className="mt-6">
            <CtaButton onClick={() => setStage("form")} />
          </div>
          <p className="mt-3 text-xs" style={{ color: "#6b5c4d" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    );
  }

  /* ── FORM ── */
  if (stage === "form") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16"
        style={{ background: "#0c0802" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,40,24,0.08)_0%,transparent_60%)]" />
        <div className="relative w-full max-w-sm">
          <p className="font-sub text-xs font-bold tracking-[0.3em] text-center" style={{ color: FIRE }}>ONE STEP AWAY</p>
          <h2 className="font-display mt-3 leading-none text-warm text-center" style={{ fontSize: "clamp(2rem,9vw,3rem)" }}>
            WHERE SHOULD WE<br /><span style={{ color: FIRE }}>SEND IT?</span>
          </h2>
          <p className="mt-3 text-sm text-center" style={{ color: "#b8a898" }}>
            Enter your details and we&apos;ll send the free back workout straight to your inbox.
          </p>

          <form onSubmit={submitForm} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sub text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6b5c4d" }}>First Name *</label>
                <input type="text" required value={form.firstName} onChange={(e) => setField("firstName", e.target.value)}
                  placeholder="Dylan" className="input-field w-full rounded-sm px-4 py-3 text-sm font-sub" />
              </div>
              <div>
                <label className="block font-sub text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6b5c4d" }}>Last Name</label>
                <input type="text" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)}
                  placeholder="V." className="input-field w-full rounded-sm px-4 py-3 text-sm font-sub" />
              </div>
            </div>
            <div>
              <label className="block font-sub text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6b5c4d" }}>Email *</label>
              <input type="email" required value={form.email} onChange={(e) => setField("email", e.target.value)}
                placeholder="you@email.com" className="input-field w-full rounded-sm px-4 py-3 text-sm font-sub" />
            </div>
            <div>
              <label className="block font-sub text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6b5c4d" }}>Phone *</label>
              <input type="tel" required value={form.phone} onChange={(e) => setField("phone", e.target.value)}
                placeholder="+1 (315) 000-0000" className="input-field w-full rounded-sm px-4 py-3 text-sm font-sub" />
            </div>
            <button type="submit" disabled={!formValid() || submitting}
              className="mt-2 w-full py-4 font-sub text-sm font-bold tracking-wider text-white transition disabled:opacity-50"
              style={{ background: `linear-gradient(160deg, #1a0602 0%, ${FIRE} 45%, #7a1810 100%)`, boxShadow: `0 4px 24px rgba(184,40,24,0.4)` }}>
              {submitting ? "SENDING..." : "GET ACCESS NOW →"}
            </button>
            <p className="text-center text-xs" style={{ color: "#4a3c30" }}>
              The free workout will be sent to the email you enter above.
            </p>
          </form>
        </div>
      </div>
    );
  }

  /* ── QUESTIONS ── */
  if (stage === "questions") {
    return (
      <div className="relative min-h-screen overflow-hidden px-5 py-16" style={{ background: "#0c0802" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,40,24,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-sm">
          {/* Header */}
          <div className="mb-2 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: "rgba(184,40,24,0.15)", border: `1.5px solid ${FIRE}` }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={FIRE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <p className="font-sub text-xs font-bold tracking-[0.3em] text-center" style={{ color: FIRE }}>WORKOUT SENT ✓</p>
          <h2 className="font-display mt-3 leading-none text-warm text-center" style={{ fontSize: "clamp(1.8rem,8vw,2.8rem)" }}>
            ONE LAST THING,<br /><span style={{ color: FIRE }}>{form.firstName.toUpperCase()}.</span>
          </h2>
          <p className="mt-3 text-sm text-center leading-relaxed" style={{ color: "#b8a898" }}>
            Answer a few quick questions so I can prepare for your free call and make sure it&apos;s worth your time.
          </p>

          <form onSubmit={submitQuestions} className="mt-8 space-y-7">
            {QUESTIONS.map((q, i) => (
              <div key={q.id}>
                <label className="block text-sm font-semibold leading-snug mb-3" style={{ color: "#f0ebe3" }}>
                  <span style={{ color: FIRE }}>{i + 1}. </span>{q.label}
                </label>

                {q.type === "textarea" && (
                  <textarea
                    rows={3}
                    required
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="input-field w-full resize-none rounded-sm px-4 py-3 text-sm font-sub leading-relaxed outline-none"
                  />
                )}

                {q.type === "text" && (
                  <input
                    type="text"
                    required
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="input-field w-full rounded-sm px-4 py-3 text-sm font-sub"
                  />
                )}

                {q.type === "radio" && (
                  <div className="space-y-2">
                    {q.options!.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswer(q.id, opt)}
                        className="w-full rounded-sm border px-4 py-3 text-left text-sm font-sub font-medium transition"
                        style={answers[q.id] === opt
                          ? { borderColor: FIRE, background: "rgba(184,40,24,0.12)", color: "#f5ebe3" }
                          : { borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", color: "#a89880" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            <div className="pt-2 border-t" style={{ borderColor: "#2e2010" }}>
              <p className="font-sub text-[10px] uppercase tracking-widest text-center mb-5" style={{ color: "#6b5c4d" }}>
                Last step — book your free call
              </p>
              <p className="text-sm text-center leading-relaxed mb-6" style={{ color: "#b8a898" }}>
                I prepare for every call. Once you submit, you&apos;ll be taken straight to my calendar to lock in your spot.
              </p>
              <button
                type="submit"
                disabled={!questionsValid()}
                className="w-full py-4 font-sub text-sm font-bold tracking-wider text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: `linear-gradient(160deg, #1a0602 0%, ${FIRE} 45%, #7a1810 100%)`, boxShadow: `0 4px 24px rgba(184,40,24,0.4)` }}>
                SUBMIT &amp; BOOK MY FREE CALL →
              </button>
              <p className="mt-2 text-center text-xs" style={{ color: "#4a3c30" }}>Free. No commitment. 15 minutes.</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* ── BOOKED ── */
  return (
    <div className="relative min-h-screen overflow-hidden px-5 py-16" style={{ background: "#0c0802" }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,40,24,0.1)_0%,transparent_60%)]" />
      <div className="relative mx-auto w-full max-w-2xl text-center">
        <p className="font-sub text-xs font-bold tracking-[0.3em]" style={{ color: FIRE }}>YOU&apos;RE A GOOD FIT</p>
        <h2 className="font-display mt-3 leading-none" style={{ fontSize: "clamp(2.2rem,10vw,3.5rem)", color: "#f0ebe3" }}>
          BOOK YOUR<br /><span style={{ color: FIRE }}>FREE CALL.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#b8a898" }}>
          Pick a time below. Dylan reviews your answers before every call so you&apos;re never starting from zero.
        </p>

        <div className="mt-8 overflow-hidden rounded-sm" style={{ border: `1.5px solid ${FIRE}` }}>
          <iframe
            src={BOOKING_URL}
            width="100%"
            height="700"
            frameBorder="0"
            style={{ display: "block", background: "#fff" }}
            title="Book a free call with Dylan"
          />
        </div>

        <Link href="/" className="mt-6 block text-xs" style={{ color: "#4a3c30" }}>← Back to site</Link>
      </div>
    </div>
  );
}
