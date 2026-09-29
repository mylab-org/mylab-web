import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const postBoardLike = async (pid: number) => {
  const response = await axiosPost<ApiResponseType<void>>(ENDPOINTS.BOARD.LIKE_PID(pid))

  return response.data
}
