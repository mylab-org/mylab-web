import type { LoginResponse } from '@/features/login/model/types'
import { axiosPost } from '@/shared/api'

export const postLogin = async (email: string, password: string) => {
  const response = await axiosPost<LoginResponse>('/auth/login', { email, password })
  return response
}
