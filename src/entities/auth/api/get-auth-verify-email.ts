import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const getAuthVerifyEmail = async () => {
  const response = await axiosGet<ApiResponseType<void>>(ENDPOINTS.AUTH.VERIFY_EMAIL, {
    skipAuth: true,
  })

  return response.data
}
