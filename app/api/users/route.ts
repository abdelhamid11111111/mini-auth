import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error  ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
