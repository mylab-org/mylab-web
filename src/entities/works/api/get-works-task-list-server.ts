import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { TaskListResponseType } from '../model/types'

export const getWorksTaskListServer = async () => {
  const response = await serverGet<ApiResponseType<TaskListResponseType[]>>(ENDPOINTS.TASK.ROOT)

  return response.data
}
