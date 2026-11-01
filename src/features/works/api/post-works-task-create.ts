import type { TaskListResponseType } from '@/entities/works/model/types'
import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PostWorksTaskCreatePayloadType } from '../model/types'

export const postWorksTaskCreate = async (payload: PostWorksTaskCreatePayloadType) => {
  const response = await axiosPost<ApiResponseType<TaskListResponseType>, PostWorksTaskCreatePayloadType>(
    ENDPOINTS.TASK.ROOT,
    payload,
  )

  return response.data
}
