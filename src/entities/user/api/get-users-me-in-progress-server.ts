import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { UsersMeInProgressResponseType } from '../model/types'

export const getUsersMeInProgressServer = async () => {
  const response = await serverGet<ApiResponseType<UsersMeInProgressResponseType>>(ENDPOINTS.USERS.IN_PROGRESS)

  return response.data
}
