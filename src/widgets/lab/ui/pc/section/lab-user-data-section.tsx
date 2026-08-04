'use client'

import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { UserInfo } from '@/entities/user'

export const LabUserDataSection = () => {
  return (
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
  )
}
