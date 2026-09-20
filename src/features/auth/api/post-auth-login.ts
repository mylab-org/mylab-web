import { axiosInstance } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostAuthLoginPayloadType, PostAuthLoginResponseType } from '../model/types'

export const postAuthLogin = async (payload: PostAuthLoginPayloadType) => {
  const response = await axiosInstance.request<ApiResponseType<PostAuthLoginResponseType>>({
    url: ENDPOINTS.AUTH.LOGIN,
    method: 'POST',
    data: payload,
    skipAuth: true,
  })

  return response.data
}
