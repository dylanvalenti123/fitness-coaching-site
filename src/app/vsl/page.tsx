import Image from "next/image";

const RESULTS = [
  {
    name: "Aidan",
    result: "+18 lbs of muscle in 4 months",
    before: "/photos/aidan-before-2b.jpg",
    after: "/photos/aidan-after-2b.jpg",
  },
  {
    name: "Dash",
    result: "Lean bulk in 4 months",
    before: "/photos/dash-before-2.jpg",
    after: "/photos/dash-after-2.jpg",
  },
  {
    name: "Nick",
    result: "Full physique transformation",
    before: "/photos/nick-before-1.jpg",
    after: "/photos/nick-after-1.jpg",
  },
];

// Replace with your actual YouTube video ID
const YOUTUBE_VIDEO_ID = "9fFSTeO06QE";

export default function VSLPage() {
  return (
    <div className="bg-forge text-warm min-h-screen">

      {/* ── HERO / VIDEO SECTION ── */}
      <section className="px-6 pt-16 pb-12 text-center max-w-3xl mx-auto">

        <p className="font-sub text-xs font-bold tracking-[0.3em] text-fire mb-4">
          WATCH THIS FIRST
        </p>

        <h1 className="font-display text-[clamp(2.4rem,7vw,5rem)] leading-none text-warm mb-4">
          I GAINED 40 LBS OF MUSCLE.<br />
          HERE&apos;S EXACTLY<br />
          HOW I DID IT.
        </h1>

        <p className="text-sm text-warm-muted max-w-xl mx-auto leading-relaxed mb-10">
          I went from 160 lbs with no real structure to 200 lbs with a program built around my life.
          Watch the breakdown below.
        </p>

        {/* YouTube embed */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
            title="Dylan Valenti — How I Gained 30 lbs of Muscle"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          />
        </div>

        {/* Calendly below video */}
        <div className="mt-10 text-left">
          <p className="font-sub text-xs font-bold tracking-[0.3em] text-fire mb-2 text-center">BOOK YOUR CALL</p>
          <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] leading-none text-warm mb-3 text-center">
            READY TO START?
          </h2>
          <p className="text-sm text-warm-muted mb-6 text-center">
            Pick a time below. Dylan reviews every booking personally.
          </p>
          <div className="overflow-hidden rounded-sm border border-forge-4">
            <iframe
              src="https://calendly.com/dylanvalenti123/30min?embed_domain=dylanvalenticoaching.com&embed_type=Inline"
              style={{ border: 0, width: "100%", height: "700px" }}
              frameBorder="0"
            />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-forge-4 mx-6" />

      {/* ── RESULTS SECTION ── */}
      <section className="px-6 py-16 max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <p className="font-sub text-xs font-bold tracking-[0.3em] text-fire mb-2">
            CLIENT RESULTS
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-warm">
            MEN WHO PUT IN THE WORK.
          </h2>
          <p className="mt-3 text-sm text-warm-muted">
            Real guys. Real schedules. Real results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {RESULTS.map((r) => (
            <div key={r.name} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                  <Image
                    src={r.before}
                    alt={`${r.name} before`}
                    fill
                    className="object-cover object-top"
                    sizes="250px"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[9px] font-bold tracking-widest"
                    style={{ background: "rgba(12,8,2,0.75)", color: "#b8a898" }}
                  >
                    BEFORE
                  </div>
                </div>
                <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                  <Image
                    src={r.after}
                    alt={`${r.name} after`}
                    fill
                    className="object-cover object-top"
                    sizes="250px"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 py-1 text-center font-sub text-[9px] font-bold tracking-widest"
                    style={{ background: "rgba(184,40,24,0.8)", color: "#f0ebe3" }}
                  >
                    AFTER
                  </div>
                </div>
              </div>
              <div>
                <p className="font-sub text-xs font-bold tracking-widest text-fire">
                  {r.name.toUpperCase()}
                </p>
                <p className="mt-0.5 text-sm font-medium text-warm">{r.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
