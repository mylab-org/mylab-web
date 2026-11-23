export type UsersMeResponseType = {
  id: number
  email: string
  name: string
  degree: UserDegreeType
  is_email_verified: boolean
  created_at: string
  updated_at: string
  lab: {
    labId: number
    labName: string
    role: UserRoleType
  }
}

export type UsersMePostsResponseType = {
  id: number
  categoryId: number
  categoryName: string
  title: string
  content: string
  createdAt: string
  likeCount: number
  commentCount: number
}

export type UsersMePostsListResponseType = {
  posts: UsersMePostsResponseType[]
  page: CursorType
}

export type UsersMeCommentsPostsResponseType = {
  id: number
  categoryId: number
  categoryName: string
  title: string
  content: string
  createdAt: string
  likeCount: number
  commentCount: number
}

export type UsersMeCommentsListResponseType = {
  posts: UsersMeCommentsPostsResponseType[]
  page: CursorType
}

export type UsersMeInProgressPaperType = {
  id: number
  labId: number
  title: string
  status: PaperStatusType
  statusLabel: string
  statusStep: number
  totalSteps: number
  leadAuthor: {
    userId: number
    name: string
  } | null
  members: {
    userId: number
    name: string
    degree: UserDegreeType
    role: string | null
    isLeadAuthor: boolean
  }[]
  schedule: {
    id: number
    scheduleType: PaperScheduleType
    title: string
    startAt: string
    endAt: string | null
    location: string | null
    submissionDeadline: string | null
    dDay: number | null
  } | null
  createdAt: string
}

export type UsersMeInProgressTaskType = {
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

export type UsersMeInProgressResponseType = {
  papers: UsersMeInProgressPaperType[]
  tasks: UsersMeInProgressTaskType[]
}
