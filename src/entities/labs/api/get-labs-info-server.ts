import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabInfoResponseType } from '../model/types'

export const getLabsInfoServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<LabInfoResponseType>>(ENDPOINTS.LABS.LAB_ID(labId))

  return response.data
}
