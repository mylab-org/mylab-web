'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { NewSignUpForm, RegistRole } from '@/features/auth/regist'
import { type RegistFormValues, registSchema } from '@/features/auth/regist/model/regist.schema'
import { AuthLinkItem } from '@/widgets/auth'

export const SignupPage = () => {
  const methods = useForm<RegistFormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      type: 'professor',
      password: '',
      passwordCheck: '',
    },
    // resolver: zodResolver(registSchema),
  })

  return (
    <FormProvider {...methods}>
      <div className={'flex flex-col gap-7.5'}>
        <RegistRole />
        <NewSignUpForm />
        <footer>
          <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
        </footer>
      </div>
    </FormProvider>
  )
}
