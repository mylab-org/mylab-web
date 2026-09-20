type UserDegreeType = 'BACHELOR' | 'MASTER' | 'DOCTOR' | 'PROFESSOR'

interface ApiResponseType<T = unknown> {
  code: string
  message: string
  data: T
}
