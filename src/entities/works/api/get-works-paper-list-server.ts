import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { WorksPaperListResponseType } from '../model/types'

export const getWorksPaperListServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<WorksPaperListResponseType[]>>(ENDPOINTS.PAPER.ROOT(labId))

  return response.data
}
