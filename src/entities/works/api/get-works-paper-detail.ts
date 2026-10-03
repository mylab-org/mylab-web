import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { WorksPaperDetailResponseType } from '../model/types'

export const getWorksPaperDetail = async (labId: number, paperId: number) => {
  const response = await axiosGet<ApiResponseType<WorksPaperDetailResponseType>>(
    ENDPOINTS.PAPER.PAPER_ID(labId, paperId),
  )

  return response.data
}
