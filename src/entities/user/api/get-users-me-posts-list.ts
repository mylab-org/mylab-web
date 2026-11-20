import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { UsersMePostsListResponseType } from '../model/types'

export const getUsersMePostsList = async (cursor?: number) => {
  const response = await axiosGet<ApiResponseType<UsersMePostsListResponseType>>(ENDPOINTS.USERS.POSTS, {
    params: { cursor },
  })

  return response.data
}
