type UserDegreeType = 'BACHELOR' | 'MASTER' | 'DOCTOR' | 'PROFESSOR'
type PaperScheduleType = 'CONFERENCE' | 'MEETING' | 'LAB_DINNER'
type PaperStatusType = 'RESEARCH_PREP' | 'EXPERIMENT' | 'DRAFTING' | 'PROFESSOR_REVIEW' | 'COMPLETED'

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
