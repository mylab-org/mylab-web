import { axiosInstance } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostAuthLoginPayloadType } from '../model/types'

export const postAuthLogin = async (payload: PostAuthLoginPayloadType) => {
  const response = await axiosInstance.request<unknown>({
    url: ENDPOINTS.AUTH.LOGIN,
    method: 'POST',
    data: payload,
    skipAuth: true,
  })

  return response.data
}
