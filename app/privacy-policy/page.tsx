import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const sections = [
  [
    "Information we collect",
    "We collect contact details, role preferences, sector interests, event applications, availability notes, and messages you submit through Crew Connect forms."
  ],
  [
    "How we use your information",
    "We use your details to match crew with suitable events, respond to employer requests, coordinate production staffing, verify experience, and improve our marketplace."
  ],
  [
    "Sharing and security",
    "We only share relevant information with trusted production partners when it is needed for staffing, compliance, scheduling, or event operations. We use reasonable safeguards to protect submitted data."
  ],
  [
    "Your choices",
    "You can contact Crew Connect to update your information, request removal from active opportunities, or ask questions about how your details are handled."
  ]
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-aqua transition hover:text-ink">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-aqua sm:text-sm">Privacy Policy</p>
          <h1 className="fluid-page-title mt-4 font-black">How Crew Connect protects your data.</h1>
          <p className="fluid-copy mt-6 max-w-2xl text-slateblue">
            This policy explains how we handle information from crew members, employers, and production partners using our site.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-5 px-4 sm:px-6 lg:px-8">
          {sections.map(([title, text]) => (
            <article key={title} className="rounded-lg border border-ink/10 bg-mist p-5 shadow-sm sm:p-6">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 shrink-0 text-aqua" size={24} />
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
