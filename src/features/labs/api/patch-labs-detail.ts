import type { LabsDetailResponseType } from '@/entities/labs/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchLabsDetailPayloadType } from '../model/types'

export const patchLabsDetail = async (labId: number, payload: PatchLabsDetailPayloadType) => {
  const response = await axiosPatch<ApiResponseType<LabsDetailResponseType>, PatchLabsDetailPayloadType>(
    ENDPOINTS.LABS.DETAIL(labId),
    payload,
  )

  return response.data
}
