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

    const accessToken = request.cookies.get('access_token')?.value
    const refreshToken = request.cookies.get('refresh_token')?.value

    const isGuestPath = GUEST_PATHS.some(path => pathname.startsWith(path))
    const isAccessTokenValid = accessToken && isValidToken(accessToken)
    const isRefreshTokenValid = refreshToken && isValidToken(refreshToken)

    if (isGuestPath) {
        if (isAccessTokenValid || isRefreshTokenValid) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (!isAccessTokenValid) {
        if (isRefreshTokenValid) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = NextResponse.next()
    response.cookies.set('user', accessToken, {
        path: '/',
        httpOnly: false,
    })

    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
    ],
}