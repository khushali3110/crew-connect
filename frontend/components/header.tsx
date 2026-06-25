"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Events", "/industries"],
  ["Services", "/about"],
  ["Contact", "/contact"]
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-5">
        <Link href="/" className="min-w-0 text-[clamp(1.25rem,4vw,1.5rem)] font-black text-ink transition hover:text-aqua">
          <span>Crew Connect</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-bold text-ink/70 hover:text-aqua">
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-ink/15 bg-white md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isOpen ? (
        <nav className="border-t border-ink/10 bg-white px-3 py-3 shadow-sm md:hidden">
          <div className="mx-auto grid w-full max-w-7xl gap-2">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-black text-ink/75 transition hover:bg-limewash hover:text-aqua"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
