'use client'

import { useState } from 'react'
import { SideStuRequestList } from '@/entities/lab-side'
import { SideRequestPost } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui'
import { SideModalWrap } from '@/widgets/modal'
import { Tab } from '@/widgets/tab'

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
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[750px] lg:px-[30px]'}>
      <Tab tabs={tabs} />
      <Button className={'mb-[20px]'} onClick={() => setIsOpen(true)}>
        비품 신청하기
      </Button>
      <SideModalWrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideRequestPost />
      </SideModalWrap>
    </div>
  )
}
