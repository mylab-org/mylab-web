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
