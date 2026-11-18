import { NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/shared/constant/token'

function expireCookie(
  response: NextResponse,
  name: string,
  {
    httpOnly = false,
    secure,
    domain,
  }: {
    httpOnly?: boolean
    secure: boolean
    domain?: string
  },
) {
  // 세션 만료 응답에서는 브라우저가 들고 있던 인증/권한 쿠키를 심을 때와 같은 속성으로 제거합니다.
  response.cookies.set(name, '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
    secure,
    httpOnly,
    ...(domain ? { domain } : {}),
  })
}

export async function GET(request: Request) {
  const loginUrl = new URL('/login', request.url)
  const response = NextResponse.redirect(loginUrl)
  const secure = new URL(request.url).protocol === 'https:'
  // 배포에서 Nest가 Domain=.mylab.com 으로 심은 RT를 지울 때 동일 Domain 필요. 로컬은 비움.
  const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined

  expireCookie(response, ACCESS_TOKEN_COOKIE_KEY, { secure })
  expireCookie(response, REFRESH_TOKEN_COOKIE_KEY, {
    httpOnly: true,
    secure,
    domain: cookieDomain,
  })

  return response
}
