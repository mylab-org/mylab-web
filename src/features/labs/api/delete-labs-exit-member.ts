import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteLabsExitMember = async (labId: number, userId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.LABS.LAB_USER_EXIT(labId, userId))

  return response.data
}
