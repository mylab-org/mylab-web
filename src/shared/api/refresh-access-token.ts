import { ENDPOINTS } from './endpoint'
import { getRefreshToken, setAccessToken, setRefreshToken } from '../lib/token/client-access-token-store'
import type { AxiosInstance } from 'axios'

// 리프레시 성공 시 서버가 내려주는 실제 result payload입니다.
type RefreshAccessTokenApiResult = {
  accessToken: string
  refreshToken: string
}

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken(instance: AxiosInstance) {
  if (refreshPromise) {
    return refreshPromise
  }

  const refreshToken = getRefreshToken()

  refreshPromise = (async () => {
    const response = await instance.post<ApiResponseType<RefreshAccessTokenApiResult>>(
      ENDPOINTS.AUTH.REFRESH,
      undefined,
      {
        // refresh 요청 자체는 401/403이 와도 다시 refresh하지 않고 즉시 로그아웃 분기로 내려가야 합니다.
        // skipAuth: true 를 임시방편으로 함. 리프레시토큰을 액세스토큰을 넘기는 키와 동일한 이름으로 넘기니 인터셉터에서 액세스토큰으로 다시 덮어씀
        skipAuth: true,
        skipRefresh: true,
        // 왜 Authorization 인지 모르겠네 ㅋㅋㅋㅋㅋㅋㅋㅋ
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )

    // const nextAccessToken = response.data.result?.accessToken
    const nextAccessToken = response.data.data.accessToken
    const nextRefreshToken = response.data.data.refreshToken

    if (!nextAccessToken) {
      throw new Error('액세스 토큰 refresh 응답에 accessToken이 없습니다.')
    }

    setAccessToken(nextAccessToken)
    setRefreshToken(nextRefreshToken)

    return nextAccessToken
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}
