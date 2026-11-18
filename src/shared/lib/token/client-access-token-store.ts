// 클라이언트에서 access token을 다루는 가장 얇은 저장소입니다.
// - 평소 요청 인터셉터에서는 메모리 값을 우선 사용해 빠르게 읽고
// - 새로고침 직후에는 쿠키에서 값을 복구해 다시 메모리에 올립니다.
// refresh token은 백엔드 HttpOnly 쿠키이므로 여기서 읽거나 쓰지 않습니다.

import { ACCESS_TOKEN_COOKIE_KEY } from '@/shared/constant/token'

let accessToken: string | null = null
// refresh 실패 등으로 강제 로그아웃이 필요할 때, 실제 화면 이동을 담당할 콜백입니다.
let logoutHandler: (() => void | Promise<void>) | null = null

function canUseBrowserCookie() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function readAccessTokenFromCookie(key: string) {
  if (!canUseBrowserCookie()) {
    return null
  }

  const cookie = document.cookie.split('; ').find(item => item.startsWith(`${key}=`))

  if (!cookie) {
    return null
  }

  const [, value = ''] = cookie.split('=')
  return value ? decodeURIComponent(value) : null
}

function writeAccessTokenToCookie(token: string | null, key: string) {
  if (!canUseBrowserCookie()) {
    return
  }

  const isSecureContext = window.location.protocol === 'https:'

  if (token) {
    const cookieOptions = [`${key}=${encodeURIComponent(token)}`, 'Path=/', 'SameSite=Lax']

    if (isSecureContext) {
      cookieOptions.push('Secure')
    }

    document.cookie = cookieOptions.join('; ')
    return
  }

  const cookieOptions = [`${key}=`, 'Path=/', 'Max-Age=0', 'Expires=Thu, 01 Jan 1970 00:00:00 GMT', 'SameSite=Lax']

  if (isSecureContext) {
    cookieOptions.push('Secure')
  }

  document.cookie = cookieOptions.join('; ')
}

export function getAccessToken() {
  accessToken = readAccessTokenFromCookie(ACCESS_TOKEN_COOKIE_KEY)
  return accessToken
}

export function setAccessToken(token: string) {
  accessToken = token
  writeAccessTokenToCookie(token, ACCESS_TOKEN_COOKIE_KEY)
}

export function clearAccessToken() {
  // AT만 제거합니다. httpOnly RT는 로그아웃 API의 Set-Cookie clear로만 지워집니다.
  accessToken = null
  writeAccessTokenToCookie(null, ACCESS_TOKEN_COOKIE_KEY)
}

export function registerLogoutHandler(handler: (() => void | Promise<void>) | null) {
  logoutHandler = handler
}

export async function runLogoutHandler() {
  if (!logoutHandler) {
    return
  }

  await logoutHandler()
}
