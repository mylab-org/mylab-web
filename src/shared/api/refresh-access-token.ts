import { ENDPOINTS } from './endpoint'
import { setAccessToken } from '../lib/token/client-access-token-store'
import type { AxiosInstance } from 'axios'

// 리프레시 성공 시 서버가 내려주는 실제 result payload입니다.
type RefreshAccessTokenApiResult = {
  accessToken: string
  loginId: string
}

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken(instance: AxiosInstance) {
  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    const response = await instance.post<ApiResponseType<RefreshAccessTokenApiResult>>(
      ENDPOINTS.USER.REFRESH,
      undefined,
      {
        // refresh 요청 자체는 401/403이 와도 다시 refresh하지 않고 즉시 로그아웃 분기로 내려가야 합니다.
        skipRefresh: true,
      },
    )

    // const nextAccessToken = response.data.result?.accessToken
    const nextAccessToken = response.headers['accessToken']

    if (!nextAccessToken) {
      throw new Error('액세스 토큰 refresh 응답에 accessToken이 없습니다.')
    }

    setAccessToken(nextAccessToken)
    return nextAccessToken
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}
