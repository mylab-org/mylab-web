export type PaperListLeadAuthorType = {
  userId: number
  name: string
}

export type PaperListMemberType = {
  userId: number
  name: string
  degree: UserDegreeType
  role: string
  isLeadAuthor: boolean
}

export type PaperListScheduleType = {
  id: number
  scheduleType: PaperScheduleType
  title: string
  startAt: string
  endAt: string
  location: string
  submissionDeadline: string
  dDay: number
}

export type WorksPaperListResponseType = {
  id: 1
  labId: 1
  title: string
  status: PaperStatusType
  statusLabel: string
  statusStep: 3
  totalSteps: 5
  leadAuthor: PaperListLeadAuthorType
  members: PaperListMemberType[]
  schedule: PaperListScheduleType
  createdAt: string
}

export type WorksPaperDetailResponseType = WorksPaperListResponseType
