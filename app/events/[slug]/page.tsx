import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  Share2,
} from "lucide-react";
import { readEvents } from "@/lib/server-data";
import { ApplyForm } from "@/components/apply-form";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const events = await readEvents();
  const event = events.find((e) => e.slug === params.slug);

  if (!event) notFound();

  const company = event.company ?? "Nexus Events Group";
  const companyRating = event.companyRating ?? "4.9";
  const companyTier = event.companyTier ?? "Tier 1 Agency";
  const companyBio =
    event.companyBio ??
    "Nexus is a premier global event production firm known for high-tech innovation summits and luxury brand launches.";
  const tagline =
    event.tagline ??
    `${event.title} is part of our active event calendar. The crew will support guest movement, venue readiness, check-in flow, and onsite coordination across ${event.venue}.`;
  const visionParagraphs = event.vision ? event.vision.split("\n\n") : [tagline];
  const duration = event.duration ?? "Multi-Day";
  const startDate = event.startDate ?? event.date;
  const address = event.address ?? `${event.venue}, ${event.city}`;
  const otherEvents = event.otherEvents ?? [];

  const positions =
    event.positions && event.positions.length > 0
      ? event.positions
      : event.tags.map((tag) => ({
          title: tag,
          description: `Support the ${event.title} production as a ${tag} crew member.`,
          rate: event.rate.replace("/", "").trim(),
          rateUnit: "Hr",
          openings: 3,
        }));

  const roles = positions.map((p) => p.title);

  return (
    <div className="min-h-screen bg-[#fbfdfc]">
      <section className="relative flex min-h-[360px] items-center overflow-hidden border-b border-ink/10 bg-white py-12 sm:min-h-[400px] sm:py-20">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={`${event.title} stage`}
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-limewash px-3 py-1 text-xs font-black uppercase tracking-wide text-aqua">
                  Premium Event
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slateblue">
                  <BadgeCheck size={15} className="text-aqua" />
                  Production by {company}
                </span>
              </div>

              <h1 className="fluid-page-title font-black text-ink">
                Production Detail: {event.title}
              </h1>
              <p className="fluid-copy max-w-2xl text-slateblue">
                {tagline}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                className="grid h-12 w-12 place-items-center rounded-xl border border-ink/15 bg-white text-slateblue shadow-sm transition hover:border-aqua hover:text-aqua sm:h-14 sm:w-14"
                aria-label="Save event"
              >
                <Bookmark size={22} />
              </button>
              <button
                className="grid h-12 w-12 place-items-center rounded-xl border border-ink/15 bg-white text-slateblue shadow-sm transition hover:border-aqua hover:text-aqua sm:h-14 sm:w-14"
                aria-label="Share event"
              >
                <Share2 size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div className="grid grid-cols-1 rounded-2xl border border-ink/10 bg-mist p-4 sm:p-6 md:grid-cols-3">
              {[
                { icon: MapPin, label: "Location", value: event.city },
                { icon: CalendarDays, label: "Duration", value: duration },
                { icon: Clock, label: "Start Date", value: startDate },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="border-ink/10 py-3 md:border-l md:px-4 md:py-0 lg:px-6 md:first:border-l-0"
                >
                  <p className="text-xs font-bold uppercase text-slateblue/75">
                    {label}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-[clamp(1rem,4vw,1.25rem)] font-black text-ink">
                    <Icon size={22} className="shrink-0 text-aqua" />
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <article>
              <h2 className="flex items-center gap-3 text-[clamp(1.4rem,4vw,1.5rem)] font-black text-ink">
                <span className="block h-0.5 w-8 bg-aqua" />
                The Vision
              </h2>
              <div className="mt-5 space-y-4">
                {visionParagraphs.map((para) => (
                  <p key={para} className="leading-8 text-slateblue">
                    {para}
                  </p>
                ))}
              </div>
            </article>

            <article>
              <h2 className="flex items-center gap-3 text-[clamp(1.4rem,4vw,1.5rem)] font-black text-ink">
                <span className="block h-0.5 w-8 bg-aqua" />
                Open Crew Positions for this Event
              </h2>
              <div className="mt-6 space-y-4">
                {positions.map((pos) => (
                  <div
                    key={pos.title}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-ink/10 bg-white p-5 transition hover:border-aqua hover:shadow-md sm:flex-row sm:items-center"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-ink">{pos.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slateblue">
                        {pos.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-[clamp(1.35rem,5vw,1.5rem)] font-black text-ink">
                        {pos.rate}{" "}
                        <span className="text-base font-bold text-slateblue">
                          / {pos.rateUnit}
                        </span>
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-limewash px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-aqua">
                        {pos.openings}{" "}
                        {pos.openings === 1 ? "Opening" : "Openings"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article>
              <h2 className="flex items-center gap-3 text-[clamp(1.4rem,4vw,1.5rem)] font-black text-ink">
                <span className="block h-0.5 w-8 bg-aqua" />
                Event Location
              </h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-white">
                <div className="relative min-h-[260px] bg-limewash sm:h-80">
                  <Image
                    src={event.image}
                    alt={event.venue}
                    fill
                    className="object-cover opacity-45"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-aqua text-white shadow-lg ring-8 ring-white/70">
                      <MapPin size={28} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t border-ink/10 p-4 sm:p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-aqua/10 text-aqua">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-black text-ink">{event.venue}</p>
                    <p className="text-sm text-slateblue">{address}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <ApplyForm roles={roles} eventTitle={event.title} eventSlug={event.slug} />

              <div className="rounded-2xl border border-ink/10 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink/10">
                    {event.companyImage ? (
                      <Image
                        src={event.companyImage}
                        alt={company}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-aqua text-xl font-black text-white">
                        {company[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-black leading-tight text-ink">{company}</h3>
                    <p className="mt-0.5 text-sm text-slateblue">
                      {companyTier} - {companyRating} Rating
                    </p>
                  </div>
                </div>
                <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-6 text-slateblue">
                  {companyBio}
                </p>
                <button className="mt-4 w-full rounded-xl border border-ink/15 py-3 text-sm font-bold text-ink transition hover:border-aqua hover:text-aqua">
                  View Agency Profile
                </button>
              </div>

              {otherEvents.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-black text-ink">
                    Other Upcoming Productions
                  </h3>
                  <div className="space-y-3">
                    {otherEvents.map((oe) => (
                      <Link
                        key={`${oe.slug}-${oe.title}`}
                        href={`/events/${oe.slug}`}
                        className="flex items-center justify-between rounded-xl border border-ink/10 bg-white p-4 transition hover:border-aqua hover:shadow-md"
                      >
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-aqua">
                            {oe.category}
                          </p>
                          <p className="mt-0.5 text-sm font-black text-ink">
                            {oe.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slateblue">
                            <MapPin size={11} />
                            {oe.city} - {oe.daysAway}
                          </p>
                        </div>
                        <ChevronRight size={16} className="shrink-0 text-slateblue" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
