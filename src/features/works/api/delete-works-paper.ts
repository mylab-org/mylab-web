import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteWorksPaper = async (labId: number, paperId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.PAPER.PAPER_ID(labId, paperId))

  return response.data
}
