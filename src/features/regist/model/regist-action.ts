import { redirect } from 'next/navigation'
import z from 'zod'
import { postLogin } from '@/features/login/api/login-api'

export type State = {
  success?: boolean
  emailMsg: string
  pwMsg: string
  pwCheckMsg: string
}

const registSchema = z
  .object({
    username: z.string().max(30, '이름은 최대 30글자입니다.'),
    email: z.string().email('이메일 형식이 올바르지 않습니다.'),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6자 이상입니다.')
      .max(30, '비밀번호는 최대 30자입니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~])[a-zA-Z0-9!@#$%^&*~]{6,30}$/,
        '영문자,숫자,특수문자를 조합해 6~30자입니다.',
      ),
    passwordCheck: z.string(),
  })
  .refine(data => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export const handleRegistAction = async (prevState: State, formData: FormData) => {
  const username = String(formData.get('username') ?? '')
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const passwordCheck = String(formData.get('passwordCheck') ?? '')

  const result = registSchema.safeParse({ username, email, password, passwordCheck })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.log(errors)
    return {
      success: false,
      emailMsg: errors.email?.[0] ?? '',
      pwMsg: errors.password?.[0] ?? '',
      pwCheckMsg: errors.passwordCheck?.[0] ?? '',
    }
  }

  redirect('/regist')

  // const response = await postLogin(email, password)
  //
  // if (response.code === 'E200') {
  //   redirect('/')
  // } else {
  //   if (response.message === '이메일을 다시 확인해주세요.') {
  //     return { success: false, emailMsg: response.message, pwMsg: '', pwCheckMsg: '' }
  //   } else {
  //     return { success: false, emailMsg: '', pwMsg: response.message, pwCheckMsg: '' }
  //   }
  // }
}
