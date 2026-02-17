// 이전 회원가입 타입
export interface Regist {
  username: string
  email: string
  password: string
  passwordCheck: string
}

//현재 사용하는 회원가입 타입
export interface SignUpType {
  type: 'professor' | 'student'
  grade?: string
  username: string
  email: string
  password: string
  passwordCheck: string
}
