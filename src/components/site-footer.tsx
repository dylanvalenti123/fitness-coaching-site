import Link from "next/link";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="border-t border-forge-4 bg-forge-2">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="font-sub text-sm font-bold tracking-wider text-warm">
          DYLAN<span className="text-fire">VALENTI</span>
        </div>
        <div className="flex gap-6 text-sm font-sub font-medium text-warm-muted">
          <Link href="/pricing" className="hover:text-fire">Plans</Link>
          <Link href="/apply" className="hover:text-fire">Book Free Call</Link>
          <Link href="/about" className="hover:text-fire">About</Link>
          <Link href="/contact" className="hover:text-fire">Contact</Link>
          <a href="https://www.instagram.com/dylanvalentii/" target="_blank" rel="noopener noreferrer" className="hover:text-fire flex items-center gap-1.5">
            <InstagramIcon />
            <span>Instagram</span>
          </a>
        </div>
        <p className="text-xs text-warm-muted">
          © {new Date().getFullYear()} Dylan Valenti Coaching
        </p>
      </div>
    </footer>
  );
}
