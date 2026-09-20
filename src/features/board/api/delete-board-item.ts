import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteBoardItem = async (pid: number) => {
  const response = await axiosDelete<ApiResponseType<unknown>>(ENDPOINTS.BOARD.BOARD_PID(pid))

  return response.data
}
