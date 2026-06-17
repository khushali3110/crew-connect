import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, LineChart, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { readIndustries } from "@/lib/server-data";

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const industries = await readIndustries();

  return (
    <>
      <section className="bg-[#fbfdfc] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Event Expertise"
            title="Where We Create Experiences"
            copy="Whether it's a high-stakes corporate summit or a sprawling music festival, we organize premium events and invite industry-vetted professionals to join our team."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ title, copy, image, badge, action, sector }) => (
              <article key={title} className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft transition hover:-translate-y-1 hover:border-aqua/40 hover:shadow-lg">
                <div className="relative aspect-[16/10]">
                  <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-70" />
                  {badge ? <span className="absolute left-4 top-4 rounded-full bg-aqua px-3 py-1 text-xs font-black uppercase tracking-wide text-white">{badge}</span> : null}
                </div>
                <div className="p-6">
                  <h3 className="fluid-card-title font-black text-ink">{title}</h3>
                  <p className="mt-3 leading-7 text-slateblue">{copy}</p>
                  <Link href={`/contact/rolecrew/${sector ?? title.toLowerCase().replaceAll(" ", "-")}`} className="mt-5 inline-flex max-w-full items-center gap-2 rounded-lg bg-limewash px-4 py-2 text-sm font-black text-aqua transition hover:bg-aqua hover:text-white">
                    {action ?? `Join Our Team for ${title}`} <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl sm:h-[420px] lg:h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
              alt="Professional crew staff"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 rounded-2xl bg-white/95 p-4 text-center shadow-soft backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
              <div><p className="text-[clamp(2rem,7vw,2.5rem)] font-black text-aqua">98%</p><p className="text-xs font-bold text-slateblue">Reliability Rate</p></div>
              <div><p className="text-[clamp(2rem,7vw,2.5rem)] font-black text-aqua">12k+</p><p className="text-xs font-bold text-slateblue">Vetted Professionals</p></div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Why Partner With Us" title="Precision Staffing for Premium Events" />
            <div className="mt-8 space-y-6">
              {[
                [ShieldCheck, "Event-Specific Verification", "We don't just vet for identity; we vet for skill. Our crew members undergo specific practical assessments tailored to their event specialization."],
                [Gauge, "Agile Deployment", "Our real-time marketplace allows you to scale up from 5 to 500 staff in hours, not weeks, with automated compliance and insurance handling."],
                [LineChart, "Quality Analytics", "Receive post-event performance reports for every crew member, helping you build a Favorite Crew list for future recurring events."]
              ].map(([Icon, title, copy]) => {
                const LucideIcon = Icon as typeof ShieldCheck;
                return (
                  <div key={title as string} className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-limewash text-aqua">
                      <LucideIcon size={25} />
                    </div>
                    <div>
                      <h3 className="font-black text-ink">{title as string}</h3>
                      <p className="mt-2 leading-7 text-slateblue">{copy as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/contact/roleemployer" className="mt-9 inline-flex items-center justify-center rounded-xl bg-aqua px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-ink">Schedule a Strategy Call</Link>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="fluid-section-title font-black text-ink">Ready to transform your next event?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slateblue">
            Join over 2,000 agencies and organizers who trust Crew Connect for their premium staffing needs.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact/roleemployer" className="inline-flex items-center justify-center rounded-xl bg-aqua px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-ink">
              Create Employer Account
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-ink/15 bg-white px-6 py-4 text-sm font-black text-ink transition hover:border-aqua hover:text-aqua">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
