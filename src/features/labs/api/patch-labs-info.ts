import type { LabInfoResponseType } from '@/entities/labs/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchLabsInfoPayloadType } from '../model/types'

export const patchLabsInfo = async (labId: number, payload: PatchLabsInfoPayloadType) => {
  const response = await axiosPatch<ApiResponseType<LabInfoResponseType>, PatchLabsInfoPayloadType>(
    ENDPOINTS.LABS.LAB_ID(labId),
    payload,
  )

  return response.data
}
