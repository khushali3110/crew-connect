import { headers } from "next/headers";
import { getBackendBaseUrl } from "@/lib/backend-url";
import type { ApiListResponse, EventItem, IndustryItem, JoinTeamRequest, TeamRequest } from "@/lib/types";

function getBaseUrl() {
  const host = headers().get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getEvents() {
  return fetchJson<EventItem[]>("/api/events");
}

export function getIndustries() {
  return fetchJson<IndustryItem[]>("/api/industries");
}

async function fetchBackendJson<T>(path: string): Promise<T> {
  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getJoinTeamRequests() {
  return fetchBackendJson<ApiListResponse<JoinTeamRequest>>("/api/join-team");
}

export function getTeamRequests() {
  return fetchBackendJson<ApiListResponse<TeamRequest>>("/api/team-requests");
}
