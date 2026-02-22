'use client'

import { LabUserInfo } from '@/entities/user'
import { LabMenuWrapper } from '@/widgets/lab-top-menu'
import { LabIntro, LabLink } from '@/widgets/lab-widgets'

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
