import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { BoardListResponseType } from '../model/types'

export const getBoardListServer = async (categoryId: number, page?: number) => {
  const response = await serverGet<ApiResponseType<BoardListResponseType>>(ENDPOINTS.BOARD.CATEGORY_ID(categoryId), {
    params: { page },
  })

  return response.data
}
