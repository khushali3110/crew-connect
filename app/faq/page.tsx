import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const faqs = [
  [
    "How quickly can Crew Connect staff an event?",
    "For standard events, we can begin matching qualified crew within 24 hours. Larger or specialist productions are planned with a dedicated operations lead."
  ],
  [
    "Can I apply for a specific industry or event type?",
    "Yes. You can apply through an industry card or event page, and we keep that role or sector context attached to your enquiry."
  ],
  [
    "Are crew members vetted before assignments?",
    "Yes. Crew profiles are reviewed for experience, availability, location, and role fit before they are recommended for live productions."
  ],
  [
    "Do you support last-minute staffing requests?",
    "Yes. Our operations team handles urgent requests for event crew, production support, guest services, and technical teams where availability allows."
  ],
  [
    "What event types do you cover?",
    "We support corporate events, weddings, conferences, trade shows, concerts, festivals, sports events, product launches, and retail promotions."
  ],
  [
    "How do I contact support?",
    "Use the contact page for general support, production enquiries, and crew questions. Our team will route your request to the right coordinator."
  ]
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black text-aqua transition hover:text-ink">
            <ArrowLeft size={18} /> Back to Contact
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-aqua sm:text-sm">FAQ</p>
          <h1 className="fluid-page-title mt-4 font-black">Frequently asked questions.</h1>
          <p className="fluid-copy mt-6 max-w-2xl text-slateblue">
            Quick answers for crew applicants, employers, and production teams planning upcoming events.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-5 px-4 sm:px-6 lg:px-8">
          {faqs.map(([question, answer]) => (
            <article key={question} className="rounded-lg border border-ink/10 bg-mist p-5 shadow-sm sm:p-6">
              <div className="flex gap-4">
                <CheckCircle2 className="mt-1 shrink-0 text-aqua" size={24} />
                <div>
                  <h2 className="text-xl font-black">{question}</h2>
                  <p className="mt-3 leading-7 text-slateblue">{answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
