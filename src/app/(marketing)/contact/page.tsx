import { ContactForm } from "./contact-form";

const FIRE = "#7a1810";

export default function ContactPage() {
  return (
    <>
      <section className="bg-forge py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-6">
          <p className="font-sub text-xs font-semibold tracking-[0.3em]" style={{ color: FIRE }}>
            CONTACT
          </p>
          <h1 className="font-display mt-4 text-[clamp(3rem,8vw,5rem)] leading-none text-warm">
            GET IN TOUCH
          </h1>
          <p className="mt-6 text-base text-warm-muted">
            Questions about bulking, coaching, pricing, or the 1-on-1 program? Send a message
            and I&apos;ll get back to you.
          </p>
        </div>
      </section>
      <section className="bg-forge-2 py-16">
        <div className="mx-auto max-w-xl px-6">
          <div className="border border-forge-4 bg-forge p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
