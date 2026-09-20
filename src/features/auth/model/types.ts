import type { UserDegreeType } from '@/entities/user/model/types'

export type PostAuthRegisterPayloadType = {
  name: string
  email: string
  degree: UserDegreeType
  password: string
  passwordConfirm: string
}

export type PostAuthLoginPayloadType = {
  email: string
  password: string
}

export type PostAuthLoginResponseType = {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
    degree: UserDegreeType
  }
}

export type PostAuthResendVerificationPayloadType = {
  email: string
}
