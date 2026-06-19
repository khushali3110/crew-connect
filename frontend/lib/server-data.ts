import { readFile } from "fs/promises";
import path from "path";
import type { EventItem, IndustryItem } from "@/lib/types";

async function readJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", fileName);
  const file = await readFile(filePath, "utf8");
  return JSON.parse(file) as T;
}

export async function readEvents() {
  return readJson<EventItem[]>("events.json");
}

export async function readIndustries() {
  return readJson<IndustryItem[]>("industries.json");
}
