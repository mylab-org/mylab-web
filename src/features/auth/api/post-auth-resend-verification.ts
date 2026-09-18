import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostAuthResendVerificationPayloadType } from '../model/types'

export const postAuthResendVerification = async (payload: PostAuthResendVerificationPayloadType) => {
  const response = await axiosPost<ApiResponseType<void>, PostAuthResendVerificationPayloadType>(
    ENDPOINTS.AUTH.RESEND_VERIFICATION,
    payload,
    {
      skipAuth: true,
    },
  )

  return response.data
}
