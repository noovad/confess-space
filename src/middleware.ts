import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

const GUEST_PATHS = ['/login', '/sign-up']

interface JwtPayload {
    exp?: number
}

function isValidToken(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token)
        return !!decoded.exp && Date.now() < decoded.exp * 1000
    } catch {
        return false
    }
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const token = request.cookies.get('access_token')?.value

    if (GUEST_PATHS.some(path => pathname.startsWith(path))) {
        if (token && isValidToken(token)) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (!token || !isValidToken(token)) {
        const refreshToken = request.cookies.get('refresh_token')?.value
        if (refreshToken) {
            return NextResponse.next()
        }

        return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = NextResponse.next();

    response.cookies.set('user', token, {
        path: '/',
        httpOnly: false,
    });

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
    ],
}