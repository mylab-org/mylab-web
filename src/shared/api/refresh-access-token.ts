import { ENDPOINTS } from './endpoint'
import { setAccessToken } from '../lib/token/client-access-token-store'
import type { AxiosInstance } from 'axios'

type RefreshAccessTokenApiResult = {
  accessToken: string
}

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken(instance: AxiosInstance) {
  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    // RT는 서버가 심은 httpOnly 쿠키로만 전달됩니다 (withCredentials).
    const response = await instance.post<ApiResponseType<RefreshAccessTokenApiResult>>(
      ENDPOINTS.AUTH.REFRESH,
      undefined,
      {
        skipAuth: true,
        skipRefresh: true,
      },
    )

    const nextAccessToken = response.data.data.accessToken

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
