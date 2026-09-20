import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { BoardCategoryResponseType } from '../model/types'

export const getBoardCategory = async (labId: number) => {
  const response = await axiosGet<ApiResponseType<BoardCategoryResponseType>>(ENDPOINTS.BOARD.CATEGORY(labId))

  return response.data
}
