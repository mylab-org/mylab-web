import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostWorksPaperCreatePayloadType } from '../model/types'

export const postWorksPaperCreate = async (labId: number, payload: PostWorksPaperCreatePayloadType) => {
  const response = await axiosPost<ApiResponseType<WorksPaperDetailResponseType>, PostWorksPaperCreatePayloadType>(
    ENDPOINTS.PAPER.ROOT(labId),
    payload,
  )

  return response.data
}
