import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsInviteCodesCheckValidateResponseType } from '../model/types'

export const getLabsInviteCodesCheckValidate = async (code: string) => {
  const response = await axiosGet<ApiResponseType<LabsInviteCodesCheckValidateResponseType>>(
    ENDPOINTS.LABS.CHK_VALIDATE(code),
  )

  return response.data
}
