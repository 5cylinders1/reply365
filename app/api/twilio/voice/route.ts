import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const from = String(form.get("From") || "");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hi! This is Reply three six five. Your webhook is working.</Say>
  ${from ? `<Say>I see your caller I D as ${escapeForTwiML(from)}.</Say>` : ""}
  <Say>Goodbye.</Say>
  <Hangup/>
</Response>`;

  return new NextResponse(xml, { headers: { "Content-Type": "text/xml" } });
}

// minimal escaping so caller ID can't break XML
function escapeForTwiML(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
