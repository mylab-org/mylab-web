import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsMembersResponseType } from '../model/types'

export const getLabsMembers = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<LabsMembersResponseType[]>>(ENDPOINTS.LABS.MEMBERS(labId))

  return response.data
}
