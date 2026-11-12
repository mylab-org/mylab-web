import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsDetailResponseType } from '../model/types'

export const getLabsDetail = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<LabsDetailResponseType>>(ENDPOINTS.LABS.DETAIL(labId))

  return response.data
}
