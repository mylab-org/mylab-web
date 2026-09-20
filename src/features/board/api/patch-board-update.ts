import { axiosPatch } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { PatchBoardUpdatePayloadType } from '../model/types'

export const patchBoardUpdate = async (pid: number, payload: PatchBoardUpdatePayloadType) => {
  const response = await axiosPatch<ApiResponseType<unknown>, PatchBoardUpdatePayloadType>(
    ENDPOINTS.BOARD.BOARD_PID(pid),
    payload,
  )

  return response.data
}
