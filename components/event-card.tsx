import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";

type EventCardProps = {
  event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
  // Format date to show short range like "Oct 15-18"
  const dateLabel = event.date;

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft transition hover:shadow-lg hover:-translate-y-1 duration-200">
      {/* Image with date badge */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        {/* Featured badge */}
        {event.featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
            Featured
          </span>
        ) : null}
        {/* Date badge */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-ink shadow backdrop-blur-sm">
          {dateLabel}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-black leading-tight text-ink">{event.title}</h3>

        {/* Location */}
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slateblue">
          <MapPin size={14} className="shrink-0" />
          {event.city} • {event.venue}
        </p>

        {/* Role tags */}
        {event.tags && event.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-aqua/20 bg-aqua/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-aqua"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Join Crew button */}
        <Link
          href={event.slug ? `/events/${event.slug}` : "/contact/rolecrew"}
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-aqua/10 px-4 py-3 text-sm font-black text-aqua transition hover:bg-aqua hover:text-white"
        >
          Join Crew
        </Link>
      </div>
    </article>
  );
}
