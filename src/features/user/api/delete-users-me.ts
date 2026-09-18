import { axiosDelete } from '@/shared/api'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteUsersMe = async () => {
  const response = await axiosDelete<ApiResponseType<unknown>>(ENDPOINTS.USERS.ROOT)

  return response.data
}
