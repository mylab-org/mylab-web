'use server'

import { redirect } from 'next/navigation'
import z from 'zod'
import { postLogin } from '@/features/auth/login/api/login-api'

export type State = {
  success?: boolean
  idMsg: string
  pwMsg: string
}

const loginSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~])[a-zA-Z0-9!@#$%^&*~]{6,30}$/,
      '영문,숫자,특수문자를 조합해 6~30자입니다.',
    ),
})

export const handleLoginAction = async (prevState: State, formData: FormData) => {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const result = loginSchema.safeParse({ email, password })
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, idMsg: errors.email?.[0] ?? '', pwMsg: errors.password?.[0] ?? '' }
  }

  const response = await postLogin(email, password)

  if (response.code === 'E200') {
    redirect('/')
  } else {
    if (response.message === '이메일을 다시 확인해주세요.') {
      return { success: false, idMsg: response.message, pwMsg: '' }
    } else {
      return { success: false, idMsg: '', pwMsg: response.message }
    }
  }
}
