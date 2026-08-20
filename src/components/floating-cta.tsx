import Link from "next/link";

export function FloatingCTA() {
  return (
    <Link
      href="/apply"
      className="fixed bottom-6 right-6 z-50 btn-primary"
      style={{ boxShadow: "0 4px 24px rgba(122,24,16,0.55), 0 0 0 2px rgba(122,24,16,0.15)" }}
    >
      Book Free Call
    </Link>
  );
}
