import { axiosPost } from '@/shared/api'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostAuthRegisterPayloadType } from '../model/types'

export const postAuthRegister = async (payload: PostAuthRegisterPayloadType) => {
  const response = await axiosPost<ApiResponseType<void>, PostAuthRegisterPayloadType>(
    ENDPOINTS.AUTH.REGISTER,
    payload,
    {
      skipAuth: true,
    },
  )

  return response.data
}
