import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostType } from '../model/types'

export const getBoardDetail = async (pid: number) => {
  const response = await axiosGet<ApiResponseType<PostType>>(ENDPOINTS.BOARD.DETAIL(pid))

  return response.data
}
