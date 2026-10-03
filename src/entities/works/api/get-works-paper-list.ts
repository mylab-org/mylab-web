import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { WorksPaperListResponseType } from '../model/types'

export const getWorksPaperList = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<WorksPaperListResponseType[]>>(ENDPOINTS.PAPER.ROOT(labId))

  return response.data
}
