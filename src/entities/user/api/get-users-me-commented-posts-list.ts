import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { UsersMeCommentsListResponseType } from '../model/types'

export const getUsersMeCommentedPostsList = async (cursor?: number) => {
  const response = await axiosGet<ApiResponseType<UsersMeCommentsListResponseType>>(ENDPOINTS.USERS.COMMENTED_POSTS, {
    params: {
      cursor,
    },
  })

  return response.data
}
