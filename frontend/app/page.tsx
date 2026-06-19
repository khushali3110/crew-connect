import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CircleDollarSign, TrendingUp } from "lucide-react";
import { HomeCtaForms } from "@/components/home-cta-forms";
import { SectionHeading } from "@/components/section-heading";

export default function Home() {

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80"
          alt="Elite event crew in a live venue"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center px-4 py-16 sm:min-h-[680px] sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral sm:text-sm">Staffing Global Summits & Festivals</p>
            <h1 className="fluid-page-title mt-5 max-w-4xl font-extrabold tracking-normal">
              Join the Elite Crew for Our Next Global Events
            </h1>
            <p className="fluid-copy mt-6 max-w-2xl text-white/78">
              We are looking for world-class hospitality, production, and security professionals to power upcoming high-stakes summits and festivals.
            </p>
            <HomeCtaForms />
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-aqua sm:text-sm">Proven Production Support</p>
              <h2 className="fluid-section-title mt-4 font-black text-ink">
                1,000+ events completed with teams trusted by premium productions.
              </h2>
              <p className="fluid-copy mt-5 text-slateblue">
                Crew Connect supports high-standard productions with reliable staffing, clear coordination, and trained professionals who understand event-day discipline. From guest-facing hospitality to backstage operations, our crews help every production move with confidence.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["1,000+", "Events Completed", "Delivered across summits, launches, fashion weeks, exhibitions, private events, and large-scale brand experiences."],
              ["15K+", "Crew Shifts Managed", "Verified professionals scheduled for hospitality, logistics, production support, guest care, and crowd flow."],
              ["24/7", "Operations Support", "Fast coordination before, during, and after events so clients and crew always have the next detail clear."]
            ].map(([value, title, copy]) => (
              <div key={title} className="rounded-lg border border-aqua/20 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-aqua/50">
                <p className="text-[clamp(2rem,7vw,2.5rem)] font-black text-aqua">{value}</p>
                <h3 className="fluid-card-title mt-4 font-black text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-slateblue">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-5 border-t border-ink/10 pt-8 md:grid-cols-3">
            {[
              "Role-ready crew matched to the event brief",
              "Clear communication from booking to wrap-up",
              "Professional standards for premium venues"
            ].map((line) => (
              <div key={line} className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-aqua" />
                <p className="text-base font-bold leading-7 text-ink">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Benefits"
            title="Why Work With Us"
            copy="We produce prestigious events globally and reward the skilled staff who make them possible."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [BadgeCheck, "Tier 1 Events", "Work at high-profile summits, luxury galas, and massive festivals."],
              [CircleDollarSign, "Premium Rates & Pay", "Earn above-market rates with reliable weekly payouts."],
              [TrendingUp, "Professional Growth", "Network with industry leaders and advance to core team roles."]
            ].map(([Icon, title, copy]) => {
              const LucideIcon = Icon as typeof BadgeCheck;
              return (
                <div key={title as string} className="rounded-lg border border-ink/10 bg-mist p-7">
                  <LucideIcon className="text-coral" size={32} />
                  <h3 className="mt-5 text-xl font-black">{title as string}</h3>
                  <p className="mt-3 leading-7 text-slateblue">{copy as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-limewash py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="How to Join Our Crew"
            copy="A streamlined process to get you verified and working on our next major production."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["Browse Events", "Apply for Roles", "Get Verified", "Work the Event"].map((step, index) => (
              <div key={step} className="rounded-lg bg-white p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-black text-white">{index + 1}</span>
                <h3 className="mt-5 text-lg font-black">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-slateblue">
                  {["Review our upcoming event calendar and match your availability.", "Select positions that align with your expertise.", "Complete onboarding, skill checks, and verification.", "Show up, deliver excellence, and get paid promptly."][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
          <div className="mt-7 divide-y divide-ink/10 rounded-lg border border-ink/10">
            {[
              ["What kind of experience do I need?", "We look for professionals with proven experience in high-end events. Specific requirements vary by role."],
              ["How and when do I get paid?", "Payments are processed weekly by direct deposit for completed shifts."],
              ["Can I travel for events?", "Yes. Travel stipends or accommodations may be provided for specialized roles and destination events."]
            ].map(([q, a]) => (
              <details key={q} className="group p-5" open={q.startsWith("What")}>
                <summary className="cursor-pointer list-none font-black">{q}</summary>
                <p className="mt-3 leading-7 text-slateblue">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aqua py-16 text-center text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="fluid-section-title font-black">Ready to join the best in the business?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">Secure your spot on our roster for the upcoming season of premier global events.</p>
          <Link href="/contact/rolecrew" className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-ink shadow-soft transition hover:bg-coral hover:text-white">
            Join Crew
          </Link>
        </div>
      </section>
    </>
  );
}
