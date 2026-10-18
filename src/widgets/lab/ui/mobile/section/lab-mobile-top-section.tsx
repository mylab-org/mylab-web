'use client'

import { LabInfo } from '@/entities/labs'
import { UserInfo, useUsersMeHook } from '@/entities/user'

export const LabMobileTopSection = () => {
  const { me, isError } = useUsersMeHook()

  if (isError || !me) return null

  return (
    <>
      <UserInfo isShadow user={me} />
      <LabInfo className={'p-5 md:p-6'} isShadow />
    </>
  )
}
