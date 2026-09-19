'use client'

import { FormProvider, useForm } from 'react-hook-form'
import type { PostAuthRegisterPayloadType } from '@/features/auth/model/types'
import { RegistRoleRadio } from '@/features/auth/ui/regist-role-radio'
import { SignUpForm } from '@/features/auth/ui/signup-form'
import { AuthLinkItem } from '@/shared/ui/template/auth-link-item'
import { MobileAuthHeader } from '@/widgets/layout/header'

export const MobileSignupPage = () => {
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
      <MobileAuthHeader isPrev />
      <div className={'flex flex-col gap-7.5 px-7.5 pb-5'}>
        <h1 className={'text-[22px] font-bold'}>회원가입</h1>
        <RegistRoleRadio />
        <SignUpForm />
        <footer>
          <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
        </footer>
      </div>
    </FormProvider>
  )
}
