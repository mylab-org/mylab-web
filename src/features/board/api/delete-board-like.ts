import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteBoardLike = async (pid: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.BOARD.LIKE_PID(pid))

  return response.data
}
