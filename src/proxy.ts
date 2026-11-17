import { type NextRequest, NextResponse } from 'next/server'
import { DEFAULT_BOARD_CATEGORY_ID } from './features/board/model/constants'
import { BASE_PATHS } from './shared/constant/routes'
import { ACCESS_TOKEN_COOKIE_KEY, CURRENT_ACCESS_TOKEN_HEADER, SESSION_EXPIRED_ROUTE } from './shared/constant/token'
import { shouldRefreshAccessTokenOnServer } from './shared/lib/token/access-token-expiry'
import { getAccessTokenFromRequest } from './shared/lib/token/server-access-tokne-cookies'
import { refreshServerSession } from './shared/lib/token/server-refresh-session'

/** (loggedOut) 공개 라우트 — 로그인 상태면 접근 불가 */
const GUEST_ONLY_ROUTES = ['/login', '/signup', '/survey', '/email-validate'] as const

/** (loggedIn) 보호 라우트 — 비로그인이면 로그인으로 */
const AUTH_REQUIRED_ROUTES = ['/board', '/calendar', '/works', '/more'] as const

/** 모바일 기기 판별용 User-Agent 패턴 (app/(loggedIn)/board 페이지들과 동일) */
const MOBILE_USER_AGENT_REGEX = /Android|iPhone|iPad|iPod|Mobile/i

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

// cookie의 AT만 새값으로 교체
function buildCookieHeaderWithAccessToken({
  cookieHeader,
  nextAccessToken,
}: {
  cookieHeader: string | null
  nextAccessToken: string
}) {
  // request Cookie 헤더에는 name=value 쌍만 있으므로,
  // 기존 쿠키 중 AT만 교체하여 RT 같은 다른 세션 쿠키는 그대로 유지
  const cookieEntries = (cookieHeader ?? '')
    .split(';')
    .map(entry => entry.trim())
    .filter(Boolean)
    .filter(entry => !entry.startsWith(`${ACCESS_TOKEN_COOKIE_KEY}=`))

  return [`${ACCESS_TOKEN_COOKIE_KEY}=${encodeURIComponent(nextAccessToken)}`, ...cookieEntries].join('; ')
}

// 새로운 AT로 Header(SSR에 사용)의 토큰 교체
function buildAuthenticatedResponse({
  requestHeaders,
  nextAccessToken,
  secureCookie,
  upstreamSetCookies = [],
}: {
  requestHeaders: Headers
  nextAccessToken?: string
  secureCookie: boolean
  upstreamSetCookies?: string[]
}) {
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (nextAccessToken) {
    // 브라우저 다음 요청뿐 아니라 현재 응답 이후의 클라이언트 네비게이션도
    // 새 AT을 기준으로 시작할 수 있게 응답 쿠키를 같이 갱신
    response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, nextAccessToken, {
      path: '/',
      sameSite: 'lax',
      secure: secureCookie,
    })
  }

  // 백엔드가 회전시킨 httpOnly RT Set-Cookie를 브라우저에 그대로 전달합니다.
  for (const setCookie of upstreamSetCookies) {
    response.headers.append('Set-Cookie', setCookie)
  }

  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  const secureCookie = request.nextUrl.protocol === 'https:'

  // 메뉴 hover 등으로 발생하는 prefetch(RSC) 요청을 식별합니다.
  // Next App Router는 prefetch 네비게이션에 Next-Router-Prefetch 헤더를 싣고,
  // 브라우저 단 프리패치는 Sec-Purpose: prefetch를 보냅니다.
  const isPrefetch =
    request.headers.get('Next-Router-Prefetch') === '1' ||
    (request.headers.get('Sec-Purpose')?.includes('prefetch') ?? false)

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

  // PC에서 /board 접근 → 기본 카테고리(/board/1)로
  // - 모바일의 /board는 카테고리 목록 화면이라 그대로 통과
  // - 페이지(서버 컴포넌트)에서 redirect()를 호출하면 렌더가 중간에 끊겨
  //   개발 모드에서 "cannot have a negative time stamp" 성능 측정 오류가 발생하므로,
  //   렌더 전 요청 단계인 proxy에서 처리
  if (pathname === BASE_PATHS.BOARD && !MOBILE_USER_AGENT_REGEX.test(request.headers.get('user-agent') ?? '')) {
    return NextResponse.redirect(new URL(`${BASE_PATHS.BOARD}/${DEFAULT_BOARD_CATEGORY_ID}`, request.url))
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

  // prefetch는 사용자가 실제로 이동하지 않을 수도 있는 백그라운드 워밍입니다.
  // 여기서 refresh를 돌리면 1회용 refresh token을 소모하고 응답 Set-Cookie로 토큰을 회전시켜
  // 동시 진행되는 실제 요청과 경합할 수 있으므로, prefetch에서는 회전 없이 현재(만료 임박이지만 아직 유효한) AT로 통과시킵니다.
  // 실제 네비게이션 시 다시 proxy를 거치며 그때 refresh됩니다.
  if (isPrefetch) {
    console.log('proxy skip refresh for prefetch', { pathname })
    return buildAuthenticatedResponse({
      requestHeaders,
      secureCookie,
    })
  }

  try {
    // token refresh
    const { nextAccessToken, setCookies } = await refreshServerSession({
      cookieHeader: request.headers.get('cookie'),
      accessToken,
    })

    // Cookie의 AT 교체
    const nextCookieHeader = buildCookieHeaderWithAccessToken({
      cookieHeader: request.headers.get('cookie'),
      nextAccessToken,
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
      secureCookie,
      upstreamSetCookies: setCookies,
    })
  } catch {
    // Refresh 실패; RT 만료, 세션 유효하지 않음, refresh API 호출 실패
    // 세션 종료 처리 페이지로 이동
    const sessionExpiredUrl = new URL(SESSION_EXPIRED_ROUTE, request.url)
    console.log('proxy redirect to session expired', {
      pathname,
      redirectTo: sessionExpiredUrl.toString(),
    })
    return NextResponse.redirect(sessionExpiredUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
