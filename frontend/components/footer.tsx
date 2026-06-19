import Link from "next/link";
import { FooterActions } from "@/components/footer-actions";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-6">
        <div>
          <h3 className="text-2xl font-black">Crew Connect</h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            The exclusive talent portal and marketplace for elite event professionals powering global productions.
          </p>
          <FooterActions />
        </div>
        <FooterLinks title="Opportunities" links={[["Events", "/industries"]]} />
        <FooterLinks title="Crew Support" links={[["Services", "/about"], ["Contact Support", "/contact"], ["Code of Conduct", "/about"]]} />
        <FooterLinks title="Legal" links={[["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms-of-service"]]} />
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-white/55">
        © 2026 Crew Connect. Elite Event Talent Portal. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h4 className="font-bold">{title}</h4>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => (
          <Link key={label} href={href} className="text-sm text-white/65 hover:text-coral">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
