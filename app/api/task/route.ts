import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title } = body;
    if (!title) {
      return NextResponse.json({ error: "fill are required" }, { status: 400 });
    }
    const taskCreated = await prisma.task.create({
      data: {
        title: title,
        userId: session.user.id,
      },
    });
    return NextResponse.json(taskCreated, { status: 201 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
