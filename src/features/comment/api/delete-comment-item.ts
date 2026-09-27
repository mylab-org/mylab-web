import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteCommentItem = async (cId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.COMMENT.ROOT(cId))

  return response.data
}
