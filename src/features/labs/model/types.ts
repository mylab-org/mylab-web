export type PostLabsCreatePayloadType = {
  universityName: string
  departmentName: string
  labName: string
}

export type PostLabsCreateResponseType = {
  labId: number
  labName: string
  universityName: string
  departmentName: string
  createdAt: string
}

export type PostLabsInviteCodesPayloadType = {
  expiresAt?: string
}

export type PostLabsInviteCodesResponseType = {
  id: number
  labId: number
  code: string
  expiresAt: string
  isActive: boolean
  createdAt: string
  createdBy: number
}

export type PostLabsJoinPayloadType = {
  code: string
}

export type PostLabsJoinResponseType = {
  labId: number
  labName: string
  role: string
}

export type PatchLabsMemberChangeRolePayloadType = {
  role: UserRoleType
}

export type PostLabsLinksPayloadType = {
  name: string
  url: string
}

export type PatchLabsDetailPayloadType = {
  labName?: string
  description?: string
  /** 전체 교체 방식이라 변경 후 전체 목록을 보냅니다. */
  researchFields?: string[]
}
