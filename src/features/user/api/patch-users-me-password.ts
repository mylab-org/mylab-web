import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchUsersMePasswordPayloadType } from '../model/types'

export const patchUsersMePassword = async (payload: PatchUsersMePasswordPayloadType) => {
  const response = await axiosPatch<ApiResponseType<unknown>, PatchUsersMePasswordPayloadType>(
    ENDPOINTS.USERS.PASSWORD,
    payload,
  )

  return response.data
}
