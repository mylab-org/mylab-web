type UserDegreeType = 'BACHELOR' | 'MASTER' | 'DOCTOR' | 'PROFESSOR'
type UserRoleType = 'PROFESSOR' | 'LAB_LEADER' | 'SUB_LEADER' | 'MEMBER'
type PaperScheduleType = 'CONFERENCE' | 'MEETING' | 'LAB_DINNER'
type PaperStatusType = 'RESEARCH_PREP' | 'EXPERIMENT' | 'DRAFTING' | 'PROFESSOR_REVIEW' | 'COMPLETED'
type TaskType = 'WORK' | 'MEETING'
type TaskStatusType = 'READY' | 'IN_PROGRESS' | 'COMPLETED'

interface ApiResponseType<T = unknown> {
  code: string
  message: string
  data: T
}

type PageType = {
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
}

type CursorType = {
  nextCursor: number
  hasNext: boolean
}
