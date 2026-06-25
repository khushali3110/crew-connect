import { BriefcaseBusiness, Building2, ClipboardList } from "lucide-react";
import { AdminExcelExport } from "@/components/admin-excel-export";
import { getJoinTeamRequests, getTeamRequests } from "@/lib/api-data";
import type { JoinTeamRequest, TeamRequest } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [joinResult, requestResult] = await Promise.allSettled([getJoinTeamRequests(), getTeamRequests()]);

  const joinRequests = joinResult.status === "fulfilled" ? joinResult.value.data : [];
  const teamRequests = requestResult.status === "fulfilled" ? requestResult.value.data : [];
  const totalCount = joinRequests.length + teamRequests.length;
  const hasError = joinResult.status === "rejected" || requestResult.status === "rejected";

  return (
    <section className="bg-mist py-10 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua">Admin Dashboard</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Form Submissions</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slateblue">
              All home page form submissions are shown here. Join Team and Req Team data are separated for quick checking.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <AdminExcelExport joinRequests={joinRequests} teamRequests={teamRequests} />
            <div className="rounded-lg border border-aqua/20 bg-white px-6 py-4 shadow-soft">
              <p className="text-sm font-bold text-slateblue">Total Data</p>
              <p className="mt-1 text-5xl font-black text-aqua">{totalCount}</p>
            </div>
          </div>
        </div>

        {hasError ? (
          <div className="mt-6 rounded-lg border border-coral/25 bg-coral/10 px-4 py-3 text-sm font-bold text-coral">
            Some dashboard data could not load. Please make sure the backend is running on port 3000.
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard icon={ClipboardList} label="All Data" value={totalCount} />
          <StatCard icon={BriefcaseBusiness} label="Join Team Forms" value={joinRequests.length} />
          <StatCard icon={Building2} label="Req Team Forms" value={teamRequests.length} />
        </div>

        <DashboardSection title="Join Team Data" count={joinRequests.length}>
          <JoinTeamTable rows={joinRequests} />
        </DashboardSection>

        <DashboardSection title="Req Team Data" count={teamRequests.length}>
          <TeamRequestTable rows={teamRequests} />
        </DashboardSection>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof ClipboardList; label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-soft">
      <Icon className="text-coral" size={26} />
      <p className="mt-4 text-sm font-bold text-slateblue">{label}</p>
      <p className="mt-1 text-3xl font-black text-ink">{value}</p>
    </div>
  );
}

function DashboardSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-lg bg-white p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-black text-ink">{title}</h2>
        <span className="w-fit rounded-full bg-limewash px-3 py-1 text-xs font-black text-aqua">{count} Records</span>
      </div>
      {children}
    </section>
  );
}

function JoinTeamTable({ rows }: { rows: JoinTeamRequest[] }) {
  if (!rows.length) {
    return <EmptyState text="No Join Team form data yet." />;
  }

  return (
    <DataTable
      headers={["Date", "Name", "Phone", "Gender", "Experience", "City", "Pincode", "Photo", "CV"]}
      rows={rows.map((row) => [
        formatDate(row.createdAt),
        row.firstName,
        formatPhone(row.phoneNumber),
        row.gender,
        `${row.yearsExperience} yrs`,
        row.city,
        row.pincode,
        row.photoFileName || "-",
        row.cvFileName || "-"
      ])}
    />
  );
}

function TeamRequestTable({ rows }: { rows: TeamRequest[] }) {
  if (!rows.length) {
    return <EmptyState text="No Req Team form data yet." />;
  }

  return (
    <DataTable
      headers={["Date", "Company", "Person", "Phone", "Gender", "Location", "Event Date", "Persons", "Event Type", "City", "Pincode"]}
      rows={rows.map((row) => [
        formatDate(row.createdAt),
        row.companyName,
        row.personName,
        formatPhone(row.phoneNumber),
        row.gender,
        row.location,
        row.eventDate,
        row.personsRequired,
        row.eventType,
        row.city,
        row.pincode
      ])}
    />
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink/10">
      <table className="min-w-full divide-y divide-ink/10 text-left text-sm">
        <thead className="bg-limewash">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="whitespace-nowrap px-4 py-3 font-black text-ink">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10 bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="align-top">
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="max-w-[220px] px-4 py-3 text-slateblue">
                  <span className="line-clamp-2">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-lg border border-dashed border-ink/15 bg-limewash px-4 py-8 text-center text-sm font-bold text-slateblue">{text}</div>;
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatPhone(value: string) {
  if (!value) return "-";

  if (value.length === 10) {
    return `+91 ${value}`;
  }

  return value.startsWith("91") ? `+${value}` : value;
}
