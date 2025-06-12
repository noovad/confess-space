import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_PATHS = ["/login", "/sign-up"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("Authorization")?.value;

    if (AUTH_PATHS.includes(pathname)) {
        if (token) {
            try {
                const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN!);
                const { payload } = await jwtVerify(token, secret);

                if (payload && (!payload.exp || Date.now() < payload.exp * 1000)) {
                    return NextResponse.redirect(new URL("/space", req.url));
                }
            } catch (err) {

                console.error("Middleware auth error:", err);
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN!);
        const { payload } = await jwtVerify(token, secret);

        if (payload.exp && Date.now() >= payload.exp * 1000) {
            throw new Error("Token expired");
        }

        return NextResponse.next();
    } catch (err) {
        console.error("Middleware auth error:", err);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/", "/space", "/space/:path*", "/login", "/sign-up"],
};
