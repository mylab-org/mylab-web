import { type NextRequest, NextResponse } from 'next/server'
import { getAccessTokenFromRequest } from './shared/lib/token/server-access-tokne-cookies'

/** (loggedOut) 공개 라우트 — 로그인 상태면 접근 불가 */
const GUEST_ONLY_ROUTES = ['/login', '/signup', '/survey', '/email-validate'] as const

/** (loggedIn) 보호 라우트 — 비로그인이면 로그인으로 */
const AUTH_REQUIRED_ROUTES = ['/board', '/calendar', '/works', '/more'] as const

function isMatchRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

function isGuestOnlyRoute(pathname: string) {
  return GUEST_ONLY_ROUTES.some(route => isMatchRoute(pathname, route))
}

function isAuthRequiredRoute(pathname: string) {
  if (pathname === '/') return true
  return AUTH_REQUIRED_ROUTES.some(route => isMatchRoute(pathname, route))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = getAccessTokenFromRequest(request)

  // 로그인 상태에서 loggedOut 경로 접근 → 홈으로
  if (accessToken && isGuestOnlyRoute(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 비로그인 상태에서 보호 경로 접근 → 로그인으로
  // 그 외 미존재 경로는 Next.js not-found로 통과
  if (!accessToken && isAuthRequiredRoute(pathname)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
