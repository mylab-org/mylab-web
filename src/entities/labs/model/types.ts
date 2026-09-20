export type LabsInviteCodesCheckValidateResponseType = {
  isValid: boolean
  labName: string
  universityName: string
  departmentName: string
  professorName: string
}

export type LabsMembersResponseType = {
  name: string
  degree: UserDegreeType
  role: string
}
