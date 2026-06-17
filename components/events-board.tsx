"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, CalendarDays, CheckCircle2, Clock3, MapPin, Search } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { EventItem } from "@/lib/types";

const historyKey = "crew-connect-event-search-history";

export function EventsBoard({ initialEvents }: { initialEvents: EventItem[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(initialEvents[0] ?? null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.localStorage.removeItem(historyKey);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      searchEvents(query, location, controller.signal);
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, location]);

  useEffect(() => {
    if (!events.length) {
      setSelectedEvent(null);
      return;
    }

    const selectedStillVisible = selectedEvent ? events.some((event) => event.title === selectedEvent.title) : false;

    if (!selectedStillVisible) {
      setSelectedEvent(events[0]);
    }
  }, [events, selectedEvent]);

  async function searchEvents(nextQuery: string, nextLocation: string, signal?: AbortSignal) {
    const trimmedQuery = nextQuery.trim();
    const trimmedLocation = nextLocation.trim();
    const params = new URLSearchParams();

    if (trimmedQuery) params.set("q", trimmedQuery);
    if (trimmedLocation) params.set("location", trimmedLocation);

    setIsLoading(true);

    try {
      const response = await fetch(`/api/events?${params.toString()}`, {
        cache: "no-store",
        signal
      });
      if (!response.ok) {
        throw new Error("Event search failed");
      }

      const nextEvents = (await response.json()) as EventItem[];
      setEvents(nextEvents);

    } catch {
      if (!signal?.aborted) {
        setEvents(initialEvents);
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await searchEvents(query, location);
  }

  return (
    <>
      <div className="border-y border-ink/10 bg-white py-5">
        <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-4xl gap-3 px-4 md:grid-cols-2">
          <label className="flex h-11 items-center gap-3 rounded-md bg-[#f3f0f2] px-4 text-sm text-slateblue">
            <Search size={17} />
            <input
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="Search event or role"
            />
          </label>
          <label className="flex h-11 items-center gap-3 rounded-md bg-[#f3f0f2] px-4 text-sm text-slateblue">
            <MapPin size={17} />
            <input
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="City or region"
            />
          </label>
        </form>
      </div>

      <div className="bg-[#fbf7fb]">
        <div className="mx-auto w-full max-w-6xl px-4 py-4">
          <div className="grid overflow-hidden border-x border-ink/10 bg-white lg:grid-cols-[minmax(280px,390px)_minmax(0,1fr)]">
            <div className="border-r border-ink/10">
              <h2 className="px-4 pt-5 text-xs font-black uppercase tracking-[0.08em] text-ink">
                {events.length} Active Events found
              </h2>
              <div className="mt-4 px-4 pb-4">
                <div className="space-y-3">
                  {events.map((event) => (
                    <EventListCard
                      key={event.title}
                      event={event}
                      isSelected={selectedEvent?.title === event.title}
                      onSelect={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="min-h-[560px] bg-white p-4 sm:p-6 lg:min-h-[760px] lg:p-8">
              {selectedEvent ? <EventDetails event={selectedEvent} /> : <EmptyDetails />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EventListCard({
  event,
  isSelected,
  onSelect
}: {
  event: EventItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full overflow-hidden rounded-lg border p-5 text-left transition hover:border-aqua hover:shadow-md ${
        isSelected
          ? "border-2 border-aqua bg-limewash/35 shadow-md"
          : "border-ink/10 bg-white shadow-sm"
      }`}
    >
      {event.featured ? (
        <span className="absolute right-3 top-3 rounded bg-aqua px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">
          Featured
        </span>
      ) : null}
      <div className="flex gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-ink/10 bg-slate-100">
          <Image src={event.image} alt={event.title} fill className="object-cover" sizes="56px" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`pr-14 text-[clamp(1.2rem,5vw,1.5rem)] font-black leading-tight ${isSelected ? "text-aqua" : "text-ink"}`}>
            {event.title}
          </h3>
          <p className="mt-1 text-sm font-semibold text-slateblue sm:text-base">{event.city} • {event.date}</p>
          <p className="mt-2 text-xs font-semibold text-ink">
            Rate: {event.rate} / Hr
          </p>
          <span className="mt-4 inline-flex rounded-md bg-limewash px-5 py-2 text-xs font-bold text-aqua">
            View Event & Apply
          </span>
        </div>
      </div>
    </button>
  );
}

function EventDetails({ event }: { event: EventItem }) {
  const company = event.company ?? "Nexus Events Group";
  const category = event.category === "Technology" ? "AI & Blockchain" : event.category ?? "Event Staffing";
  const subTitle = event.subTitle ?? `${company} - ${category}`;
  const contractType = event.contractType ?? "Full Event";
  const staffNeeded = event.staffNeeded ?? "15 Members";
  const about =
    event.about ??
    event.vision ??
    `${event.title} is part of our active event calendar. The crew will support guest movement, venue readiness, check-in flow, and onsite coordination across ${event.venue}. This production needs reliable staff who can stay calm, communicate clearly, and deliver a polished experience for every attendee.`;
  const responsibilities =
    event.responsibilities && event.responsibilities.length > 0
      ? event.responsibilities
      : [
          "Manage end-to-end onsite logistics and crowd flow.",
          "Coordinate transitions on the 360-degree LED main stage.",
          "Troubleshoot real-time attendee access and stream configs.",
          "Maintain high safety standards and vendor coordination."
        ];
  const skills =
    event.slug === "global-tech-summit"
      ? ["Event Operations", "AV & Tech Setup", "Crisis Management", "Leadership"]
      : event.skills && event.skills.length > 0
        ? event.skills
        : event.tags;
  const address = event.address ?? `${event.venue}, ${event.city}`;
  const aboutParagraph = about.replace(/\n\n/g, " ");

  return (
    <article className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-ink/10 bg-ink shadow-sm">
            <Image src={event.image} alt={event.title} fill className="object-cover" sizes="64px" />
          </div>
          <div className="min-w-0">
            <h2 className="max-w-xs text-[clamp(1.5rem,5vw,1.875rem)] font-black leading-tight text-ink">
              {event.title}
            </h2>
            <p className="mt-1 text-sm font-bold text-aqua">{subTitle}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slateblue">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-aqua" /> {event.city}</span>
              <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-aqua" /> {event.date}</span>
              <span className="flex items-center gap-1.5"><Clock3 size={13} className="text-aqua" /> {event.duration ?? "5 Days"}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 sm:justify-end">
          <Link href={event.slug ? `/events/${event.slug}` : "/contact/rolecrew"} className="inline-flex h-10 items-center justify-center rounded-md bg-aqua px-5 text-xs font-black text-white shadow-sm transition hover:bg-ink">
            View Details & Apply
          </Link>
          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 text-xs font-bold text-ink transition hover:border-aqua hover:text-aqua">
            <Bookmark size={14} /> Save Event
          </button>
        </div>
      </div>

      <div className="mt-7 grid overflow-hidden rounded-lg border border-ink/10 bg-[#fbf7fb] sm:grid-cols-3">
        {[
          ["Hourly Rate", event.rate],
          ["Contract Type", contractType],
          ["Staff Needed", staffNeeded]
        ].map(([label, value]) => (
          <div key={label} className="border-b border-ink/10 p-4 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <p className="text-[10px] font-black uppercase tracking-[0.08em] text-slateblue">{label}</p>
            <p className="mt-1 text-lg font-black text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-ink/10 pt-7">
        <h3 className="text-lg font-black text-ink">About the Event</h3>
        <p className="mt-3 text-sm leading-7 text-slateblue">{aboutParagraph}</p>
      </div>

      <div className="mt-7">
        <h3 className="text-lg font-black text-ink">Core Responsibilities</h3>
        <ul className="mt-3 space-y-2 text-sm text-slateblue">
          {responsibilities.map((item) => (
            <li key={item} className="flex gap-2 leading-6">
              <CheckCircle2 className="mt-1 shrink-0 text-aqua" size={14} /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7">
        <h3 className="text-lg font-black text-ink">Skills & Requirements</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-bold text-ink">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-7 h-56 overflow-hidden rounded-xl border border-ink/10 bg-slate-100 shadow-sm">
        <Image
          src={event.mapImage ?? event.image}
          alt={`${event.venue} location`}
          fill
          className="object-cover opacity-70"
          sizes="(min-width: 1024px) 48vw, 100vw"
        />
        <div className="absolute inset-0 bg-ink/10" />
        <div className="absolute left-1/2 top-10 -translate-x-1/2">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-aqua text-white shadow-lg ring-4 ring-white/70">
            <MapPin size={22} />
          </div>
        </div>
        <div className="absolute bottom-5 left-5 max-w-[260px] rounded-lg bg-white p-4 shadow-lg">
          <div className="flex gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-limewash text-aqua">
              <MapPin size={17} />
            </div>
            <div>
              <h4 className="text-sm font-black text-ink">{event.venue}</h4>
              <p className="mt-1 text-xs leading-5 text-slateblue">{event.mapAddress ?? address}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyDetails() {
  return (
    <div className="grid min-h-[520px] place-items-center text-center">
      <div>
        <h3 className="text-2xl font-black">No event selected</h3>
        <p className="mt-3 text-slateblue">Try another search term to see matching event details.</p>
      </div>
    </div>
  );
}
