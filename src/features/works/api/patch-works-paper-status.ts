import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchWorksPaperStatusPayloadType } from '../model/types'

export const patchWorksPaperStatus = async (
  labId: number,
  paperId: number,
  payload: PatchWorksPaperStatusPayloadType,
) => {
  const response = await axiosPatch<ApiResponseType<WorksPaperDetailResponseType>, PatchWorksPaperStatusPayloadType>(
    ENDPOINTS.PAPER.STATUS(labId, paperId),
    payload,
  )

  return response.data
}
