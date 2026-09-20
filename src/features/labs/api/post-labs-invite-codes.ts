import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostLabsInviteCodesPayloadType, PostLabsInviteCodesResponseType } from '../model/types'

export const postLabsInviteCodes = async (labId: number, payload?: PostLabsInviteCodesPayloadType) => {
  const response = await axiosPost<ApiResponseType<PostLabsInviteCodesResponseType>, PostLabsInviteCodesPayloadType>(
    ENDPOINTS.LABS.INVITE_CODES(labId),
    payload,
  )

  return response.data
}
