'use client'

import { LabInfo } from '@/entities/lab/ui/lab-info'
import { UserInfo } from '@/entities/user'
import { LabLink } from '@/widgets/lab'
import { LabMenuWrapper } from '@/widgets/menu'

export const MobileMainPage = () => {
  return (
    <section className={'flex flex-1 flex-col gap-2.5 px-5'}>
      <LabMenuWrapper type={'top'} />
      <UserInfo isMain />
      <LabInfo className={'p-5 md:p-6'} />
      <LabMenuWrapper type={'center'} />
      <LabLink />
    </section>
  )
}
