import { NextResponse } from "next/server";
import { readIndustries } from "@/lib/server-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const industries = await readIndustries();
  return NextResponse.json(industries);
}
