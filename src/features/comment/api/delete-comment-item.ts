import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteCommentItem = async (pid: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.COMMENT.ROOT(pid))

  return response.data
}
