import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST() {
  const upstream = await fetch("https://notehub-api.goit.study/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const res = NextResponse.json({}, { status: upstream.status });
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);
  return res;
}
