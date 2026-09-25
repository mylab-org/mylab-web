import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { LabsInviteCodesCheckValidateResponseType } from '../model/types'

type Options = {
  /** 쿠키 미저장 온보딩 구간에서만 사용. 있으면 Authorization을 직접 주입합니다. */
  accessToken?: string
}

export const getLabsInviteCodesCheckValidate = async (code: string, options?: Options) => {
  const response = await axiosGet<ApiResponseType<LabsInviteCodesCheckValidateResponseType>>(
    ENDPOINTS.LABS.CHK_VALIDATE(code),
    options?.accessToken
      ? {
          headers: { Authorization: `Bearer ${options.accessToken}` },
          skipAuth: true,
          skipRefresh: true,
        }
      : undefined,
  )

  return response.data
}
