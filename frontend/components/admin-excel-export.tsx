"use client";

import { Download } from "lucide-react";
import type { JoinTeamRequest, TeamRequest } from "@/lib/types";

type ExcelLinkCell = {
  text: string;
  href: string;
};
type ExcelCell = string | number | boolean | ExcelLinkCell | null | undefined;
type ExcelRow = ExcelCell[];
const fallbackBackendUrl = "https://crew-connect1.onrender.com";

export function AdminExcelExport({ joinRequests, teamRequests }: { joinRequests: JoinTeamRequest[]; teamRequests: TeamRequest[] }) {
  function downloadExcel() {
    const workbook = buildExcelWorkbook(joinRequests, teamRequests);
    const blob = new Blob([workbook], {
      type: "application/vnd.ms-excel;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `crew-connect-admin-data-${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={downloadExcel}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-aqua px-5 py-3 text-sm font-black text-white shadow-soft transition hover:bg-ink sm:w-auto"
    >
      <Download size={18} />
      Download Excel
    </button>
  );
}

function buildExcelWorkbook(joinRequests: JoinTeamRequest[], teamRequests: TeamRequest[]) {
  const joinRows = buildJoinRows(joinRequests);
  const teamRows = buildTeamRows(teamRequests);
  const allRows: ExcelRow[] = [
    ["Join Team Form Data"],
    ...joinRows,
    [],
    ["Req Team Form Data"],
    ...teamRows
  ];

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Header">
      <Font ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#12B8B3" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Section">
      <Font ss:Bold="1" ss:Size="13" ss:Color="#0F172A"/>
      <Interior ss:Color="#E9FBF8" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Link">
      <Font ss:Color="#0563C1" ss:Underline="Single"/>
    </Style>
  </Styles>
  ${worksheetXml("All Form Data", allRows)}
  ${worksheetXml("Join Team Data", joinRows)}
  ${worksheetXml("Req Team Data", teamRows)}
</Workbook>`;
}

function buildJoinRows(joinRequests: JoinTeamRequest[]): ExcelRow[] {
  return [
    ["Date", "Name", "Phone", "Gender", "Experience", "City", "Pincode", "Photo Download", "CV Download"],
    ...joinRequests.map((row) => [
      formatDate(row.createdAt),
      row.firstName,
      formatPhone(row.phoneNumber),
      row.gender,
      row.yearsExperience,
      row.city,
      row.pincode,
      createFileCell(row._id, row.photoFileName, "photo"),
      createFileCell(row._id, row.cvFileName, "cv")
    ])
  ];
}

function buildTeamRows(teamRequests: TeamRequest[]): ExcelRow[] {
  return [
    ["Date", "Company", "Person", "Phone", "Gender Requirement", "Location", "Event Date", "Persons Required", "Event Type", "City", "Pincode"],
    ...teamRequests.map((row) => [
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
    ])
  ];
}

function worksheetXml(name: string, rows: ExcelRow[]) {
  return `<Worksheet ss:Name="${escapeXml(name)}">
    <Table>
      <Column ss:Width="145"/>
      <Column ss:Width="150"/>
      <Column ss:Width="135"/>
      <Column ss:Width="125"/>
      <Column ss:Width="120"/>
      <Column ss:Width="140"/>
      <Column ss:Width="105"/>
      <Column ss:Width="190"/>
      <Column ss:Width="190"/>
      <Column ss:Width="260"/>
      <Column ss:Width="120"/>
      <Column ss:Width="260"/>
      ${rows.map((row, index) => rowXml(row, index)).join("")}
    </Table>
  </Worksheet>`;
}

function rowXml(row: ExcelRow, index: number) {
  const isSection = row.length === 1 && Boolean(row[0]);
  const isHeader = index === 0 || row.some((cell) => normalizeCell(cell) === "Date");
  const style = isSection ? "Section" : isHeader ? "Header" : "";

  return `<Row>${row.map((cell) => cellXml(cell, style)).join("")}</Row>`;
}

function cellXml(cell: ExcelCell, style: string) {
  const value = isLinkCell(cell) ? normalizeCell(cell.text) : normalizeCell(cell);
  const link = isLinkCell(cell) ? cell.href : value;
  const href = isUrl(link) ? ` ss:HRef="${escapeXml(link)}"` : "";
  const nextStyle = href && !style ? "Link" : style;
  const styleAttribute = nextStyle ? ` ss:StyleID="${nextStyle}"` : "";

  return `<Cell${styleAttribute}${href}><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

function escapeXml(value: ExcelCell) {
  return normalizeCell(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function normalizeCell(value: ExcelCell) {
  if (isLinkCell(value)) {
    return value.text;
  }

  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}

function isUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function isLinkCell(value: ExcelCell): value is ExcelLinkCell {
  return typeof value === "object" && value !== null && "text" in value && "href" in value;
}

function createFileCell(id: string, fileName: string | null | undefined, type: "photo" | "cv"): ExcelCell {
  if (!fileName) {
    return "";
  }

  const href = createFileLink(id, type);

  return {
    text: fileName,
    href
  };
}

function createFileLink(id: string, type: "photo" | "cv") {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL ?? fallbackBackendUrl).replace(/\/$/, "");

  return `${baseUrl}/api/join-team/${id}/${type}`;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function formatPhone(value: string | number | null | undefined) {
  if (!value) return "";

  const phone = String(value);

  if (phone.length === 10) {
    return `+91 ${phone}`;
  }

  return phone.startsWith("91") ? `+${phone}` : phone;
}
