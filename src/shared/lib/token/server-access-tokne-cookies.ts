import { cookies, headers } from 'next/headers'
import { ACCESS_TOKEN_COOKIE_KEY, CURRENT_ACCESS_TOKEN_HEADER } from '@/shared/constant/token'
import type { NextRequest } from 'next/server'

type CookieReader = {
  get: (name: string) => { value?: string } | undefined
}

type RequestLikeWithCookies = {
  cookies: CookieReader
}

// SSR에서 사용할 AT 반환
export async function getServerAccessToken() {
  const requestHeaders = await headers()
  const forwardedAccessToken = requestHeaders.get(CURRENT_ACCESS_TOKEN_HEADER)

  if (forwardedAccessToken) {
    // proxy가 같은 요청 안에서 refresh한 최신 토큰을 내부 헤더로 넘긴 경우,
    // 서버 컴포넌트/레이아웃 fetch는 쿠키보다 이 값을 우선 사용해 stale cookie 재사용을 막습니다.
    return forwardedAccessToken
  }

  // 서버 컴포넌트에서는 현재 요청 쿠키 저장소에서 access token을 직접 읽습니다.
  return (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value ?? null
}

// SSR에서 사용할 쿠키를 반환
export async function getServerRequestCookieHeader() {
  // 서버 refresh 요청은 브라우저가 보낸 원본 Cookie 헤더를 그대로 전달해야,
  // refresh token 같은 HttpOnly 쿠키를 같은 세션 맥락으로 백엔드에 재전송할 수 있습니다.
  return (await headers()).get('cookie')
}

// 요청의 쿠키에서 AT를 반환
export function getAccessTokenFromRequest(request: NextRequest | RequestLikeWithCookies) {
  // proxy나 route handler처럼 NextRequest를 직접 받는 곳에서는 request.cookies에서 같은 키를 읽습니다.
  // 서버 컴포넌트용 cookies() 호출과 읽는 기준을 맞춰 인증 진입 판단을 일관되게 유지합니다.
  return request.cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value ?? null
}
