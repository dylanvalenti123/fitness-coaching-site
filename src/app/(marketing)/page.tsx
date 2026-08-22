"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const FIRE = "#7a1810";

const stats = [
  { value: "30lbs", label: "Muscle Gained" },
  { value: "7", label: "Months To Transform" },
  { value: "1:1", label: "Personal Coaching" },
];

const features = [
  {
    title: "Custom Training",
    desc: "Programmed around your work schedule, your recovery, and your life. Adjusted every week.",
    icon: <DumbbellIcon />,
  },
  {
    title: "Food Photo Accountability",
    desc: "Send Dylan photos of what you eat. He reviews them and tells you exactly what you're doing good with and what to fix.",
    icon: <CameraIcon />,
  },
  {
    title: "Weekly Check-Ins",
    desc: "Direct 1 on 1 calls with Dylan, every week.",
    icon: <PhoneIcon />,
  },
  {
    title: "Form Checks",
    desc: "Send clips and get feedback. There's no guessing if you're doing it right.",
    icon: <TrendingUpIcon />,
  },
];

const struggles = [
  "I'm too busy with work to stay consistent",
  "I don't have a structured plan that fits my schedule",
  "I've been training but not seeing real progress",
  "I don't know how to eat to actually build muscle",
];

const coachingFeatures = [
  "Fully custom training program",
  "Send food photos: Dylan reviews them and gives real feedback",
  "Weekly nutrition overview (no complicated meal plan)",
  "Dylan's personal number: text him directly, anytime",
  "Weekly check-in calls & program adjustments",
  "Form review",
];

// Drop a transformation photo in /public/photos and set `photo` to its path
// (e.g. "/photos/testimonial-nick.jpg"). Cards fall back to a placeholder
// until then. Quotes are pending from each client — leave blank until real
// words come in, don't invent them.
const testimonials = [
  {
    quote: "",
    name: "Nick Christopher", duration: "4 weeks", initial: "N",
    photo: "/photos/nick-after-1.jpg" as string | undefined,
  },
  {
    quote: "",
    name: "Aidan", duration: "6 months", initial: "A",
    photo: undefined as string | undefined,
  },
  {
    quote: "",
    name: "Dash Page", duration: "4 months", initial: "D",
    photo: undefined as string | undefined,
  },
];

const faqs = [
  { q: <>Why Are <em>You</em> Able To Coach?</>, a: "No formal certification. My results are the proof. I took myself from 170 to 200lbs of muscle and built this program around the exact process that got me there, then refined it coaching real guys since. It's based on what's actually worked, not a textbook template." },
  { q: "I've tried training before but always fall off. How is this different?", a: "Accountability. You send Dylan photos of everything you eat throughout the day. He reviews them, tells you what's working, what isn't, and keeps you on track. The plan also adjusts weekly around your actual schedule — so when work gets busy, the program adapts instead of falling apart." },
  { q: "How long until I see results?", a: "Most guys see meaningful scale and strength movement in 4-6 weeks, and visible size change by 8-12 weeks. Bulking is months-long. Consistency matters more than intensity." },
  { q: "How much does coaching cost?", a: "There's no set price. Every plan is custom based on your goals, timeline, and how much hands-on support you want. Pricing gets confirmed on your free call once Dylan understands what you're looking for." },
  { q: "What happens on the free call?", a: "Dylan reviews your situation, explains the program in detail, and maps out what your plan would actually look like. No pressure, just a conversation to see if it's the right fit." },
];

function Dots({ count = 8, color = "rgba(122,24,16,0.45)" }: { count?: number; color?: string }) {
  const all = [
    { top: "8%", left: "5%" }, { top: "18%", left: "92%" },
    { top: "42%", left: "2%" }, { top: "60%", left: "96%" },
    { top: "76%", left: "7%" }, { top: "12%", left: "70%" },
    { top: "55%", left: "85%" }, { top: "88%", left: "48%" },
    { top: "32%", left: "55%" }, { top: "68%", left: "25%" },
  ].slice(0, count);
  return (
    <>
      {all.map((pos, i) => (
        <div
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
          style={{ ...pos, background: color }}
        />
      ))}
    </>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" style={{ fill: FIRE }} className="h-4 w-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Feature icons (line style, replaces emoji) ── */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: FIRE,
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

function DumbbellIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 9v6M2 10.5v3M20 9v6M22 10.5v3" />
      <path d="M7 8.5v7a1 1 0 001 1h1a1 1 0 001-1v-7a1 1 0 00-1-1H8a1 1 0 00-1 1zM14 8.5v7a1 1 0 001 1h1a1 1 0 001-1v-7a1 1 0 00-1-1h-1a1 1 0 00-1 1z" />
      <path d="M10 12h4" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 8a2 2 0 012-2h1.2a2 2 0 001.66-.89l.28-.42A2 2 0 0110.8 4h2.4a2 2 0 011.66.89l.28.42A2 2 0 0016.8 6H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
      <circle cx="12" cy="13.2" r="3.1" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 4.7a1 1 0 00-1-1H5.3a1 1 0 00-1 1.1c.3 2.9 1.5 5.6 3.5 7.7 2 2.1 4.6 3.3 7.4 3.6a1 1 0 001.1-1V13a1 1 0 00-1-1c-.9 0-1.9-.2-2.7-.5a1 1 0 00-1.1.2l-.9 1a10.6 10.6 0 01-4.4-4.5l1-1a1 1 0 00.2-1c-.3-.9-.5-1.8-.5-2.7z" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg {...iconProps}>
      <polyline points="3 17 9.5 10.5 13.5 14.5 21 6.5" />
      <polyline points="15 6.5 21 6.5 21 12.5" />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg {...iconProps} stroke="rgba(122,24,16,0.5)" className="h-7 w-7">
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16l-5.5-5.5a1 1 0 00-1.4 0L6 18.5" />
    </svg>
  );
}

/* ── Neon Silhouette (actual image) ── */
function NeonSilhouette() {
  return (
    <div className="relative mx-auto flex max-w-[520px] items-center justify-center">
      {/* Outer ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(122,24,16,0.18) 0%, rgba(122,24,16,0.06) 50%, transparent 72%)",
          boxShadow: "0 0 120px 40px rgba(122,24,16,0.12)",
        }}
      />
      {/* Image */}
      <div
        className="relative h-[420px] w-[420px] overflow-hidden rounded-full sm:h-[500px] sm:w-[500px]"
        style={{
          boxShadow: "0 0 0 2px rgba(122,24,16,0.5), 0 0 60px rgba(122,24,16,0.25)",
        }}
      >
        <Image
          src="/photos/dylan-logo.jpg"
          alt="Dylan Valenti"
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 640px) 420px, 500px"
        />
      </div>
      {/* Badges */}
      <div
        className="absolute right-0 top-[25%] flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-sub font-semibold"
        style={{
          background: "rgba(12,8,2,0.88)",
          border: "1px solid rgba(122,24,16,0.45)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 16px rgba(122,24,16,0.25)",
          color: "#f0ebe3",
        }}
      >
        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: FIRE }} />
        +30lbs Muscle
      </div>
      <div
        className="absolute bottom-[25%] left-0 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-sub font-semibold"
        style={{
          background: "rgba(12,8,2,0.88)",
          border: "1px solid rgba(122,24,16,0.45)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 16px rgba(122,24,16,0.25)",
          color: "#f0ebe3",
        }}
      >
        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: FIRE }} />
        Coach Dylan V.
      </div>
    </div>
  );
}

/* ── Portrait in glowing circle ── */
function NeonPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto flex max-w-[500px] items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(122,24,16,0.15) 0%, transparent 70%)",
          boxShadow: "0 0 120px 30px rgba(122,24,16,0.1)",
        }}
      />
      <div
        className="relative h-[400px] w-[400px] overflow-hidden rounded-full sm:h-[460px] sm:w-[460px]"
        style={{
          boxShadow: `0 0 0 2px ${FIRE}, 0 0 50px rgba(122,24,16,0.3), inset 0 0 80px rgba(0,0,0,0.5)`,
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover" style={{ objectPosition: "60% center" }} sizes="460px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0802]/70 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function AccordionFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ borderTop: "1px solid #2e2010" }}>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: "1px solid #2e2010" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="font-sub text-base font-medium" style={{ color: "#f0ebe3" }}>{faq.q}</span>
            <span
              className="ml-4 shrink-0 text-2xl font-light transition-transform duration-200"
              style={{ color: FIRE, transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
            >+</span>
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed" style={{ color: "#b8a898" }}>{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const silhouetteRef   = useRef<HTMLDivElement>(null);
  const beachImgRef     = useRef<HTMLDivElement>(null);
  const beforeAfterRef  = useRef<HTMLDivElement>(null);
  const resultsHeadRef  = useRef<HTMLDivElement>(null);
  const howItWorksRef   = useRef<HTMLDivElement>(null);
  const socialProofRef  = useRef<HTMLDivElement>(null);
  const plansRef        = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef          = useRef<HTMLDivElement>(null);
  const finalCtaRef     = useRef<HTMLDivElement>(null);
  const benchImgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallax = (el: HTMLDivElement | null, speed: number) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };

    const handleScroll = () => {
      const y = window.scrollY;
      if (silhouetteRef.current) {
        silhouetteRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
      parallax(beachImgRef.current,     0.18);
      parallax(beforeAfterRef.current,  0.12);
      parallax(resultsHeadRef.current,  0.10);
      parallax(howItWorksRef.current,   0.10);
      parallax(socialProofRef.current,  0.10);
      parallax(plansRef.current,        0.10);
      parallax(testimonialsRef.current, 0.10);
      parallax(faqRef.current,          0.08);
      parallax(finalCtaRef.current,     0.12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("bench-visible");
          } else {
            e.target.classList.remove("bench-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (benchImgRef.current) observer.observe(benchImgRef.current);
    document.querySelectorAll(".fade-in-block").forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "#0c0802", position: "relative", overflow: "hidden", minHeight: "90vh" }}>
        {/* Silhouette — full background, right-anchored on desktop, centered on mobile */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-8">
          <div ref={silhouetteRef} className="relative h-[700px] w-[700px] shrink-0 opacity-90 lg:h-[800px] lg:w-[800px]" style={{ willChange: "transform" }}>
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(122,24,16,0.12) 0%, rgba(122,24,16,0.04) 50%, transparent 72%)" }}
            />
            <div
              className="relative h-full w-full overflow-hidden rounded-full"
              style={{ boxShadow: "0 0 0 1px rgba(122,24,16,0.4)" }}
            >
              <Image src="/photos/silhouette-hero.png" alt="Dylan Valenti" fill priority className="object-cover object-center" sizes="800px" />
            </div>
          </div>
        </div>

        {/* Dark overlay so text is readable on mobile */}
        <div className="pointer-events-none absolute inset-0 lg:hidden" style={{
          background: "linear-gradient(to right, rgba(12,8,2,0.85) 0%, rgba(12,8,2,0.6) 60%, rgba(12,8,2,0.1) 100%)",
        }} />
        {/* Desktop left-side overlay */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" style={{
          background: "linear-gradient(to right, rgba(12,8,2,1) 20%, rgba(12,8,2,0.7) 55%, rgba(12,8,2,0.0) 75%)",
        }} />

        <Dots count={8} />

        {/* Credential tag */}
        <div
          className="absolute bottom-[28%] right-[10%] z-10 hidden items-center gap-2 border-l-2 pl-3 text-xs font-sub font-semibold uppercase tracking-wider lg:flex"
          style={{ borderColor: FIRE, color: "#b8a898" }}
        >
          Coach Dylan V. · Helping Busy Men Build Muscle
        </div>

        {/* Text content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pb-32 sm:pt-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: FIRE }} />
              <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>
                1-ON-1 ONLINE COACHING FOR BUSY MEN
              </p>
            </div>
            <h1 className="font-display mt-6 leading-[0.95]" style={{ fontSize: "clamp(3.5rem,8.5vw,7rem)", color: "#f0ebe3" }}>
              BUILD MUSCLE<br />
              <span style={{ color: FIRE }}>WITHOUT LIVING</span><br />
              IN THE GYM.
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed" style={{ color: "#b8a898" }}>
              You&apos;re busy. Work, responsibilities, life... the gym keeps getting pushed back.
              This program is built around YOUR schedule, not the other way around. Structured training,
              real accountability, and a coach who will get you to your goals.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary">BOOK YOUR FREE CALL →</Link>
              <Link href="/apply" className="btn-outline">APPLY NOW</Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 pt-10" style={{ borderTop: "1px solid #2e2010" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display leading-none" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: FIRE }}>{s.value}</p>
                  <p className="mt-2 text-xs tracking-wider" style={{ color: "#b8a898" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── THE COACH ── */}
      <section id="program" style={{ background: "#1a1208", position: "relative", overflow: "hidden" }}>
        <Dots count={8} />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10 sm:pt-32 sm:pb-12">
          {/* Before / After above everything */}
          <div ref={beforeAfterRef} className="mb-14 flex gap-2 overflow-hidden rounded-sm mx-auto" style={{ maxWidth: 500, willChange: "transform" }}>
            <div className="relative flex-1 aspect-[3/4] overflow-hidden">
              <Image src="/photos/dylan-before-new.jpg" alt="Before" fill className="object-cover" style={{ objectPosition: "center 20%" }} sizes="250px" />
              <div className="absolute bottom-0 left-0 right-0 py-2 text-center font-sub text-[11px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.8)", color: "#b8a898" }}>BEFORE · 170 LBS</div>
            </div>
            <div className="relative flex-1 aspect-[3/4] overflow-hidden">
              <Image src="/photos/dylan-after-2.jpg" alt="After" fill className="object-cover" style={{ objectPosition: "center 20%", transform: "scale(1.3)", transformOrigin: "center 20%" }} sizes="250px" />
              <div className="absolute bottom-0 left-0 right-0 py-2 text-center font-sub text-[11px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.8)", color: "#f0ebe3" }}>AFTER · 200 LBS</div>
            </div>
          </div>
          {/* Story block — beach photo as background */}
          <div className="relative overflow-hidden rounded-sm">
            <div ref={beachImgRef} className="absolute inset-[-15%]" style={{ willChange: "transform" }}>
              <Image
                src="/photos/dylan-arms-crossed.jpg"
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: "center center" }}
                sizes="1200px"
              />
            </div>
            {/* Dark overlay so text is readable */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,8,2,0.75) 0%, rgba(12,8,2,0.4) 40%, rgba(12,8,2,0.75) 100%)" }} />
            <div className="relative px-10 py-16 sm:px-16 sm:py-20 max-w-2xl">
              <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>THE COACH</p>
              <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(2.8rem,6.5vw,5rem)", color: "#f0ebe3" }}>
                MOST PROGRAMS AREN&apos;T BUILT FOR YOUR LIFE.
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "#d4c8b8" }}>
                Most busy guys aren&apos;t failing because they&apos;re lazy. They&apos;re failing because their program doesn&apos;t fit their life.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#d4c8b8" }}>
                I fixed that. Custom online training, nutrition accountability, and weekly adjustments built around your schedule, not the other way around.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="card rounded-sm p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm" style={{ background: "rgba(122,24,16,0.12)" }}>
                  {f.icon}
                </div>
                <h3 className="font-sub mt-3 text-sm font-semibold" style={{ color: "#f0ebe3" }}>{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "#b8a898" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#1a1208", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0">
          <Image src="/photos/dylan-gym-curl.jpg" alt="" fill className="object-cover" style={{ objectPosition: "30% center", opacity: 0.75, filter: "blur(1px) brightness(0.75)" }} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% center, transparent 20%, rgba(26,18,8,0.85) 70%)" }} />
        </div>
        <Dots count={6} />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10 sm:pt-32 sm:pb-12">
          <div className="max-w-2xl">
            <div>
              <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>THE PROCESS</p>
              <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#f0ebe3" }}>
                HOW IT ACTUALLY WORKS.
              </h2>
              <div className="mt-12 space-y-10">
                {[
                  { num: "01", title: "Free Call", body: "We talk about where you're at, what you've tried, and what your goal actually looks like. No pitch, just a real conversation to see if it's the right fit." },
                  { num: "02", title: "Custom Training Plan Built", body: "Dylan builds your training program from scratch around your body, your schedule, and your recovery. Nothing generic." },
                  { num: "03", title: "Food Photo Check-Ins", body: "Snap and send Dylan photos of what you eat. He reviews them, gives you real feedback, and sends a weekly nutrition overview. No complicated meal plan, just honest accountability that works." },
                  { num: "04", title: "Weekly Check-In Call", body: "Every week you hop on a call with Dylan and review your progress. Dylan knows what works, so if something needs to change, it gets changed." },
                ].map((step) => (
                  <div key={step.num} className="flex gap-6">
                    <div className="shrink-0">
                      <p className="font-display leading-none" style={{ fontSize: "3rem", color: "rgba(122,24,16,0.7)" }}>{step.num}</p>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-sub text-base font-bold" style={{ color: "#f0ebe3" }}>{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#b8a898" }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/apply" className="btn-primary mt-12 inline-block">START THE PROCESS →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS GALLERY ── */}
      <section style={{ background: "#1a1208", position: "relative", overflow: "hidden" }}>
        <Dots count={6} />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div ref={resultsHeadRef} className="text-center mb-14" style={{ willChange: "transform" }}>
            <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>CLIENT TRANSFORMATIONS</p>
            <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#f0ebe3" }}>
              REAL RESULTS FROM REAL PEOPLE.
            </h2>
          </div>
          {/* 1 — Aidan back */}
          <div className="mb-10 fade-in-block">
            <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>AIDAN — 6 MONTHS</p>
            <div className="flex gap-3 lg:gap-5">
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid #2e2010" }}>
                <Image src="/photos/aidan-before-2b.jpg" alt="Aidan before" fill className="object-cover object-top" sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}>BEFORE</div>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/aidan-after-2b.jpg" alt="Aidan after" fill className="object-cover object-top" sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.75)", color: "#f0ebe3" }}>AFTER</div>
              </div>
            </div>
            <div className="mt-5 rounded-sm px-5 py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "#b8a898" }}>
                &ldquo;Before coaching, I was training hard but getting nowhere. In just six months, I built more muscle than I ever thought possible. The personalized workouts, nutrition guidance, and weekly accountability made all the difference.&rdquo;
              </p>
              <p className="mt-3 font-sub text-[10px] font-bold tracking-[0.2em]" style={{ color: FIRE }}>— AIDAN</p>
            </div>
          </div>

          {/* 2 — Dash 1 + quote */}
          <div className="mb-10 fade-in-block">
            <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>DASH P. — 4 MONTHS</p>
            <div className="flex gap-3 lg:gap-5">
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid #2e2010" }}>
                <Image src="/photos/dash-before-1.jpg" alt="Dash before" fill className="object-cover object-top" sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}>BEFORE</div>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/dash-after-1b.jpg" alt="Dash after" fill className="object-cover" style={{ objectPosition: "center 15%" }} sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.75)", color: "#f0ebe3" }}>AFTER</div>
              </div>
            </div>
            <div className="mt-5 rounded-sm px-5 py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-sub text-[10px] font-bold tracking-[0.25em] mb-3" style={{ color: FIRE }}>WHAT CHANGED IN 4 MONTHS</p>
              <div className="flex gap-3 flex-wrap mb-4">
                {["Way bigger", "Way stronger", "Way more confident"].map((item) => (
                  <span key={item} className="font-display text-lg leading-tight" style={{ color: "#f0ebe3" }}>
                    {item}<span style={{ color: FIRE }}> ·</span>
                  </span>
                ))}
              </div>
              <blockquote className="border-l-2 pl-4" style={{ borderColor: FIRE }}>
                <p className="text-sm leading-relaxed" style={{ color: "#c8b8a8" }}>
                  "The thing that I found the best was when my little siblings, friends, and girls started to respect me more. That&apos;s what this is really about."
                </p>
                <p className="mt-2 font-sub text-[10px] font-bold tracking-widest" style={{ color: "#6b5c4d" }}>— DASH P.</p>
              </blockquote>
            </div>
          </div>

          {/* CTA between transformations */}
          <div className="my-10 text-center">
            <a
              href="/free"
              className="inline-block font-sub text-sm font-bold tracking-[0.2em] px-8 py-4"
              style={{ background: FIRE, color: "#f0ebe3" }}
            >
              BOOK YOUR FREE CALL
            </a>
          </div>

          {/* 3 — Aidan front */}
          <div className="mb-10 fade-in-block">
            <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>AIDAN — 6 MONTHS</p>
            <div className="flex gap-3 lg:gap-5">
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid #2e2010" }}>
                <Image src="/photos/aidan-before-1b.jpg" alt="Aidan before" fill className="object-cover" style={{ objectPosition: "center 20%" }} sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}>BEFORE</div>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/aidan-after-1b.jpg" alt="Aidan after" fill className="object-cover" style={{ objectPosition: "center 20%" }} sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.75)", color: "#f0ebe3" }}>AFTER</div>
              </div>
            </div>
          </div>

          {/* 4 — Dash 2 */}
          <div className="mb-10 fade-in-block">
            <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>DASH P. — 4 MONTHS</p>
            <div className="flex gap-3 lg:gap-5">
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid #2e2010" }}>
                <Image src="/photos/dash-before-2.jpg" alt="Dash before" fill className="object-cover object-top" sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}>BEFORE</div>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/dash-after-2.jpg" alt="Dash after" fill className="object-cover" style={{ objectPosition: "center 15%" }} sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.75)", color: "#f0ebe3" }}>AFTER</div>
              </div>
            </div>
          </div>

          {/* 5 — Nick C. */}
          <div className="fade-in-block">
            <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>NICK C. — 4 WEEKS</p>
            <div className="flex gap-3 lg:gap-5">
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid #2e2010" }}>
                <Image src="/photos/nick-before-1.jpg" alt="Nick before" fill className="object-cover object-top" sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}>BEFORE</div>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/nick-after-1.jpg" alt="Nick after" fill className="object-cover object-top" sizes="400px" />
                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[10px] font-bold tracking-widest" style={{ background: "rgba(184,40,24,0.75)", color: "#f0ebe3" }}>AFTER</div>
              </div>
            </div>
            <div className="mt-5 rounded-sm px-5 py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-sub text-[10px] font-bold tracking-[0.25em] mb-3" style={{ color: FIRE }}>WHAT CHANGED IN 4 WEEKS</p>
              <div className="flex gap-3 flex-wrap">
                {["Diet improved", "Cut fat", "Energy up", "Focus sharper", "Quality of life better", "Only getting better"].map((item, i, arr) => (
                  <span key={item} className="font-display text-lg leading-tight" style={{ color: "#f0ebe3" }}>
                    {item}{i < arr.length - 1 && <span style={{ color: FIRE }}> ·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* 6 — Div */}
          <div className="mt-10 fade-in-block">
            <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>DIV — 2 MONTHS</p>

            {/* Headline stat */}
            <div className="mb-6 rounded-sm px-5 py-5" style={{ background: "rgba(122,24,16,0.08)", border: "1px solid rgba(122,24,16,0.3)" }}>
              <p className="font-display leading-tight" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#f0ebe3" }}>
                115 → 150 LBS BENCH<br /><span style={{ color: FIRE }}>IN 2 MONTHS.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#b8a898" }}>
                Div&apos;s bench was stuck at 115. The problem wasn&apos;t his chest — his triceps were giving out at lockout. Dylan identified it, built dedicated tricep work into his program, and two months later Div hit 150 for 2 reps.
              </p>
            </div>

            {/* 4-photo grid */}
            <div className="grid grid-cols-4 gap-2">
              <div className="relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid #2e2010" }}>
                <Image src="/photos/div-gym-1.jpg" alt="Div benching 150lbs" fill className="object-cover" style={{ objectPosition: "center 60%" }} sizes="150px" />
                <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[8px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.8)", color: "#b8a898" }}>150 LB PR</div>
              </div>
              <div className="relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/div-gym-2c.jpg" alt="Div tricep work" fill className="object-cover object-top" sizes="150px" />
                <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[8px] font-bold tracking-widest" style={{ background: "rgba(122,24,16,0.75)", color: "#f0ebe3" }}>TRICEPS</div>
              </div>
              <div className="relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/div-gym-3c.jpg" alt="Div training" fill className="object-cover object-top" sizes="150px" />
                <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[8px] font-bold tracking-widest" style={{ background: "rgba(122,24,16,0.75)", color: "#f0ebe3" }}>LOCKED IN</div>
              </div>
              <div className="relative overflow-hidden rounded-sm aspect-[3/4]" style={{ border: "1px solid rgba(122,24,16,0.6)" }}>
                <Image src="/photos/div-bench-2.jpg" alt="Div flexing" fill className="object-cover" style={{ objectPosition: "center top" }} sizes="150px" />
                <div className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[8px] font-bold tracking-widest" style={{ background: "rgba(122,24,16,0.75)", color: "#f0ebe3" }}>STILL GOING</div>
              </div>
            </div>

            <p className="mt-4 text-center font-sub text-xs font-semibold tracking-[0.2em]" style={{ color: "#6b5c4d" }}>HE&apos;LL BE AT 185 SOON.</p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAND ── */}
      <div style={{ background: FIRE }} className="py-5">
        <div ref={socialProofRef} className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-10 px-6 text-center" style={{ willChange: "transform" }}>
          {["BUILT AROUND YOUR SCHEDULE", "REAL RESULTS, NOT GUESSWORK", "COACHING THAT ACTUALLY ADJUSTS"].map((t, i) => (
            <>
              {i > 0 && <div key={`d${i}`} className="hidden h-4 w-px sm:block" style={{ background: "rgba(255,255,255,0.3)" }} />}
              <p key={t} className="font-sub text-sm font-bold tracking-[0.2em] text-white">{t}</p>
            </>
          ))}
        </div>
      </div>
      {/* ── STRUGGLE QUIZ TEASER ── */}
      <section style={{ background: "#0c0802", position: "relative", overflow: "hidden" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(122,24,16,0.07) 0%, transparent 65%)" }} />
        <Dots count={6} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>FREE CONSULTATION</p>
          <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(2.8rem,7vw,5rem)", color: "#f0ebe3" }}>
            WHAT&apos;S YOUR BIGGEST STRUGGLE RIGHT NOW?
          </h2>
          <p className="mt-5 text-[15px]" style={{ color: "#b8a898" }}>
            Answer a few quick questions so Dylan can review your situation before your call. It takes under a minute.
          </p>
          <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {[...struggles, "Other (tell us)"].map((s, i) => (
              <Link
                key={s}
                href="/apply"
                className={`rounded-sm px-6 py-4 font-sub text-sm font-medium transition cursor-pointer${i === struggles.length ? " sm:col-span-2" : ""}`}
                style={{ border: "1.5px solid rgba(240,235,227,0.18)", background: "#1a1208", color: "#f0ebe3" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = FIRE; e.currentTarget.style.color = FIRE; e.currentTarget.style.background = "rgba(122,24,16,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,235,227,0.18)"; e.currentTarget.style.color = "#f0ebe3"; e.currentTarget.style.background = "#1a1208"; }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ── TYLER TRAINING PHOTOS ── */}
      <section style={{ background: "#0c0802", position: "relative" }}>
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-0">
          <p className="font-sub text-xs font-semibold tracking-[0.25em] mb-4" style={{ color: FIRE }}>TYLER — 1-1 SESSION</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
              <Image src="/photos/tyler-2243v3.jpg" alt="Tyler chest press" fill className="object-cover object-top" sizes="400px" />
              <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[9px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.85)", color: "#f0ebe3" }}>CHEST PRESS</div>
            </div>
            <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
              <Image src="/photos/tyler-2248v2.jpg" alt="Tyler incline bench" fill className="object-cover" style={{ objectPosition: "center 20%" }} sizes="400px" />
              <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[9px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.85)", color: "#f0ebe3" }}>INCLINE BENCH</div>
            </div>
            <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
              <Image src="/photos/tyler-2257b.jpg" alt="Tyler curls" fill className="object-cover object-top" sizes="400px" />
              <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-sub text-[9px] font-bold tracking-widest" style={{ background: "rgba(12,8,2,0.85)", color: "#f0ebe3" }}>INCLINE CURLS</div>
            </div>
          </div>
          <p className="text-base leading-relaxed mt-6 max-w-2xl" style={{ color: "#b8a898" }}>
            Tyler came into the gym nervous and unstructured. We ran my full chest and biceps program. I coached him through every set. By the end of the session he had a program, a plan, and knew exactly how to train.
          </p>
        </div>
      </section>
      <div style={{ background: "#0c0802", height: "80px" }} />
      {/* ── 315 BENCH ── */}
      <section style={{ background: "#0c0802", position: "relative", overflow: "hidden" }}>
        <div className="relative mx-auto max-w-lg px-6 pb-24">
          <style>{`.bench-fade, .fade-in-block { opacity: 0; transform: translateY(16px); transition: opacity 1s ease, transform 1s ease; } .bench-visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
          <div ref={benchImgRef} className="bench-fade overflow-hidden rounded-sm relative" style={{ aspectRatio: "3/4", border: "1px solid rgba(122,24,16,0.4)" }}>
            <Image src="/photos/dylan-bench-315.jpg" alt="Dylan benching 315lbs" fill className="object-cover" style={{ objectPosition: "center 30%" }} sizes="500px" />
            <div className="absolute bottom-0 left-0 right-0 py-2.5 text-center font-sub text-[11px] font-bold tracking-widest" style={{ background: "rgba(122,24,16,0.85)", color: "#f0ebe3" }}>315 LBS BENCH PRESS</div>
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" style={{ background: "#1a1208", position: "relative", overflow: "hidden" }}>
        <Dots count={8} />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div ref={plansRef} className="text-center" style={{ willChange: "transform" }}>
            <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>THE COACHING</p>
            <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(2.8rem,7vw,5rem)", color: "#f0ebe3" }}>
              ONE PROGRAM.<br />BUILT FOR YOU.
            </h2>
          </div>
          <div className="mt-14 mx-auto max-w-lg">
            <div className="relative overflow-hidden rounded-sm p-8 sm:p-10"
              style={{
                background: "#251a0a",
                border: `1.5px solid ${FIRE}`,
                boxShadow: `0 0 0 1px rgba(122,24,16,0.2), 0 0 60px rgba(122,24,16,0.1)`,
              }}
            >
              <div className="absolute right-0 top-0 px-4 py-1 font-sub text-[10px] font-bold tracking-widest text-white"
                style={{ background: FIRE }}>
                LIMITED SPOTS
              </div>
              <h3 className="font-display text-4xl sm:text-5xl" style={{ color: "#f0ebe3" }}>1-on-1 Coaching</h3>
              <p className="mt-4 font-sub text-xs font-semibold" style={{ color: FIRE }}>Pricing confirmed on your free call</p>
              <ul className="mt-6 space-y-3">
                {coachingFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#b8a898" }}>
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: FIRE }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/apply" className="btn-plan btn-plan-fire mt-8">
                APPLY NOW
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ── PRE-FAQ CTA ── */}
      <section style={{ background: "#0c0802", position: "relative", overflow: "hidden" }} className="py-28 text-center sm:py-36">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(122,24,16,0.1) 0%, transparent 60%)" }} />
        <Dots count={8} />
        <div className="relative mx-auto max-w-2xl px-6">
          <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>FREE CONSULTATION</p>
          <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(3.5rem,9vw,6.5rem)", color: "#f0ebe3" }}>
            BOOK YOUR FREE CALL.
          </h2>
          <p className="mt-5 text-[15px]" style={{ color: "#b8a898" }}>
            Answer a few quick questions so Dylan can review your situation before your call. It takes under a minute.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/apply" className="btn-primary">BOOK YOUR FREE CALL</Link>
            <Link href="/apply" className="btn-outline">APPLY NOW</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: "#1a1208", position: "relative", overflow: "hidden" }}>
        <Dots count={6} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <div ref={faqRef} style={{ willChange: "transform" }}>
          <div className="text-center">
            <p className="font-sub text-xs font-semibold tracking-[0.25em]" style={{ color: FIRE }}>QUESTIONS</p>
            <h2 className="font-display mt-4 leading-[0.95]" style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#f0ebe3" }}>
              FREQUENTLY ASKED.
            </h2>
          </div>
          <div className="mt-14"><AccordionFAQ /></div>
          </div>
        </div>
      </section>
    </>
  );
}
