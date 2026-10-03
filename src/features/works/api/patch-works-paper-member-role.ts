import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchWorksPaperMemberRolePayloadType } from '../model/types'

export const patchWorksPaperMemberRole = async (
  labId: number,
  paperId: number,
  memberUserId: number,
  payload: PatchWorksPaperMemberRolePayloadType,
) => {
  const response = await axiosPatch<
    ApiResponseType<WorksPaperDetailResponseType>,
    PatchWorksPaperMemberRolePayloadType
  >(ENDPOINTS.PAPER.MEMBER_USER_ID(labId, paperId, memberUserId), payload)

  return response.data
}
