const ACCESS_TOKEN_REFRESH_SKEW_MS = 5000 // 토큰 만료 직전 5초를 미리 refresh 대상으로 보기

type JwtPayload = {
  // JWT 표준 exp 클레임입니다. 초 단위 unix timestamp를 사용
  exp?: number
}

function normalizeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const paddingLength = (4 - (normalized.length % 4)) % 4

  return `${normalized}${'='.repeat(paddingLength)}`
}

function decodeJwtPayload(token: string): JwtPayload | null {
  const [, payload = ''] = token.split('.')

  if (!payload) {
    return null
  }

  try {
    return JSON.parse(atob(normalizeBase64Url(payload))) as JwtPayload
  } catch {
    return null
  }
}

// SSR전에 AT의 유효기간을 확인해서 refresh가 필요한지 여부를 반환
export function shouldRefreshAccessTokenOnServer(accessToken: string, now = Date.now()) {
  const payload = decodeJwtPayload(accessToken)

  // exp를 읽지 못하는 토큰은 백엔드에서 곧바로 401이 날 가능성이 높으므로,
  // SSR 전에 먼저 refresh를 시도해 페이지별 redirect 분기를 줄임
  if (typeof payload?.exp !== 'number') {
    return true
  }

  return payload.exp * 1000 <= now + ACCESS_TOKEN_REFRESH_SKEW_MS
}
