import type { UsersMeResponseType } from '@/entities/user/model/types'
import { axiosPatch } from '@/shared/api'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchUsersMePayloadType } from '../model/types'

export const patchUsersMe = async (payload: PatchUsersMePayloadType) => {
  const response = await axiosPatch<ApiResponseType<UsersMeResponseType>, PatchUsersMePayloadType>(
    ENDPOINTS.USERS.ROOT,
    payload,
  )

  return response.data
}
