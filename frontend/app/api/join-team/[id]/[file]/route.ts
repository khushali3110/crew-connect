import { headers } from "next/headers";
import { NextResponse } from "next/server";

const fallbackBackendUrls = ["https://crew-connect1.onrender.com", "https://codecraften.onrender.com", "https://crew-connect-backend.onrender.com", "http://localhost:3000"];

export async function GET(_request: Request, { params }: { params: { id: string; file: string } }) {
  if (params.file !== "photo" && params.file !== "cv") {
    return NextResponse.json({ success: false, message: "Invalid file type" }, { status: 400 });
  }

  const backendUrls = getBackendUrls();
  const currentHost = headers().get("host") ?? "";

  for (const backendUrl of backendUrls) {
    if (backendUrl.includes(currentHost)) {
      continue;
    }

    try {
      const response = await fetch(`${backendUrl}/api/join-team/${params.id}/${params.file}`, {
        cache: "no-store"
      });

      if (!response.ok) {
        continue;
      }

      const body = await response.arrayBuffer();
      const contentType = response.headers.get("content-type") ?? "application/octet-stream";
      const contentDisposition = response.headers.get("content-disposition") ?? `attachment; filename="${params.file}"`;

      return new NextResponse(body, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": contentDisposition
        }
      });
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    {
      success: false,
      message: "File not found. Please make sure backend is deployed and this record was submitted after file upload support was added."
    },
    { status: 404 }
  );
}

function getBackendUrls() {
  const urls = [process.env.NEXT_PUBLIC_API_URL, process.env.API_URL, ...fallbackBackendUrls].filter(Boolean) as string[];
  const uniqueUrls: string[] = [];

  for (const url of urls) {
    const normalizedUrl = url.replace(/\/$/, "");

    if (!uniqueUrls.includes(normalizedUrl)) {
      uniqueUrls.push(normalizedUrl);
    }
  }

  return uniqueUrls;
}
