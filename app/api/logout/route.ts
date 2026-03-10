import { NextResponse } from "next/server";


export async function POST(){
    const res = NextResponse.json({ success: true })

    // clear the cookie
    res.cookies.set('token', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/'
    })
    return res
}