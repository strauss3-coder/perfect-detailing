import { NextResponse, type NextRequest } from "next/server";
import { recordEvent } from "@/lib/content/store";

export const runtime = "nodejs";

/**
 * First-party page view collection.
 *
 * No cookies, no identifiers, no third-party script. We record the path, the
 * referrer host and nothing else, which is enough to tell the owner which
 * pages earn enquiries without tracking anybody.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { path?: string; referrer?: string; kind?: string };
    const path = typeof body.path === "string" ? body.path.slice(0, 300) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "";
    const kind = body.kind === "cta" || body.kind === "calculator" ? body.kind : "pageview";

    await recordEvent({ kind, path, referrer, meta: {} });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
