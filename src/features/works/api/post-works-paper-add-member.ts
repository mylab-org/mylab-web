import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostWorksPaperAddMemberPayloadType } from '../model/types'

export const postWorksPaperAddMember = async (
  labId: number,
  paperId: number,
  payload: PostWorksPaperAddMemberPayloadType,
) => {
  const response = await axiosPost<ApiResponseType<WorksPaperDetailResponseType>, PostWorksPaperAddMemberPayloadType>(
    ENDPOINTS.PAPER.MEMBERS(labId, paperId),
    payload,
  )

  return response.data
}
