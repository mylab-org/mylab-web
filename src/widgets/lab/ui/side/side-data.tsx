'use client'

import { useState } from 'react'
import { SideLabDataList } from '../side-tab-content/side-lab-data-list'
import { SideDataPost } from '@/features/lab-side-modal'
import { Button } from '@/shared/ui/button'
import { Tab } from '@/shared/ui/tab'
import { SideModalWrap } from '@/widgets/modal'

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
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5'}>
      <Tab tabs={tabs} />
      <Button className={'mb-5'} onClick={() => setIsOpen(true)}>
        자료 등록하기
      </Button>
      <SideModalWrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideDataPost />
      </SideModalWrap>
    </div>
  )
}
