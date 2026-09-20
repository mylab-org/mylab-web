import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostLabsCreatePayloadType, PostLabsCreateResponseType } from '../model/types'

export const postLabsCreate = async (payload: PostLabsCreatePayloadType) => {
  const response = await axiosPost<ApiResponseType<PostLabsCreateResponseType>, PostLabsCreatePayloadType>(
    ENDPOINTS.LABS.CREATE,
    payload,
  )

  return response.data
}
