export type LabsInviteCodesCheckValidateResponseType = {
  isValid: boolean
  labName: string
  universityName: string
  departmentName: string
  professorName: string
}

export type LabsMembersResponseType = {
  userId: number
  name: string
  degree: UserDegreeType
  role: UserRoleType
}

export type LabsDetailResponseType = {
  labId: number
  labName: string
  universityName: string
  departmentName: string
  professorName: string
  description: string | null
  researchFields: string[]
}

export type LabsLinkResponseType = {
  linkId: number
  name: string
  url: string
  createdAt: string
}
