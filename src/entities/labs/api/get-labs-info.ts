import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabInfoResponseType } from '../model/types'

export const getLabsInfo = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<LabInfoResponseType>>(ENDPOINTS.LABS.LAB_ID(labId))

  return response.data
}
