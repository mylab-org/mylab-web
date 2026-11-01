import type { TaskListResponseType } from '@/entities/works/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchWorksTaskStatusPayloadType } from '../model/types'

export const patchWorksTaskStatus = async (taskId: number, payload: PatchWorksTaskStatusPayloadType) => {
  const response = await axiosPatch<ApiResponseType<TaskListResponseType>, PatchWorksTaskStatusPayloadType>(
    ENDPOINTS.TASK.STATUS(taskId),
    payload,
  )

  return response.data
}
