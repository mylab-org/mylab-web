'use client'

import { useState } from 'react'
import { SideManagenemtList } from '../side-tab-content/side-managenemt-list'
import { SideRequestList } from '../side-tab-content/side-request-list'
import { SideManagementPost } from '@/features/lab-side-modal'
import { SideBottomWrapper } from '@/shared/ui/side-bottom-wrapper'
import { Tab } from '@/shared/ui/tab'
import { Text } from '@/shared/ui/text'

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
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
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
      <SideBottomWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SideManagementPost />
      </SideBottomWrapper>
    </div>
  )
}
