import { axiosInstance } from './axios-client'
import { ENDPOINTS } from './endpoint'

type ProvisionalTokens = {
  accessToken: string
}

type RefreshAccessTokenApiResult = {
  accessToken: string
}

let provisionalRefreshPromise: Promise<ProvisionalTokens> | null = null

/**
 * 온보딩(AT 쿠키 미저장) 구간에서 httpOnly RT 쿠키로 AT를 재발급합니다.
 * AT는 쿠키에 쓰지 않고 반환값으로만 넘깁니다.
 */
export async function refreshProvisionalAccessToken(): Promise<ProvisionalTokens> {
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
      },
    )

    const nextAccessToken = response.data.data.accessToken

    if (!nextAccessToken) {
      throw new Error('온보딩 세션 refresh 응답에 accessToken이 없습니다.')
    }

    return {
      accessToken: nextAccessToken,
    }
  })().finally(() => {
    provisionalRefreshPromise = null
  })

  return provisionalRefreshPromise
}
