import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-forge px-6">
      <div className="w-full max-w-sm border border-forge-4 bg-forge-2 p-8">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
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
        <h1 className="font-display mb-6 text-center text-3xl leading-none text-warm">LOG IN</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-sm text-warm-muted">
          No account?{" "}
          <Link href="/signup" className="text-warm underline hover:text-warm/80">
            Sign up free
          </Link>
        </p>
      </div>
    </main>
  );
}
