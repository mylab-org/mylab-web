import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { UsersMeResponseType } from '../model/types'

export const getUsersMe = async () => {
  const response = await axiosGet<ApiResponseType<UsersMeResponseType>>(ENDPOINTS.USERS.ROOT)

  return response.data
}
