type UserDegreeType = 'BACHELOR' | 'MASTER' | 'DOCTOR' | 'PROFESSOR'

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
