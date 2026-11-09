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

export type LabInfoResponseType = {
  labId: number
  labName: string
  description: string
  hashtags: string[]
  universityName: string
  departmentName: string
}

export type LabLinkResponseType = {
  linkId: number
  name: string
  url: string
}
