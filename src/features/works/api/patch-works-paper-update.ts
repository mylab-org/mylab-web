import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchWorksPaperUpdatePayloadType } from '../model/types'

export const patchWorksPaperUpdate = async (
  labId: number,
  paperId: number,
  payload: PatchWorksPaperUpdatePayloadType,
) => {
  const response = await axiosPatch<ApiResponseType<WorksPaperDetailResponseType>, PatchWorksPaperUpdatePayloadType>(
    ENDPOINTS.PAPER.PAPER_ID(labId, paperId),
    payload,
  )

  return response.data
}
