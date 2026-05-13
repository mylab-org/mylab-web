'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'next/dist/client/image-component'
import { FormProvider, useForm } from 'react-hook-form'
import { NewSignUpForm, RegistRole } from '@/features/auth/regist'
import type { RegistFormValues } from '@/features/auth/regist/model/regist.schema'
import { registSchema } from '@/features/auth/regist/model/regist.schema'
import { AuthLinkItem } from '@/widgets/auth'
import { MobileAuthHeader } from '@/widgets/header'

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
      {/*<header className={'h-[60px] px-4 py-2.5'}>*/}
      {/*  <Image src={'/icon/move.svg'} alt={'prev'} width={24} height={24} className={'rotate-180'} />*/}
      {/*</header>*/}
      <MobileAuthHeader isPrev />
      <div className={'flex flex-col gap-7.5 px-7.5 pb-5'}>
        <h1 className={'text-[22px] font-bold'}>회원가입</h1>
        <RegistRole />
        {/*<RegistForm data={data} onChange={handleChangeData} />*/}
        <NewSignUpForm />
        <footer>
          <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
        </footer>
      </div>
    </FormProvider>
  )
}
