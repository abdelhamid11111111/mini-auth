import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const tasksPerUser = await prisma.task.findMany({
      where: {
        userId: session?.user.id,
      },
    });
    return NextResponse.json(tasksPerUser, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {

    // get session
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // fetch task id
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "task id is required" },
        { status: 400 },
      );
    }

    // looking for task in db
    const task = await prisma.task.findUnique({
      where: { id },
    });

    // check task its exist
    if (!task) {
      return NextResponse.json({ error: "task not found" }, { status: 404 });
    }

    // compare task's user with logged user
    if (task.userId !== session.user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    // delete
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "task deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
