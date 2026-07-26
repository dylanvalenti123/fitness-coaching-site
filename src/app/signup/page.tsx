import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignupForm } from "./signup-form";

const FIRE = "#7a1810";

const benefits = [
  {
    title: "7-day free trial",
    description: "Full access to everything, no payment required to start.",
  },
  {
    title: "Dylan's bulking split & food guide",
    description: "The exact approach that got 40 lbs of mostly-muscle gain in a year.",
  },
  {
    title: "Progress tracking dashboard",
    description: "Log weight, lifts, and photos, plus the AI calorie tracker, form analyzer, and recipe creator as they roll out.",
  },
  {
    title: "Streaks & badges",
    description: "Build a daily logging streak and unlock badges as you stay consistent.",
  },
  {
    title: "Cancel anytime",
    description: "No contracts. Stay as long as it's working for you.",
  },
];

export default function SignupPage() {
  return (
    <main className="flex min-h-screen bg-forge">
      <div className="hidden flex-1 flex-col justify-center border-r border-forge-4 px-12 py-16 lg:flex">
        <Link href="/" className="mb-12 flex items-center gap-3">
          <div
            className="relative h-9 w-9 overflow-hidden rounded-full"
            style={{ boxShadow: "0 0 10px rgba(122,24,16,0.4)" }}
          >
            <Image src="/photos/dylan-logo.jpg" alt="Dylan Valenti" fill className="object-cover" sizes="36px" />
          </div>
          <span className="font-sub text-sm font-light tracking-[0.2em] text-warm">
            DYLAN<span className="font-bold">VALENTI</span>
          </span>
        </Link>
        <p className="font-sub text-xs font-semibold tracking-[0.3em]" style={{ color: FIRE }}>
          1-ON-1 COACHING
        </p>
        <h1 className="font-display mt-4 max-w-md text-[clamp(2rem,4vw,3rem)] leading-none text-warm">
          EVERYTHING YOU NEED TO START BULKING THE RIGHT WAY.
        </h1>
        <div className="mt-10 max-w-md space-y-6">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-3">
              <span className="mt-1.5 h-px w-4 shrink-0" style={{ background: FIRE }} />
              <div>
                <p className="font-medium text-warm">{b.title}</p>
                <p className="mt-1 text-sm text-warm-muted">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div
              className="relative h-9 w-9 overflow-hidden rounded-full"
              style={{ boxShadow: "0 0 10px rgba(122,24,16,0.4)" }}
            >
              <Image src="/photos/dylan-logo.jpg" alt="Dylan Valenti" fill className="object-cover" sizes="36px" />
            </div>
            <span className="font-sub text-sm font-light tracking-[0.2em] text-warm">
              DYLAN<span className="font-bold">VALENTI</span>
            </span>
          </Link>
          <div className="border border-forge-4 bg-forge-2 p-8">
            <h1 className="font-display mb-2 text-center text-3xl leading-none text-warm">
              CREATE YOUR ACCOUNT
            </h1>
            <p className="mb-6 text-center text-sm text-warm-muted">
              Start your 7-day free trial, no payment required.
            </p>
            <Suspense>
              <SignupForm />
            </Suspense>
          </div>
          <p className="mt-4 text-center text-sm text-warm-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-warm underline hover:text-warm/80">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
