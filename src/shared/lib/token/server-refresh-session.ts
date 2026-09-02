import { ENDPOINTS } from '@/shared/api/endpoint'

type RefreshAccessTokenApiResult = {
  accessToken: string
}

type RefreshServerSessionParams = {
  // 브라우저가 보낸 전체 Cookie 헤더를 그대로 전달해, 백엔드 refresh token 검증이 같은 세션 맥락으로 이뤄지게 합니다.
  cookieHeader: string | null
  // 현재 요청이 들고 있던 access token이 있으면 refresh 호출에도 그대로 전달합니다.
  // 기존 클라이언트 인터셉터가 Authorization을 함께 보내는 흐름과 맞추기 위한 값입니다.
  accessToken: string | null
}

export class RefreshServerSessionError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'RefreshServerSessionError'
    this.status = status
  }
}

function getRefreshEndpointUrl() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('서버 refresh 요청에 사용할 NEXT_PUBLIC_API_BASE_URL이 필요합니다.')
  }

  return `${process.env.NEXT_PUBLIC_BASE_URL}${ENDPOINTS.USER.REFRESH}`
}

// 서버 컴포넌트가 직접 refresh token 쿠키를 읽을 수는 없으므로,
// 현재 요청의 Cookie 헤더를 그대로 백엔드 refresh API에 전달해 새 access token만 받아옵니다.
export async function refreshServerSession({ cookieHeader, accessToken }: RefreshServerSessionParams): Promise<string> {
  if (!cookieHeader) {
    throw new RefreshServerSessionError('refresh token 쿠키가 없어 서버 세션을 재발급할 수 없습니다.', 401)
  }

  const response = await fetch(getRefreshEndpointUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new RefreshServerSessionError(`서버 세션 refresh에 실패했습니다. (${response.status})`, response.status)
  }

  // const data = (await response.json()) as ApiResponse<RefreshAccessTokenApiResult>
  // const nextAccessToken = data.result?.accessToken
  const nextAccessToken = response.headers.get('accessToken')

  if (!nextAccessToken) {
    throw new RefreshServerSessionError('서버 세션 refresh 응답에 accessToken이 없습니다.', 500)
  }

  return nextAccessToken
}
