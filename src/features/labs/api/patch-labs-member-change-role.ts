import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const patchLabsMemberChangeRole = async (labId: number, userId: number) => {
  const response = await axiosPatch<ApiResponseType<void>, void>(ENDPOINTS.LABS.CHANGE_ROLE(labId, userId))

  return response.data
}
