import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { CommentListResponseType } from '../model/types'

export const getCommentList = async (pid: number) => {
  const response = await axiosGet<ApiResponseType<CommentListResponseType>>(ENDPOINTS.COMMENT.ROOT(pid))

  return response.data
}
