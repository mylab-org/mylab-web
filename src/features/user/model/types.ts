import type { UserDegreeType } from '@/entities/user/model/types'

export type PatchUsersMePayloadType = {
  degree: UserDegreeType
}

export type PatchUsersMePasswordPayloadType = {
  currentPassword: string
  newPassword: string
}
