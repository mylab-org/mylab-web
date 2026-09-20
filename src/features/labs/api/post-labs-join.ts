import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostLabsJoinPayloadType, PostLabsJoinResponseType } from '../model/types'

export const postLabsJoin = async (payload: PostLabsJoinPayloadType) => {
  const response = await axiosPost<ApiResponseType<PostLabsJoinResponseType>, PostLabsJoinPayloadType>(
    ENDPOINTS.LABS.JOIN,
    payload,
  )

  return response.data
}
