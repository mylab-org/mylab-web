import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { TaskListResponseType } from '../model/types'

export const getWorksTaskList = async () => {
  const response = await axiosGet<ApiResponseType<TaskListResponseType[]>>(ENDPOINTS.TASK.ROOT)

  return response.data
}
