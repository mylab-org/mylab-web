'use client'

import { AuthEmailValidate } from '@/entities/auth'
import { useAuthVerifyEmailHook } from '@/entities/auth/model/use-auth-verify-email-hook'

type Props = {
  token: string
}

export const EmailValidatePage = ({ token }: Props) => {
  const { isPending, isError } = useAuthVerifyEmailHook(token)

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <AuthEmailValidate type="ERROR" />
  }

  return <AuthEmailValidate type="SUCCESS" />
}
