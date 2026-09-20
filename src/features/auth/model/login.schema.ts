import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아니에요'),
  password: z
    .string()
    .min(6, '비밀번호는 6자 이상입니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~])[a-zA-Z0-9!@#$%^&*~]{6,30}$/,
      '영문, 숫자, 특수문자를 조합해 6~30자입니다.',
    ),
})

export type LoginFormValues = z.infer<typeof LoginSchema>
