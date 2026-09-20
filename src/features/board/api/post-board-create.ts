import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostBoardCreatePayloadType } from '../model/types'

export const postBoardCreate = async (categoryId: number, payload: PostBoardCreatePayloadType) => {
  const response = await axiosPost<ApiResponseType<unknown>, PostBoardCreatePayloadType>(
    ENDPOINTS.BOARD.CATEGORY_ID(categoryId),
    payload,
  )

  return response.data
}
