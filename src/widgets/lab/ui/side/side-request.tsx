'use client'

import { useState } from 'react'
import { SideStuRequestList } from '../side-tab-content/side-stu-request-list'
import { SideRequestPost } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui/override/button'
import { Tab } from '@/shared/ui/override/tab'
import { SideBottomWrapper } from '@/shared/ui/template/side-bottom-wrapper'

export const SideRequest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const tabs = [
    {
      name: '비품 신청 내역',
      content: <SideStuRequestList isBottom={isOpen} />,
    },
    {
      name: '비품 승인 내역',
      content: <SideStuRequestList isBottom={isOpen} />,
    },
  ]

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5'}>
      <Tab tabs={tabs} />
      <Button className={'mb-5'} onClick={() => setIsOpen(true)}>
        비품 신청하기
      </Button>
      <SideBottomWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideRequestPost />
      </SideBottomWrapper>
    </div>
  )
}
