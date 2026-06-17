"use client";

import { Bookmark, Share2 } from "lucide-react";

export function HeroActions() {
  return (
    <div className="absolute right-4 top-4 z-10 flex gap-2 sm:right-8 sm:top-8">
      <button
        onClick={() => {}}
        className="grid h-10 w-10 place-items-center rounded-lg border border-ink/15 bg-white text-slateblue shadow-soft transition hover:border-aqua hover:text-aqua"
        aria-label="Save event"
      >
        <Bookmark size={18} />
      </button>
      <button
        onClick={() => navigator.share?.({ title: document.title, url: location.href }).catch(() => {})}
        className="grid h-10 w-10 place-items-center rounded-lg border border-ink/15 bg-white text-slateblue shadow-soft transition hover:border-aqua hover:text-aqua"
        aria-label="Share event"
      >
        <Share2 size={18} />
      </button>
    </div>
  );
}
