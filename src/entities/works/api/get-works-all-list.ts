import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { WorksAllListResponseType } from '../model/types'

export const getWorksAllList = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<WorksAllListResponseType[]>>(ENDPOINTS.TASK.WORKS_ALL_LIST(labId))

  return response.data
}
