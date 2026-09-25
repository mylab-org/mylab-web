import { axiosInstance } from './axios-client'
import { ENDPOINTS } from './endpoint'

type ProvisionalTokens = {
  accessToken: string
  refreshToken: string
}

type RefreshAccessTokenApiResult = {
  accessToken: string
  refreshToken: string
}

let provisionalRefreshPromise: Promise<ProvisionalTokens> | null = null

/**
 * 온보딩(쿠키 미저장) 구간의 RT로 AT를 재발급합니다.
 * 쿠키에는 쓰지 않고, 갱신된 토큰 쌍만 반환합니다.
 */
export async function refreshProvisionalAccessToken(refreshToken: string): Promise<ProvisionalTokens> {
  if (provisionalRefreshPromise) {
    return provisionalRefreshPromise
  }

  provisionalRefreshPromise = (async () => {
    const response = await axiosInstance.post<ApiResponseType<RefreshAccessTokenApiResult>>(
      ENDPOINTS.AUTH.REFRESH,
      undefined,
      {
        skipAuth: true,
        skipRefresh: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )

    const nextAccessToken = response.data.data.accessToken
    const nextRefreshToken = response.data.data.refreshToken

    if (!nextAccessToken || !nextRefreshToken) {
      throw new Error('온보딩 세션 refresh 응답에 토큰이 없습니다.')
    }

    return {
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
    }
  })().finally(() => {
    provisionalRefreshPromise = null
  })

  return provisionalRefreshPromise
}
