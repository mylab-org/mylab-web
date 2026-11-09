import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteLabsExitMe = async (labId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.LABS.LAB_EXIT(labId))

  return response.data
}
