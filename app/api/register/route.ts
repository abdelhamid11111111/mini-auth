import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, email, password, confirmPass } = await req.json();

    const checkIfEmailExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!username || !email || !password || !confirmPass) {
      return NextResponse.json({ error: "Something is required" }, {status: 400});
    }

    if (checkIfEmailExist) {
      return NextResponse.json(
        { error: "email already exist" },
        { status: 400 },
      );
    }

    const checkIfUsrNameExist = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (checkIfUsrNameExist) {
      return NextResponse.json(
        { error: "username already exist" },
        { status: 400 },
      );
    }

    if (password !== confirmPass) {
      return NextResponse.json({ error: "passwords not match" }, {status: 400});
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const createUsr = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPass,
      },
    });

    return NextResponse.json(
      { success: true, user: { id: createUsr.id, email: createUsr.email } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
