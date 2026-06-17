"use client";

import { useState, type FormEvent } from "react";

type ApplyFormProps = {
  roles: string[];
  eventTitle?: string;
  eventSlug?: string;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export function ApplyForm({ roles, eventTitle, eventSlug }: ApplyFormProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [intro, setIntro] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "event-application",
          eventTitle,
          eventSlug,
          fullName,
          role,
          portfolioUrl,
          intro,
          pageUrl: window.location.href
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Unable to submit application");
      }

      setStatus("success");
      setMessage("Application submitted successfully.");
      setFullName("");
      setRole("");
      setPortfolioUrl("");
      setIntro("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white p-7 shadow-soft">
      <h2 className="text-xl font-black text-ink">Join the Production</h2>
      <p className="mt-1 text-sm text-slateblue">
        Submit your details to be considered for a role on this event.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jane Doe"
            required
            className="w-full rounded-lg border border-ink/15 bg-mist px-4 py-3 text-sm outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Role of Interest
          </label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
            className="w-full rounded-lg border border-ink/15 bg-mist px-4 py-3 text-sm text-slateblue outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
          >
            <option value="">Select a role...</option>
            {roles.map((nextRole) => (
              <option key={nextRole} value={nextRole}>
                {nextRole}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Portfolio / LinkedIn Link
          </label>
          <input
            type="url"
            value={portfolioUrl}
            onChange={(event) => setPortfolioUrl(event.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="w-full rounded-lg border border-ink/15 bg-mist px-4 py-3 text-sm outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-ink">
            Brief Intro{" "}
            <span className="font-normal text-slateblue">(Optional)</span>
          </label>
          <textarea
            rows={3}
            value={intro}
            onChange={(event) => setIntro(event.target.value)}
            placeholder="Why are you a good fit?"
            className="w-full resize-none rounded-lg border border-ink/15 bg-mist px-4 py-3 text-sm outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
          />
        </div>

        {message ? (
          <p className={`rounded-lg px-3 py-2 text-sm font-bold ${status === "success" ? "bg-limewash text-aqua" : "bg-coral/10 text-coral"}`}>
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="block w-full rounded-xl bg-aqua py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
