import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsMembersResponseType } from '../model/types'

export const getLabsMembersServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<LabsMembersResponseType[]>>(ENDPOINTS.LABS.MEMBERS(labId))

  return response.data
}
