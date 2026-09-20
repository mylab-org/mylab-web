import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteLabsRevokeInviteCodes = async (labId: number, code: string) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.LABS.REVOKE_INVITE_CODES(labId, code))

  return response.data
}
