import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsLinkResponseType } from '../model/types'

export const getLabsLinks = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<LabsLinkResponseType[]>>(ENDPOINTS.LABS.LINKS(labId))

  return response.data
}
