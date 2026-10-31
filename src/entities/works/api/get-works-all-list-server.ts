import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { WorksAllListResponseType } from '../model/types'

export const getWorksAllListServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<WorksAllListResponseType[]>>(ENDPOINTS.TASK.WORKS_ALL_LIST(labId))

  return response.data
}
