import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { UsersMeInProgressResponseType } from '../model/types'

export const getUsersMeInProgress = async () => {
  const response = await axiosGet<ApiResponseType<UsersMeInProgressResponseType>>(ENDPOINTS.USERS.IN_PROGRESS)

  return response.data
}
