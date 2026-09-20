import { type NextRequest, NextResponse } from 'next/server'
import { getAccessTokenFromRequest } from './shared/lib/token/server-access-tokne-cookies'

/** (loggedOut) 공개 라우트 — 비로그인만 접근 가능 */
const GUEST_ONLY_ROUTES = ['/login', '/signup', '/survey', '/email-validate'] as const

function isMatchRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

function isGuestOnlyRoute(pathname: string) {
  return GUEST_ONLY_ROUTES.some(route => isMatchRoute(pathname, route))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = getAccessTokenFromRequest(request)

  // 로그인 상태에서 loggedOut 공개 경로 접근 → 홈으로
  if (accessToken && isGuestOnlyRoute(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 비로그인 상태에서 loggedIn 경로 접근 → 로그인으로
  if (!accessToken && !isGuestOnlyRoute(pathname)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
