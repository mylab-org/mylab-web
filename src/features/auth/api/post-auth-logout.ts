import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

type Options = {
  /** 온보딩처럼 AT 쿠키가 없을 때 Authorization을 직접 주입합니다. */
  accessToken?: string
}

export const postAuthLogout = async (options?: Options) => {
  const response = await axiosPost<ApiResponseType<void>>(
    ENDPOINTS.AUTH.LOGOUT,
    undefined,
    options?.accessToken
      ? {
          headers: { Authorization: `Bearer ${options.accessToken}` },
          // 쿠키 AT가 없으므로 인터셉터 주입을 건너뛰고, 실패 시 refresh 루프도 막습니다.
          skipAuth: true,
          skipRefresh: true,
        }
      : undefined,
  )

  return response.data
}
