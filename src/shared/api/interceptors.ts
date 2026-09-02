import { ENDPOINTS } from './endpoint'
import { refreshAccessToken } from './refresh-access-token'
import { clearAccessToken, getAccessToken, runLogoutHandler } from '../lib/token/client-access-token-store'
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    // 인증 헤더를 붙이면 안 되는 요청(예: refresh 요청)에 사용합니다. => refresh에도 인증 헤더 붙도록 변경됨
    skipAuth?: boolean
    // 401 발생 시 refresh 재시도를 막아야 하는 요청에 사용합니다.
    skipRefresh?: boolean
    // 같은 요청을 두 번 이상 재시도하지 않기 위한 내부 플래그입니다.
    _retry?: boolean
  }

  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean
    skipRefresh?: boolean
    _retry?: boolean
  }
}

function applyAuthorizationHeader(config: InternalAxiosRequestConfig) {
  if (config.skipAuth) {
    return config
  }

  const accessToken = getAccessToken()

  if (!accessToken) {
    return config
  }

  console.log('헤더 추가', accessToken)

  config.headers.set('Authorization', `${accessToken}`)
  return config
}
// Axios 공통 응답 처리 규칙을 연결하는 예시입니다.
export function applyResponseInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(config => applyAuthorizationHeader(config))

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config
      const status = error.response?.status
      const isRefreshRequest = originalRequest?.url === ENDPOINTS.USER.REFRESH

      // 기본적으로는 401만 인증 만료 플로우로 보지만,
      // refresh 요청의 403은 refresh token 무효/만료 케이스로 간주해 아래 로그아웃 분기까지 내려보냅니다.
      if (!originalRequest || (status !== 401 && !(isRefreshRequest && status === 403))) {
        return Promise.reject(error)
      }

      // refresh 자체가 401/403이면 세션을 복구할 수 없으므로 즉시 로그아웃합니다.
      if (originalRequest.skipRefresh || originalRequest._retry) {
        clearAccessToken()
        await runLogoutHandler()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const nextAccessToken = await refreshAccessToken(instance)
        originalRequest.headers.set('Authorization', `Bearer ${nextAccessToken}`)
        return instance.request(originalRequest)
      } catch (refreshError) {
        clearAccessToken()
        await runLogoutHandler()
        return Promise.reject(refreshError)
      }
    },
  )
}
