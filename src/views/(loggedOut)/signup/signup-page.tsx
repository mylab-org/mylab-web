'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { RegistRoleRadio, SignUpForm } from '@/features/auth'
import type { PostAuthRegisterPayloadType } from '@/features/auth/model/types'
import { AuthLinkItem } from '@/shared/ui/template/auth-link-item'

export const SignupPage = () => {
  const methods = useForm<PostAuthRegisterPayloadType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      degree: 'BACHELOR',
      password: '',
      passwordConfirm: '',
    },
    // resolver: zodResolver(registSchema),
  })

  return (
    <FormProvider {...methods}>
      <div className={'flex flex-col gap-7.5'}>
        <RegistRoleRadio />
        <SignUpForm />
        <footer>
          <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
        </footer>
      </div>
    </FormProvider>
  )
}
