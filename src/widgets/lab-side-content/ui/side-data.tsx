'use client'

import { useState } from 'react'
import { SideLabDataList } from '@/entities/lab-side'
import { SideDataPost } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui'
import { SideModalWrap } from '@/widgets/modal'
import { Tab } from '@/widgets/tab'

export const SideData = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const tabs = [
    {
      name: '논문 및 저널',
      content: <SideLabDataList isBottom={isOpen} />,
    },
    {
      name: '연구 참고 자료',
      content: <SideLabDataList isBottom={isOpen} />,
    },
  ]

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[750px] lg:px-[30px]'}>
      <Tab tabs={tabs} />
      <Button className={'mb-[20px]'} onClick={() => setIsOpen(true)}>
        자료 등록하기
      </Button>
      <SideModalWrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideDataPost />
      </SideModalWrap>
    </div>
  )
}
