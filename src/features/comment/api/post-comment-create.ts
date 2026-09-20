import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostCommentCreatePayloadType } from '../model/types'

export const postCommentCreate = async (pid: number, payload: PostCommentCreatePayloadType) => {
  const response = await axiosPost<ApiResponseType<void>, PostCommentCreatePayloadType>(
    ENDPOINTS.COMMENT.ROOT(pid),
    payload,
  )

  return response.data
}
