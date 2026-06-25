"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { BriefcaseBusiness, Building2, Upload, X } from "lucide-react";
import { getBackendBaseUrl } from "@/lib/backend-url";

type ModalType = "join" | "request" | null;
type SubmitStatus = "idle" | "loading" | "success" | "error";
type JoinFileKey = "photo" | "cv";
type JoinFiles = Record<JoinFileKey, { name: string; contentType: string; data: string }>;

const apiBaseUrl = getBackendBaseUrl();

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-aqua focus:bg-white/15 focus:ring-2 focus:ring-aqua/25";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-aqua focus:bg-white/15 focus:ring-2 focus:ring-aqua/25";

export function HomeCtaForms() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [joinFiles, setJoinFiles] = useState<JoinFiles>(getEmptyJoinFiles());

  function closeModal() {
    if (status === "loading") return;
    setActiveModal(null);
    setStatus("idle");
    setMessage("");
    setJoinFiles(getEmptyJoinFiles());
  }

  function handleFileChange(key: JoinFileKey) {
    return async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        setJoinFiles((current) => ({
          ...current,
          [key]: { name: "", contentType: "", data: "" }
        }));
        return;
      }

      const data = await readFileAsBase64(file);

      setJoinFiles((current) => ({
        ...current,
        [key]: {
          name: file.name,
          contentType: file.type || "application/octet-stream",
          data
        }
      }));
    };
  }

  async function submitForm(event: FormEvent<HTMLFormElement>, type: Exclude<ModalType, null>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    delete payload.photo;
    delete payload.cv;

    try {
      if (type === "request") {
        const eventDate = String(payload.eventDate ?? "");

        if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
          throw new Error("Event date year must be 4 digits.");
        }
      }

      const endpoint = type === "join" ? "/api/join-team" : "/api/team-requests";
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pageUrl: window.location.href,
          ...payload,
          ...(type === "join"
            ? {
                photoFileName: joinFiles.photo.name,
                photoContentType: joinFiles.photo.contentType,
                photoData: joinFiles.photo.data,
                cvFileName: joinFiles.cv.name,
                cvContentType: joinFiles.cv.contentType,
                cvData: joinFiles.cv.data
              }
            : {})
        })
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        throw new Error("Backend is not running on port 3000. Please run npm run dev:all again.");
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Unable to submit form");
      }

      form.reset();
      setJoinFiles(getEmptyJoinFiles());
      setStatus("success");
      setMessage("Submitted successfully.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  function handlePincodeChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 7);
  }

  function handleNumberChange(maxLength?: number) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const onlyNumbers = event.target.value.replace(/\D/g, "");
      event.target.value = maxLength ? onlyNumbers.slice(0, maxLength) : onlyNumbers;
    };
  }

  function handleLettersChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
  }

  function handleYearsChange(event: ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = event.target.value.replace(/\D/g, "").slice(0, 2);
    const years = Number(onlyNumbers);
    event.target.value = onlyNumbers && years > 15 ? "15" : onlyNumbers;
  }

  return (
    <>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <button
          type="button"
          onClick={() => setActiveModal("join")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-white hover:text-ink sm:w-auto"
        >
          <BriefcaseBusiness size={18} /> Join Team
        </button>
        <button
          type="button"
          onClick={() => setActiveModal("request")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-ink sm:w-auto"
        >
          <Building2 size={18} /> Req Team
        </button>
      </div>

      {activeModal ? (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/75 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6">
          <div className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-ink p-4 text-white shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-ink"
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua">
              {activeModal === "join" ? "Crew Registration" : "Staff Request"}
            </p>
            <h2 className="mt-2 pr-12 text-3xl font-black">
              {activeModal === "join" ? "Join Team" : "Req Team"}
            </h2>

            {activeModal === "join" ? (
              <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(event) => submitForm(event, "join")}>
                <Field label="First Name">
                  <input name="firstName" required onChange={handleLettersChange} placeholder="First name" className={inputClass} />
                </Field>
                <Field label="Phone Number">
                  <input name="phoneNumber" required inputMode="numeric" pattern="\d{10,12}" minLength={10} maxLength={12} onChange={handleNumberChange(12)} placeholder="+91 9876543210" className={inputClass} />
                </Field>
                <Field label="Gender">
                  <select name="gender" required className={selectClass} defaultValue="">
                    <option className="bg-white text-base text-ink" value="" disabled>Select gender</option>
                    <option className="bg-white text-base text-ink" value="Male">Male</option>
                    <option className="bg-white text-base text-ink" value="Female">Female</option>
                    <option className="bg-white text-base text-ink" value="Other">Other</option>
                  </select>
                </Field>
                <Field label="Years Experience">
                  <input name="yearsExperience" required type="text" inputMode="numeric" pattern="\d{1,2}" onChange={handleYearsChange} placeholder="3" className={inputClass} />
                </Field>
                <Field label="City">
                  <input name="city" required onChange={handleLettersChange} placeholder="Mumbai" className={inputClass} />
                </Field>
                <Field label="Pincode">
                  <input name="pincode" required inputMode="numeric" pattern="\d{6,7}" minLength={6} maxLength={7} onChange={handlePincodeChange} placeholder="400001" className={inputClass} />
                </Field>
                <FileField label="Upload Photo" name="photo" fileName={joinFiles.photo.name} onChange={handleFileChange("photo")} />
                <FileField label="Upload CV" name="cv" fileName={joinFiles.cv.name} onChange={handleFileChange("cv")} />
                <SubmitArea status={status} message={message} label="Submit Join Team Form" />
              </form>
            ) : (
              <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(event) => submitForm(event, "request")}>
                <Field label="Gender Requirement">
                  <select name="gender" required className={selectClass} defaultValue="">
                    <option className="bg-white text-base text-ink" value="" disabled>Select requirement</option>
                    <option className="bg-white text-base text-ink" value="Male">Male</option>
                    <option className="bg-white text-base text-ink" value="Female">Female</option>
                    <option className="bg-white text-base text-ink" value="Any">Any</option>
                  </select>
                </Field>
                <Field label="Company Name">
                  <input name="companyName" required onChange={handleLettersChange} placeholder="Company name" className={inputClass} />
                </Field>
                <Field label="Person Name">
                  <input name="personName" required onChange={handleLettersChange} placeholder="Contact person" className={inputClass} />
                </Field>
                <Field label="Phone Number">
                  <input name="phoneNumber" required inputMode="numeric" pattern="\d{10,12}" minLength={10} maxLength={12} onChange={handleNumberChange(12)} placeholder="+91 9876543210" className={inputClass} />
                </Field>
                <Field label="Location">
                  <input name="location" required onChange={handleLettersChange} placeholder="Venue area" className={inputClass} />
                </Field>
                <Field label="Event Date">
                  <input name="eventDate" required type="date" min="1900-01-01" max="9999-12-31" className={inputClass} />
                </Field>
                <Field label="How Many Persons Require">
                  <input name="personsRequired" required type="text" inputMode="numeric" pattern="\d+" onChange={handleNumberChange()} placeholder="10" className={inputClass} />
                </Field>
                <Field label="Type of Event">
                  <input name="eventType" required onChange={handleLettersChange} placeholder="Wedding concert expo" className={inputClass} />
                </Field>
                <Field label="Which City">
                  <input name="city" required onChange={handleLettersChange} placeholder="Ahmedabad" className={inputClass} />
                </Field>
                <Field label="City Pincode">
                  <input name="pincode" required inputMode="numeric" pattern="\d{6,7}" minLength={6} maxLength={7} onChange={handlePincodeChange} placeholder="380001" className={inputClass} />
                </Field>
                <SubmitArea status={status} message={message} label="Submit Team Request" />
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

function getEmptyJoinFiles(): JoinFiles {
  return {
    photo: { name: "", contentType: "", data: "" },
    cv: { name: "", contentType: "", data: "" }
  };
}

function readFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Unable to read selected file."));
    reader.readAsDataURL(file);
  });
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-white/85">{label}</span>
      {children}
    </label>
  );
}

function FileField({
  label,
  name,
  fileName,
  onChange
}: {
  label: string;
  name: string;
  fileName: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-white/85">{label}</span>
      <span className="flex min-h-[46px] items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15">
        <Upload size={18} className="shrink-0 text-aqua" />
        <span className="min-w-0 flex-1 truncate text-white/75">{fileName || "Choose file"}</span>
      </span>
      <input name={name} type="file" className="sr-only" onChange={onChange} />
    </label>
  );
}

function SubmitArea({ status, message, label }: { status: SubmitStatus; message: string; label: string }) {
  return (
    <div className="sm:col-span-2">
      {message ? (
        <p className={`mb-3 rounded-xl px-4 py-3 text-sm font-bold ${status === "success" ? "bg-aqua/15 text-aqua" : "bg-coral/15 text-coral"}`}>
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-aqua px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Submitting..." : label}
      </button>
    </div>
  );
}
