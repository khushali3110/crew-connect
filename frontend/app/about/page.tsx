import Image from "next/image";
import { BadgeCheck, Bolt, Eye, Handshake, Rocket, ShieldCheck, UsersRound } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export default function AboutPage() {
  return (
    <>
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua sm:text-sm">Our Journey</p>
            <h1 className="fluid-page-title mt-4 font-black">Redefining the pulse of events.</h1>
            <p className="fluid-copy mt-6 text-slateblue">
              As a premier event organization team, we are dedicated to the art of production. We focus on elevating our world-class event portfolio by staffing our own global summits with elite talent, offering the ultimate prestige of joining our crew.
            </p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-lg shadow-soft sm:h-[420px] lg:h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1300&q=80"
              alt="Event crew collaboration"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/92 p-4 shadow-soft sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-aqua" />
                <div>
                  <p className="font-black">Reliability Guaranteed</p>
                  <p className="text-sm text-slateblue">99.8% shift fulfillment rate across 50 cities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 text-center sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {[
            ["2018", "Founded Year"],
            ["15k+", "Vetted Crew"],
            ["40k+", "Events Staffed"],
            ["98%", "Partner Retention"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg bg-limewash p-6">
              <p className="text-[clamp(2rem,7vw,2.5rem)] font-black text-aqua">{value}</p>
              <p className="mt-2 text-sm font-bold text-slateblue">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeading eyebrow="Our Story" title="Built by event veterans for elite production teams." />
            <p className="mt-6 leading-8 text-slateblue">
              Born in the heart of the tech hub, Crew Connect was founded by veterans of the event management world. We saw the need for an event organization team that could seamlessly execute its own global summits with unparalleled precision and elite talent.
            </p>
            <p className="mt-4 leading-8 text-slateblue">
              We don&apos;t just organize events; we produce masterpieces. Today, we empower specialized professionals, from lighting technicians to premium hospitality staff, to experience the prestige of joining our crew and working within our world-class event portfolio.
            </p>
            <blockquote className="mt-8 border-l-4 border-aqua pl-5 text-xl font-black leading-8">
              &quot;Our mission is to staff our own global summits with elite talent, bringing our productions to life with unforgettable precision.&quot;
            </blockquote>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative min-h-[240px] overflow-hidden rounded-lg sm:mt-12 sm:h-72">
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" alt="Tech coordinator tablet" fill className="object-cover" />
            </div>
            <div className="relative min-h-[240px] overflow-hidden rounded-lg sm:h-72">
              <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80" alt="Event production office" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-limewash py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Value icon={Rocket} title="Our Mission" copy="To eliminate friction in event production by staffing our world-class event portfolio with a high-performance crew." />
          <Value icon={Eye} title="Our Vision" copy="To become the premier event organization team for the experiential economy, powering our own iconic global summits." />
        </div>
        <div className="mx-auto mt-8 grid w-full max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <Value icon={Handshake} title="Integrity" copy="Transparent expectations, fair pay, and clear communication from call time to wrap." />
          <Value icon={Bolt} title="Agility" copy="Fast-moving teams that adjust gracefully when live event conditions change." />
          <Value icon={UsersRound} title="Community" copy="A trusted crew culture built around shared standards, support, and respect." />
          <Value icon={BadgeCheck} title="Excellence" copy="Every detail matters, from the first guest arrival to the final production wrap." />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Milestones" title="Milestones of Progress" align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["2018", "The Blueprint", "Founded in San Francisco with a vision to produce unparalleled event experiences."],
              ["2020", "Series A & Scale", "Expanded our event portfolio to 12 major US cities with an elite active crew."],
              ["2023", "Global Reach", "Launched international operations in London and Singapore."]
            ].map(([year, title, copy]) => (
              <div key={year} className="rounded-lg border border-ink/10 p-7">
                <p className="text-4xl font-black text-coral">{year}</p>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slateblue">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_0.8fr] md:items-center lg:px-8">
          <div>
            <h2 className="fluid-section-title font-black">Uncompromising Trust.</h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/70">
              Safety isn&apos;t a feature; it&apos;s our foundation. Every crew member undergoes a multi-step verification process including background checks, skill assessments, and face-to-face interviews.
            </p>
          </div>
          <div className="grid gap-3">
            {["Criminal Background Checks", "Tiered Skill Ratings", "Public Liability Insurance", "24/7 Rapid Response Support"].map((item) => (
              <p key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-4 font-bold">
                <ShieldCheck className="text-coral" /> {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Value({ icon: Icon, title, copy }: { icon: typeof UsersRound; title: string; copy: string }) {
  return (
    <div className="rounded-lg bg-white p-7 shadow-soft">
      <Icon className="text-aqua" size={32} />
      <h3 className="mt-5 text-xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-slateblue">{copy}</p>
    </div>
  );
}
