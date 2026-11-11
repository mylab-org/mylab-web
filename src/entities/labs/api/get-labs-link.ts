import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabLinkResponseType } from '../model/types'

export const getLabsLink = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<LabLinkResponseType[]>>(ENDPOINTS.LABS.LAB_LINK(labId))

  return response.data
}
