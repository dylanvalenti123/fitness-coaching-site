import Link from "next/link";
import Image from "next/image";

export async function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-forge/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full" style={{ boxShadow: "0 0 12px rgba(122,24,16,0.4)" }}>
            <Image src="/photos/dylan-logo.jpg" alt="Dylan Valenti" fill className="object-cover" sizes="40px" />
          </div>
          <span className="font-sub text-base font-light tracking-[0.2em] text-warm">
            DYLAN<span className="font-bold">VALENTI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 sm:flex">
          <div className="flex gap-8 font-sub text-xs font-medium tracking-[0.15em] text-warm/70">
            <Link href="/#program" className="transition hover:text-fire">PROGRAM</Link>
            <Link href="/#results" className="transition hover:text-fire">RESULTS</Link>
            <Link href="/pricing" className="transition hover:text-fire">PLANS</Link>
            <Link href="/#faq" className="transition hover:text-fire">FAQ</Link>
          </div>
          <Link
            href="/apply"
            className="border border-[rgba(122,24,16,0.3)] bg-[#22110a] px-5 py-2.5 font-sub text-xs font-bold tracking-widest text-warm transition hover:border-[rgba(122,24,16,0.6)] hover:bg-[#2c1810]"
          >
            BOOK A CALL
          </Link>
        </div>

        {/* Mobile */}
        <Link
          href="/apply"
          className="border border-[rgba(122,24,16,0.3)] bg-[#22110a] px-4 py-2 font-sub text-xs font-bold tracking-widest text-warm sm:hidden"
        >
          Book A Call
        </Link>
      </nav>
    </header>
  );
}
