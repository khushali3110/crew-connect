import Link from "next/link";
import { ArrowLeft, FileCheck2 } from "lucide-react";

const sections = [
  [
    "Using Crew Connect",
    "Crew Connect helps event teams discover staffing support and helps crew members apply for suitable opportunities. You agree to provide accurate details when submitting forms or applications."
  ],
  [
    "Crew and employer responsibilities",
    "Crew members are responsible for honest availability, experience, and contact information. Employers and production partners are responsible for clear event requirements and safe working conditions."
  ],
  [
    "Event opportunities",
    "Listings, rates, dates, and openings may change based on production needs. Submitting interest does not guarantee placement, booking, payment, or acceptance for a role."
  ],
  [
    "Site content",
    "Crew Connect content, layouts, event data, and brand materials are provided for marketplace use and should not be copied or misused without permission."
  ],
  [
    "Support",
    "For account, staffing, legal, or production questions, contact our support team through the contact page so your request can be routed properly."
  ]
];

export default function TermsOfServicePage() {
  return (
    <>
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-aqua transition hover:text-ink">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-aqua sm:text-sm">Terms of Service</p>
          <h1 className="fluid-page-title mt-4 font-black">Terms for using Crew Connect.</h1>
          <p className="fluid-copy mt-6 max-w-2xl text-slateblue">
            These terms explain the basic rules for using our event staffing marketplace and submitting crew or employer enquiries.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-5 px-4 sm:px-6 lg:px-8">
          {sections.map(([title, text]) => (
            <article key={title} className="rounded-lg border border-ink/10 bg-mist p-5 shadow-sm sm:p-6">
              <div className="flex gap-4">
                <FileCheck2 className="mt-1 shrink-0 text-aqua" size={24} />
                <div>
                  <h2 className="text-xl font-black">{title}</h2>
                  <p className="mt-3 leading-7 text-slateblue">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
