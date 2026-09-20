export type UserDegreeType = 'BACHELOR' | 'MASTER' | 'DOCTOR' | 'PROFESSOR'

export type UsersMeResponseType = {
  id: number
  email: string
  name: string
  degree: UserDegreeType
  is_email_verified: boolean
  created_at: string
  updated_at: string
}
