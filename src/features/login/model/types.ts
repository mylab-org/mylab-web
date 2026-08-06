export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  id: number
  username: string
  phone: string
  name: string
  degress: string
  professor_email: string | null
  is_professor_verified: boolean
  created_at: Date | string
}
