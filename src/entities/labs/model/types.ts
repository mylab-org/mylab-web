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
  /** 연구실 소개. 없으면 null */
  description: string | null
  /** 연구 분야. 없으면 빈 배열 */
  researchFields: string[]
}

export type LabsLinkResponseType = {
  linkId: number
  name: string
  url: string
  createdAt: string
}
