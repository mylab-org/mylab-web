import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { BoardListResponseType } from '../model/types'

export const getBoardList = async (categoryId: number, page?: number) => {
  const response = await axiosGet<ApiResponseType<BoardListResponseType>>(ENDPOINTS.BOARD.CATEGORY_ID(categoryId), {
    params: { page },
  })

  return response.data
}
