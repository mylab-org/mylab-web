'use client'

import { LabIntro } from '@/entities/lab/ui/lab-intro'
import { LabUserInfo } from '@/entities/user'
import { MobileHeader } from '@/widgets/header'
import { LabLink } from '@/widgets/lab-widgets'
import { LabMenuWrapper } from '@/widgets/menu'

export const MobileMainPage = () => {
  return (
    <section className={'flex flex-1 flex-col gap-[10px] px-[20px]'}>
      <LabMenuWrapper type={'top'} />
      <LabUserInfo />
      <LabIntro />
      <LabMenuWrapper type={'center'} />
      <LabLink />
    </section>
  )
}
