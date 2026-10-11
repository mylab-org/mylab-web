export type PaperListLeadAuthorType = {
  userId: number
  name: string
}

export type PaperListMemberType = {
  userId: number
  name: string
  degree: UserDegreeType
  role: string | null
  isLeadAuthor: boolean
}

export type PaperListScheduleType = {
  id: number
  scheduleType: PaperScheduleType
  title: string
  startAt: string
  endAt: string | null
  location: string | null
  submissionDeadline: string | null
  dDay: number | null
}

export type WorksPaperListResponseType = {
  id: number
  labId: number
  title: string
  status: PaperStatusType
  statusLabel: string
  statusStep: number
  totalSteps: number
  leadAuthor: PaperListLeadAuthorType | null
  members: PaperListMemberType[]
  schedule: PaperListScheduleType | null
  createdAt: string
}

export type WorksPaperDetailResponseType = WorksPaperListResponseType
