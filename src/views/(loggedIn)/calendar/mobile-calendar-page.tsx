'use client'

import type { CalendarType } from '@/entities/calendar'
import { ScheduleRegisterForm } from '@/features/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { useSideModalStore } from '@/shared/store'
import { CalendarMobileMonthSection } from '@/widgets/calendar'
import { useCalendarScheduleHook } from '@/widgets/calendar/model/use-calendar-schedule-hook'

export const MobileCalendarPage = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const { members } = useCalendarScheduleHook()

  const handleAddSchedule = (type: CalendarType) => {
    // 사이드 모달은 props 없는 컴포넌트를 받으므로 종류를 미리 묶어 컴포넌트로 만든다
    const RegisterContent = () => (
      <div className={'flex min-h-0 w-full flex-1 flex-col overflow-auto px-5 pb-5'}>
        <ScheduleRegisterForm type={type} members={members} onRegistered={closeSideModal} />
      </div>
    )

    openSideModal(RegisterContent, `${CALENDAR_TYPE[type].NAME} 등록하기`)
  }

  return <CalendarMobileMonthSection onAddSchedule={handleAddSchedule} />
}
