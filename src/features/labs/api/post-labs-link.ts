import type { LabLinkResponseType } from '@/entities/labs/model/types'
import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostLabsLinkPayloadType } from '../model/types'

export const postLabsLink = async (labId: number, payload: PostLabsLinkPayloadType) => {
  const response = await axiosPost<ApiResponseType<LabLinkResponseType>, PostLabsLinkPayloadType>(
    ENDPOINTS.LABS.LAB_LINK(labId),
    payload,
  )

  return response.data
}
