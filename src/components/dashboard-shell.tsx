"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/auth/actions";

const FIRE = "#7a1810";

interface NavItem {
  href: string;
  label: string;
}

export function DashboardShell({
  navItems,
  children,
}: {
  navItems: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-forge">
      <aside className="flex w-60 flex-col border-r border-forge-4 bg-forge-2 p-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="relative h-8 w-8 overflow-hidden rounded-full"
            style={{ boxShadow: "0 0 8px rgba(122,24,16,0.4)" }}
          >
            <Image src="/photos/dylan-logo.jpg" alt="Dylan Valenti" fill className="object-cover" sizes="32px" />
          </div>
          <span className="font-sub text-xs font-light tracking-[0.2em] text-warm">
            DYLAN<span className="font-bold">VALENTI</span>
          </span>
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1 font-sub text-sm font-medium">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm px-3 py-2.5 transition ${
                  active
                    ? "text-white"
                    : "text-warm-muted hover:bg-forge-3 hover:text-warm"
                }`}
                style={active ? { background: "rgba(122,24,16,0.15)", color: FIRE } : {}}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-sm px-3 py-2.5 text-left font-sub text-sm font-medium text-warm-muted transition hover:bg-forge-3 hover:text-warm"
          >
            Log out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
