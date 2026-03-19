'use client'

import { LabInfo } from '@/entities/lab/ui/lab-info'
import { LabUserInfo } from '@/entities/user'
import { MobileHeader } from '@/widgets/header'
import { LabLink } from '@/widgets/lab'
import { LabMenuWrapper } from '@/widgets/menu'

export const MobileMainPage = () => {
  return (
    <section className={'flex flex-1 flex-col gap-[10px] px-[20px]'}>
      <LabMenuWrapper type={'top'} />
      <LabUserInfo />
      <LabInfo className={'p-[20px] md:p-[24px]'} />
      <LabMenuWrapper type={'center'} />
      <LabLink />
    </section>
  )
}
