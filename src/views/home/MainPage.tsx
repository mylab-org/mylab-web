'use client'

import { useState } from 'react'
import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { LabInfo } from '@/entities/lab'
import { UserInfo } from '@/entities/user'
import { WorkListItem } from '@/entities/works'
import { LabLink, LabMember } from '@/widgets/lab'
import { LabMenuWrapper } from '@/widgets/menu'
import { LabLinkModal } from '@/widgets/modal'

export const MainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={'flex flex-1 flex-col justify-center gap-7.5 focus:outline-none'}>
      <div className={'flex flex-1 gap-7.5'}>
        <section className={'flex w-[441px] flex-col gap-7.5'}>
          <UserInfo isMain isShadow />
          <div
            className={
              'flex flex-col gap-3.5 rounded-[24px] bg-white p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'
            }
          >
            <h3 className={'text-[24px] leading-8 font-bold'}>이번 주 일정</h3>
            <CalendarWeek />
            <CalendarListItem />
            <CalendarListItem />
          </div>
        </section>

        <section className={'flex flex-1 flex-col gap-7.5'}>
          <LabMenuWrapper type={'top'} />
          <div className={'flex min-h-0 flex-1 gap-7.5'}>
            <div className={'flex flex-1 flex-col gap-7.5'}>
              <LabInfo className={'p-5 md:p-6'} isShadow />
              <LabLink setIsOpen={setIsOpen} />
              <LabMember />
            </div>
            <div
              className={
                'flex min-h-0 flex-1 flex-col gap-3.5 rounded-[24px] bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'
              }
            >
              <h3 className={'text-[24px] leading-8 font-bold'}>진행 중인 업무 현황</h3>
              <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
              <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
            </div>
          </div>
          <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </section>
      </div>
    </div>
  )
}
