'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { NewSignUpForm, RegistRole } from '@/features/regist'
import type { RegistFormValues } from '@/features/regist/model/regist.schema'
import { registSchema } from '@/features/regist/model/regist.schema'
import { AuthLinkItem } from '@/shared/ui/template/auth-link-item'
import { MobileAuthHeader } from '@/widgets/layout/header'

export const MobileSignupPage = () => {
  const methods = useForm<RegistFormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      type: 'professor',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(registSchema),
  })

  return (
    <FormProvider {...methods}>
      <MobileAuthHeader isPrev />
      <div className={'flex flex-col gap-7.5 px-7.5 pb-5'}>
        <h1 className={'text-[22px] font-bold'}>회원가입</h1>
        <RegistRole />
        <NewSignUpForm />
        <footer>
          <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
        </footer>
      </div>
    </FormProvider>
  )
}
