import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { signToken } from "@/lib/auth/jwt";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "something required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 401 });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = signToken({ id: user.id, email: user.email , username: user.username});

    const res = NextResponse.json({ success: true });

    // Set token in httpOnly cookie → user is now logged in
    res.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/' // <- send to all api routes
    })

    return res;


  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
