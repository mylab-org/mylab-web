import { type NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_TOKEN_COOKIE_KEY,
  CURRENT_ACCESS_TOKEN_HEADER,
  REFRESH_TOKEN_COOKIE_KEY,
  SESSION_EXPIRED_ROUTE,
} from './shared/constant/token'
import { shouldRefreshAccessTokenOnServer } from './shared/lib/token/access-token-expiry'
import { getAccessTokenFromRequest, getRefreshTokenFromRequest } from './shared/lib/token/server-access-tokne-cookies'
import { refreshServerSession } from './shared/lib/token/server-refresh-session'

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

//

function buildCookieHeaderWithTokens({
  cookieHeader,
  nextAccessToken,
  nextRefreshToken,
}: {
  cookieHeader: string | null
  nextAccessToken: string
  nextRefreshToken?: string | null
}) {
  const cookieEntries = (cookieHeader ?? '')
    .split(';')
    .map(entry => entry.trim())
    .filter(Boolean)
    // AT, RT 둘 다 기존 값 제거
    .filter(
      entry => !entry.startsWith(`${ACCESS_TOKEN_COOKIE_KEY}=`) && !entry.startsWith(`${REFRESH_TOKEN_COOKIE_KEY}=`),
    )
  const nextCookies = [`${ACCESS_TOKEN_COOKIE_KEY}=${encodeURIComponent(nextAccessToken)}`]
  if (nextRefreshToken) {
    nextCookies.push(`${REFRESH_TOKEN_COOKIE_KEY}=${encodeURIComponent(nextRefreshToken)}`)
  }
  return [...nextCookies, ...cookieEntries].join('; ')
}

// 새로운 AT로 Header(SSR에 사용)의 토큰 교체
function buildAuthenticatedResponse({
  requestHeaders,
  nextAccessToken,
  nextRefreshToken,
  secureCookie,
}: {
  requestHeaders: Headers
  nextAccessToken?: string
  nextRefreshToken?: string | null
  secureCookie: boolean
}) {
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  if (nextAccessToken) {
    response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, nextAccessToken, {
      path: '/',
      sameSite: 'lax',
      secure: secureCookie,
    })
  }
  if (nextRefreshToken) {
    response.cookies.set(REFRESH_TOKEN_COOKIE_KEY, nextRefreshToken, {
      path: '/',
      sameSite: 'lax',
      secure: secureCookie,
      // 백엔드가 HttpOnly였다면 여기도 httpOnly: true
    })
  }
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  const secureCookie = request.nextUrl.protocol === 'https:'

  const accessToken = getAccessTokenFromRequest(request)
  const refreshToken = getRefreshTokenFromRequest(request)

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

  // 토큰이 없으면 refresh/헤더 갱신 로직은 건너뛰고 그대로 통과
  if (!accessToken) {
    return buildAuthenticatedResponse({
      requestHeaders,
      secureCookie,
    })
  }

  // SSR 할때 같은 요청 안에서 AT을 확실히 읽을 수 있게, 현재 토큰을 내부 헤더로도 함께 전달합니다.
  requestHeaders.set(CURRENT_ACCESS_TOKEN_HEADER, accessToken)

  // AT의 유효기간이 남아 있다면 Header(SSR)의 AT 교체
  if (!shouldRefreshAccessTokenOnServer(accessToken)) {
    console.log('proxy allow authenticated route', { pathname })
    return buildAuthenticatedResponse({
      requestHeaders,
      secureCookie,
    })
  }

  try {
    // token refresh
    const { nextAccessToken, nextRefreshToken } = await refreshServerSession({
      cookieHeader: request.headers.get('cookie'),
      refreshToken,
    })

    // Cookie의 AT 교체
    const nextCookieHeader = buildCookieHeaderWithTokens({
      cookieHeader: request.headers.get('cookie'),
      nextAccessToken,
      nextRefreshToken,
    })

    // 현재 요청을 이어받는 서버 컴포넌트/레이아웃도 새 토큰을 읽을 수 있어야 하므로,
    // downstream request Cookie 헤더도 함께 교체
    requestHeaders.set(CURRENT_ACCESS_TOKEN_HEADER, nextAccessToken)
    requestHeaders.set('cookie', nextCookieHeader)

    console.log('proxy refreshed expired access token', {
      pathname,
    })

    // Header의 Token 교체
    return buildAuthenticatedResponse({
      requestHeaders,
      nextAccessToken,
      nextRefreshToken,
      secureCookie,
    })
  } catch {
    // Refresh 실패; RT 만료, 세션 유효하지 않음, refresh API 호출 실패
    // 세션 종료 처리 페이지로 이동
    const sessionExpiredUrl = new URL(SESSION_EXPIRED_ROUTE, request.url)
    console.log('proxy redirect to session expired', {
      pathname,
      redirectTo: sessionExpiredUrl.toString(),
      refreshToken,
    })
    return NextResponse.redirect(sessionExpiredUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
