import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchCommentUpdatePayloadType } from '../model/types'

export const patchCommentUpdate = async (pid: number, payload: PatchCommentUpdatePayloadType) => {
  const response = await axiosPatch<ApiResponseType<void>, PatchCommentUpdatePayloadType>(
    ENDPOINTS.COMMENT.ROOT(pid),
    payload,
  )

  return response.data
}
