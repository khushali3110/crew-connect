import { NextResponse } from "next/server";
import { readEvents } from "@/lib/server-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase().trim();
  const location = searchParams.get("location")?.toLowerCase().trim();
  const events = await readEvents();

  const filtered = events.filter((event) => {
    const eventText = [
      event.title,
      event.company,
      event.category,
      event.city,
      event.venue,
      event.date,
      event.rate,
      event.about ?? "",
      ...(event.tags ?? []),
      ...(event.skills ?? []),
      ...(event.responsibilities ?? [])
    ]
      .join(" ")
      .toLowerCase();
    const locationText = [
      event.city,
      event.venue,
      event.address ?? "",
      event.title,
      event.category ?? "",
      event.company ?? "",
      ...(event.tags ?? [])
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = query ? eventText.includes(query) : true;
    const matchesLocation = location ? locationText.includes(location) || eventText.includes(location) : true;

    return matchesQuery && matchesLocation;
  });

  return NextResponse.json(filtered);
}
