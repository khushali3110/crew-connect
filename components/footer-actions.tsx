"use client";

import { useState } from "react";
import { Mail, Share2 } from "lucide-react";

const emailAddress = "crew@crewconnect.com";

export function FooterActions() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Crew Connect",
      text: "Crew Connect - elite event talent and production staffing.",
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 flex items-center gap-3 text-white/70">
      <button
        type="button"
        onClick={handleShare}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-aqua hover:text-aqua"
        aria-label="Share Crew Connect"
        title={copied ? "Link copied" : "Share"}
      >
        <Share2 size={20} />
      </button>
      <a
        href={`mailto:${emailAddress}?subject=Crew%20Connect%20Inquiry`}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-aqua hover:text-aqua"
        aria-label={`Email ${emailAddress}`}
        title={emailAddress}
      >
        <Mail size={20} />
      </a>
      {copied ? <span className="text-xs font-bold text-aqua">Link copied</span> : null}
    </div>
  );
}
