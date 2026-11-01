import { axiosDelete } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const deleteWorksTask = async (taskId: number) => {
  const response = await axiosDelete<ApiResponseType<void>>(ENDPOINTS.TASK.TASK_ID(taskId))

  return response.data
}
