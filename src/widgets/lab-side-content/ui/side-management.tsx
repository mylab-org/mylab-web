'use client'

import { useState } from 'react'
import { SideManagenemtList, SideRequestList } from '@/entities/lab-side'
import { SideManagementPost } from '@/features/lab-side-modal'
import { Text } from '@/shared/ui'
import { SideModalWrap } from '@/widgets/modal'
import { Tab } from '@/widgets/tab'

export const SideManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const tabs = [
    {
      name: '대여 목록 관리',
      content: <SideManagenemtList isBottom={isOpen} />,
    },
    {
      name: '비품 신청 내역',
      content: <SideRequestList isBottom={isOpen} />,
    },
  ]

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] pb-5 lg:w-[750px] lg:px-[30px]'}>
      <Tab
        tabs={tabs}
        leftItem={
          <Text
            className={'cursor-pointer text-[12px] font-semibold text-gray-400! lg:text-[18px]'}
            onClick={() => setIsOpen(true)}
          >
            비품 추가하기
          </Text>
        }
      />
      <SideModalWrap isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideManagementPost />
      </SideModalWrap>
    </div>
  )
}
