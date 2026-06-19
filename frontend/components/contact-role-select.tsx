"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const subjectOptions = [
  "Hiring Personnel",
  "Joining the Crew",
  "Partnership Inquiry",
  "Production Inquiries",
  "Crew Support",
  "Technical Support"
];

const defaultSubjects: Record<string, string> = {
  "Crew Application": "Joining the Crew",
  "Employer Request": "Hiring Personnel",
  "General Inquiry": "Hiring Personnel",
  "Production Partnership": "Partnership Inquiry"
};

export function ContactRoleSelect({ defaultValue }: { defaultValue: string }) {
  const mappedDefault = defaultSubjects[defaultValue] ?? defaultValue;
  const initialValue = subjectOptions.includes(mappedDefault) ? mappedDefault : subjectOptions[0];
  const [selected, setSelected] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-4">
      <label className="mb-2 block text-sm font-black text-ink" htmlFor="contact-subject">
        Subject
      </label>
      <input type="hidden" name="subject" value={selected} />
      <button
        id="contact-subject"
        type="button"
        className="flex h-14 w-full items-center justify-between rounded-lg border border-ink/10 bg-white px-4 text-left text-base font-semibold text-ink outline-aqua transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{selected}</span>
        <ChevronDown
          className={`text-ink transition ${isOpen ? "rotate-180" : ""}`}
          size={24}
          strokeWidth={3}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft"
          role="listbox"
        >
          {subjectOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`block min-h-12 w-full px-4 py-3 text-left text-base font-semibold leading-6 transition hover:bg-limewash ${
                selected === option ? "bg-aqua text-white hover:bg-aqua" : "bg-white text-ink"
              }`}
              role="option"
              aria-selected={selected === option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
