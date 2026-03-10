import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET() {
  // get cookie
  const cookieStore = await cookies();
  // get token from cookie
  const token = cookieStore.get("token")?.value;

  if (!token) return NextResponse.json({ user: null });

  // verify token
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ user: null });

  return NextResponse.json({ user: payload });
}
