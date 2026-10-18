import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchLabsMemberChangeRolePayloadType } from '../model/types'

export const patchLabsMemberChangeRole = async (
  labId: number,
  userId: number,
  payload: PatchLabsMemberChangeRolePayloadType,
) => {
  const response = await axiosPatch<ApiResponseType<void>, PatchLabsMemberChangeRolePayloadType>(
    ENDPOINTS.LABS.CHANGE_ROLE(labId, userId),
    payload,
  )

  return response.data
}
