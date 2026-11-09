import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteLabs = async (labId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.LABS.LAB_ID(labId))

  return response.data
}
