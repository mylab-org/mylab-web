import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsDetailResponseType } from '../model/types'

export const getLabsDetailServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<LabsDetailResponseType>>(ENDPOINTS.LABS.DETAIL(labId))

  return response.data
}
