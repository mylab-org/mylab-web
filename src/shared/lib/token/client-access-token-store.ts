// 클라이언트에서 access token을 다루는 가장 얇은 저장소입니다.
// - 평소 요청 인터셉터에서는 메모리 값을 우선 사용해 빠르게 읽고
// - 새로고침 직후에는 쿠키에서 값을 복구해 다시 메모리에 올립니다.

import { ACCESS_TOKEN_COOKIE_KEY } from '@/shared/constant/token'

// refresh token은 백엔드가 HttpOnly 쿠키로 관리하므로 여기서 다루지 않습니다.
let accessToken: string | null = null
// refresh 실패 등으로 강제 로그아웃이 필요할 때, 실제 화면 이동을 담당할 콜백입니다.
// 이 클라이언트 저장소는 라우터를 직접 알지 않고, 앱 초기화 시 이 핸들러만 주입받습니다.
let logoutHandler: (() => void | Promise<void>) | null = null

function canUseBrowserCookie() {
  // document.cookie는 브라우저에서만 접근 가능하므로 서버 렌더 중에는 바로 빠집니다.
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

// 쿠키의 AT 반환
function readAccessTokenFromCookie() {
  if (!canUseBrowserCookie()) {
    return null
  }

  // 프론트가 직접 저장한 access token 쿠키만 읽습니다.
  const cookie = document.cookie.split('; ').find(item => item.startsWith(`${ACCESS_TOKEN_COOKIE_KEY}=`))

  if (!cookie) {
    return null
  }

  const [, value = ''] = cookie.split('=')
  return value ? decodeURIComponent(value) : null
}

function writeAccessTokenToCookie(token: string | null) {
  if (!canUseBrowserCookie()) {
    return
  }

  // https 환경에서는 Secure를 붙여 브라우저가 안전한 연결에서만 쿠키를 전송하게 합니다.
  const isSecureContext = window.location.protocol === 'https:'

  if (token) {
    // access token은 페이지 요청 시 Next 서버도 읽을 수 있도록 일반 쿠키로 저장합니다.
    // 서버가 발급한 HttpOnly refresh token과는 목적이 다르므로 프론트에서 직접 관리합니다.
    const cookieOptions = [`${ACCESS_TOKEN_COOKIE_KEY}=${encodeURIComponent(token)}`, 'Path=/', 'SameSite=Lax']

    if (isSecureContext) {
      cookieOptions.push('Secure')
    }

    document.cookie = cookieOptions.join('; ')
    return
  }

  // 로그아웃/재발급 실패 시에는 같은 속성으로 만료 쿠키를 써서 기존 값을 확실히 제거합니다.
  const cookieOptions = [
    `${ACCESS_TOKEN_COOKIE_KEY}=`,
    'Path=/',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'SameSite=Lax',
  ]

  if (isSecureContext) {
    cookieOptions.push('Secure')
  }

  document.cookie = cookieOptions.join('; ')
}

// CSR에서 사용할 AT를 반환
export function getAccessToken() {
  accessToken = readAccessTokenFromCookie()
  return accessToken
}

export function setAccessToken(token: string) {
  // 로그인/재발급 성공 시 메모리와 쿠키를 동시에 갱신합니다.
  accessToken = token
  writeAccessTokenToCookie(token)
}

export function clearAccessToken() {
  // 로그아웃 또는 재발급 실패 시 메모리와 쿠키를 함께 지워 이후 요청이 인증 헤더를 붙이지 않게 합니다.
  accessToken = null
  writeAccessTokenToCookie(null)
}

export function registerLogoutHandler(handler: (() => void | Promise<void>) | null) {
  // 실제 로그인 화면 이동이나 전역 유저 상태 초기화는 앱 초기화 시 이 핸들러로 연결합니다.
  // 이 클라이언트 저장소는 브라우저 라우터를 직접 import하지 않고, 외부에서 주입받은 동작만 실행합니다.
  logoutHandler = handler
}

export async function runLogoutHandler() {
  // 인터셉터 등 공통 레이어에서 세션 종료가 결정됐을 때, 앱이 등록한 후속 동작을 실행합니다.
  if (!logoutHandler) {
    return
  }

  await logoutHandler()
}
