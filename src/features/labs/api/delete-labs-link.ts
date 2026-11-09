import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteLabsLink = async (labId: number, linkId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.LABS.LAB_LINK_ID(labId, linkId))

  return response.data
}
