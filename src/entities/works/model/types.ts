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

// task

export type TaskListResponseType = {
  taskId: number
  userId: number
  type: TaskType
  title: string
  description: string
  startAt: string
  endAt: string
  status: TaskStatusType
  statusLabel: string
  statusStep: number
  totalSteps: number
  createdAt: string
}

export type WorksAllListResponseType = {
  userId: number
  name: string
  degree: UserDegreeType
  role: UserRoleType
  papers: WorksPaperListResponseType[]
  tasks: TaskListResponseType[]
}
