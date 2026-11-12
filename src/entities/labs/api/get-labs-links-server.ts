import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsLinkResponseType } from '../model/types'

export const getLabsLinksServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<LabsLinkResponseType[]>>(ENDPOINTS.LABS.LINKS(labId))

  return response.data
}
