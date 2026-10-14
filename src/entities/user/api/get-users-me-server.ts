import { cache } from 'react'
import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { UsersMeResponseType } from '../model/types'

export const getUsersMeServer = cache(async () => {
  const response = await serverGet<ApiResponseType<UsersMeResponseType>>(ENDPOINTS.USERS.ROOT)

  return response.data
})
