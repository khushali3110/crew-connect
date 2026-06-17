import Link from "next/link";
import { ArrowRight, ExternalLink, Mail, MapPin, Phone, RefreshCw, UserRoundCheck, Video } from "lucide-react";

export default function ContactPage({
  searchParams
}: {
  searchParams?: { role?: string; sector?: string };
}) {
  return <ContactContent role={searchParams?.role} sector={searchParams?.sector} />;
}

export function ContactContent({ role, sector }: { role?: string; sector?: string }) {
  const sectorLabels: Record<string, string> = {
    corporate: "Corporate Events",
    weddings: "Weddings",
    conferences: "Conferences",
    "trade-shows": "Trade Shows",
    concerts: "Concerts",
    festivals: "Festivals",
    sports: "Sports Events",
    launches: "Product Launches",
    retail: "Retail Promotions"
  };
  const sectorText = sector ? sectorLabels[sector] ?? sector.replaceAll("-", " ") : "";
  const roleText = role === "crew" ? "Crew Application" : role === "employer" ? "Employer Request" : "General Inquiry";
  const contextText = sectorText ? `${roleText} - ${sectorText}` : roleText;

  return (
    <>
      <section className="contact-tight bg-mist">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua sm:text-sm">Contact Us</p>
            <h1 className="fluid-section-title mt-3 font-black">Get in touch with the experts.</h1>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-7 text-slateblue">
              Whether you are looking for elite event staff, joining as a crew member, or partnering with us for upcoming productions, our team is ready to assist you 24/7.
            </p>
            <div className="mt-5 inline-flex max-w-full items-center gap-3 rounded-full bg-white px-4 py-2.5 text-sm font-black shadow-soft sm:text-base">
              <RefreshCw className="text-coral" size={18} /> {contextText}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-tight bg-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={UserRoundCheck} title="Crew Support" value="crew@crewconnect.com" />
          <ContactCard icon={Video} title="Production Inquiries" value="productions@crewconnect.com" />
          <ContactCard icon={Phone} title="General Phone" value="+1 (555) 234-5678" />
          <ContactCard icon={MapPin} title="Headquarters" value="88 Production Way, Suite 400, Los Angeles, CA 90028" />
        </div>
      </section>

      <section className="contact-tight bg-limewash">
        <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-lg bg-ink p-5 text-white shadow-soft sm:p-6 lg:flex lg:flex-col lg:justify-center">
            <div className="flex items-center gap-3 text-sm font-black uppercase tracking-wide">
              <MapPin className="text-aqua" size={22} />
              Headquarters
            </div>
            <h2 className="mt-4 text-[clamp(1.5rem,5vw,1.875rem)] font-black leading-snug">
              88 Production Way,
              <br />
              Suite 400, Los Angeles, CA 90028
            </h2>
            <div className="my-5 h-px bg-white/20" />
            <div className="space-y-3 text-base font-semibold">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-white/85">Monday - Friday</span>
                <span>08:00 - 20:00 PST</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-white/85">Saturday</span>
                <span>10:00 - 16:00 PST</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-white/85">Sunday</span>
                <span className="text-aqua">Urgent Support Only</span>
              </div>
            </div>
            <Link href="/faq" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-coral transition hover:text-aqua sm:text-base">
              Need quick answers? Check out our frequently asked questions. <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-ink/10 shadow-soft sm:h-[320px] lg:h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1200&q=80"
              alt="Los Angeles operations map"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/92 p-4">
              <h3 className="font-black">Find us in LA</h3>
              <p className="mt-2 text-sm text-slateblue">Our central operations and organizing hub for all upcoming events and productions.</p>
              <p className="mt-4 inline-flex items-center gap-2 font-black text-aqua"><ExternalLink size={18} /> Open in Maps</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, title, value }: { icon: typeof Mail; title: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-ink/10 bg-mist p-5 sm:p-6">
      <Icon className="text-coral" size={30} />
      <h3 className="mt-5 text-[clamp(1.15rem,5vw,1.35rem)] font-black leading-tight">{title}</h3>
      <p className="mt-2 break-words text-base leading-7 text-slateblue [overflow-wrap:anywhere]">{value}</p>
    </div>
  );
}
