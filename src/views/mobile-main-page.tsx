'use client'

import { LabUserInfo } from '@/entities/user'
import { LabIntro, LabLink } from '@/widgets/lab-widgets'
import { LabMenuWrapper } from '@/widgets/menu'

export const MobileMainPage = () => {
  return (
    <>
      <LabMenuWrapper type={'top'} />
      <section className={'flex flex-1 flex-col gap-[10px]'}>
        <LabUserInfo />
        <LabIntro />
        <LabMenuWrapper type={'center'} />
        <LabLink />
      </section>
    </>
  )
}
