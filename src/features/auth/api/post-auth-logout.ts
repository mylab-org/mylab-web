import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const postAuthLogout = async () => {
  const response = await axiosPost<ApiResponseType<void>>(ENDPOINTS.AUTH.LOGOUT)

  return response.data
}
