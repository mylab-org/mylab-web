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
  /** 소속 랩 여부. 백엔드 미구현 구간에서는 로그인 훅의 TEMP_HAS_LAB로 대체합니다. */
  hasLab?: boolean
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
