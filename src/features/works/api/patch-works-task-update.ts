import type { TaskListResponseType } from '@/entities/works/model/types'
import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchWorksTaskUpdatePayloadType } from '../model/types'

export const patchWorksTaskUpdate = async (taskId: number, payload: PatchWorksTaskUpdatePayloadType) => {
  const response = await axiosPatch<ApiResponseType<TaskListResponseType>, PatchWorksTaskUpdatePayloadType>(
    ENDPOINTS.TASK.TASK_ID(taskId),
    payload,
  )

  return response.data
}
