'use client'

import { LabInfo } from '@/entities/labs'
import { UserInfo } from '@/entities/user'

export const LabMobileTopSection = () => {
  return (
    <>
      <UserInfo isMain isShadow />
      <LabInfo className={'p-5 md:p-6'} isShadow />
    </>
  )
}
