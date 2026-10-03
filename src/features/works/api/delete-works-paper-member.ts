import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteWorksPaperMember = async (labId: number, paperId: number, memberUserId: number) => {
  const response = await axiosDelete<ApiResponseType<WorksPaperDetailResponseType>>(
    ENDPOINTS.PAPER.MEMBER_USER_ID(labId, paperId, memberUserId),
  )

  return response.data
}
