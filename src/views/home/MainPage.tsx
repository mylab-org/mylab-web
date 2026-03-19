'use client'

import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { LabInfo } from '@/entities/lab/ui/lab-info'
import { UserInfo } from '@/entities/user'
import { WorkListItem, WorkMyProgress } from '@/entities/works'
import { Tag } from '@/shared/ui/tag'
import { LabLink, LabMember } from '@/widgets/lab'
import { LabMenuWrapper } from '@/widgets/menu'

export const MainPage = () => {
  return (
    <div className={'flex flex-1 flex-col justify-center gap-[30px] focus:outline-none'}>
      <div className={'flex flex-1 gap-[30px]'}>
        <section className={'flex w-[441px] flex-col gap-[30px]'}>
          <UserInfo isMain />
          <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
            <h3 className={'text-[24px] leading-[32px] font-bold'}>이번 주 일정</h3>
            <CalendarWeek />
            <CalendarListItem />
            <CalendarListItem />
          </div>
        </section>

        <section className={'flex flex-1 flex-col gap-[30px]'}>
          <LabMenuWrapper type={'top'} />
          <div className={'flex min-h-0 flex-1 gap-[30px]'}>
            <div className={'flex flex-1 flex-col gap-[30px]'}>
              <LabInfo className={'p-[20px] md:p-[24px]'} />
              <LabLink />
              <LabMember />
            </div>
            <div className={'flex min-h-0 flex-1 flex-col gap-[14px] rounded-[24px] bg-white p-[20px]'}>
              <h3 className={'text-[24px] leading-[32px] font-bold'}>진행 중인 업무 현황</h3>
              <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
              <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
            </div>
          </div>
        </section>
      </div>
      {/*<PageFooter />*/}
    </div>
  )
}
