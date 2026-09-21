import { NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/shared/constant/token'

function expireCookie(response: NextResponse, name: string) {
  // 세션 만료 응답에서는 브라우저가 들고 있던 인증/권한 쿠키를 같은 path 기준으로 확실히 제거합니다.
  response.cookies.set(name, '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
    secure: true,
  })
}

export async function GET(request: Request) {
  const loginUrl = new URL('/', request.url)
  const response = NextResponse.redirect(loginUrl)

  expireCookie(response, ACCESS_TOKEN_COOKIE_KEY)
  expireCookie(response, REFRESH_TOKEN_COOKIE_KEY)

  return response
}
