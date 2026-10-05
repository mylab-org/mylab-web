'use client'

import { AuthEmailValidate } from '@/entities/auth'
import { useAuthVerifyEmailHook } from '@/entities/auth/model/use-auth-verify-email-hook'
import { MobileAuthHeader } from '@/widgets/layout/header'

type Props = {
  token: string
}

export const MobileEmailValidatePage = ({ token }: Props) => {
  const { isPending, isError } = useAuthVerifyEmailHook(token)

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <>
        <MobileAuthHeader />
        <div className={'flex flex-1 flex-col gap-7.5 px-7.5 pb-5'}>
          <AuthEmailValidate type="ERROR" />
        </div>
      </>
    )
  }

  return (
    <>
      <MobileAuthHeader />
      <div className={'flex flex-1 flex-col gap-7.5 px-7.5 pb-5'}>
        <AuthEmailValidate type="SUCCESS" />
      </div>
    </>
  )
}
