import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { BoardCategoryResponseType } from '../model/types'

export const getBoardCategoryServer = async (labId: number) => {
  const response = await serverGet<ApiResponseType<BoardCategoryResponseType>>(ENDPOINTS.BOARD.CATEGORY(labId))

  return response.data
}
