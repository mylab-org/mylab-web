import z from 'zod'

export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    newPassword: z
      .string()
      .min(6, '비밀번호는 6자 이상입니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~])[a-zA-Z0-9!@#$%^&*~]{6,30}$/,
        '영문, 숫자, 특수문자를 조합해 6~30자입니다.',
      ),
    newPasswordConfirm: z.string().min(1, '새 비밀번호 확인을 입력해주세요'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        path: ['newPasswordConfirm'],
        message: '비밀번호가 일치하지 않아요',
        code: 'custom',
      })
    }
  })

export type PasswordUpdateFormValues = z.infer<typeof passwordUpdateSchema>
