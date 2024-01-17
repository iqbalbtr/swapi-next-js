import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
    const token: any = await getToken({
        secret: process.env.SECRET_KEY,
        req
    })

    if (req.nextUrl.pathname.startsWith("/wishlist")){
        if(!token) {
            return NextResponse.rewrite(new URL('/auth', req.url))
        }
    }

    if(req.nextUrl.pathname.startsWith("/auth")) {
        if(token) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
}