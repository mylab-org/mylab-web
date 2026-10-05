import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { GetAuthVerifyEmailResponseType } from '../model/types'

export const getAuthVerifyEmail = async (token: string) => {
  const response = await axiosGet<ApiResponseType<GetAuthVerifyEmailResponseType>>(ENDPOINTS.AUTH.VERIFY_EMAIL, {
    params: { token },
    skipAuth: true,
  })

  return response
}
