import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabLinkResponseType } from '../model/types'

export const getLabsLinkServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<LabLinkResponseType[]>>(ENDPOINTS.LABS.LAB_LINK(labId))

  return response.data
}
