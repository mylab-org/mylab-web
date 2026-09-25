import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostLabsJoinPayloadType, PostLabsJoinResponseType } from '../model/types'

type Options = {
  /** 쿠키 미저장 온보딩 구간에서만 사용. 있으면 Authorization을 직접 주입합니다. */
  accessToken?: string
}

export const postLabsJoin = async (payload: PostLabsJoinPayloadType, options?: Options) => {
  const response = await axiosPost<ApiResponseType<PostLabsJoinResponseType>, PostLabsJoinPayloadType>(
    ENDPOINTS.LABS.JOIN,
    payload,
    options?.accessToken
      ? {
          headers: { Authorization: `Bearer ${options.accessToken}` },
          skipAuth: true,
          skipRefresh: true,
        }
      : undefined,
  )

  return response.data
}
