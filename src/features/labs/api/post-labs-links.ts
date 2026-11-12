import type { LabsLinkResponseType } from '@/entities/labs/model/types'
import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostLabsLinksPayloadType } from '../model/types'

export const postLabsLinks = async (labId: number, payload: PostLabsLinksPayloadType) => {
  const response = await axiosPost<ApiResponseType<LabsLinkResponseType>, PostLabsLinksPayloadType>(
    ENDPOINTS.LABS.LINKS(labId),
    payload,
  )

  return response.data
}
