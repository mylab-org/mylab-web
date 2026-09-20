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
