import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkCredentials, expectedToken, isAdminConfigured } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured yet (set ADMIN_* env vars)." },
      { status: 503 },
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = String(body.username || "");
    password = String(body.password || "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const token = await expectedToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
