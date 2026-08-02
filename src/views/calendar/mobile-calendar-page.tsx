'use client'

import { MOCK_CALENDAR_EVENTS, MOCK_MEMBERS } from './model/mock'
import type { CalendarType } from '@/entities/calendar'
import { ScheduleRegisterForm } from '@/features/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { useSideModalStore } from '@/shared/store'
import { CalendarWrap, ScheduleAddButton } from '@/widgets/calendar'

/** 사이드 모달은 props 없는 컴포넌트를 받으므로 종류를 미리 묶어 컴포넌트로 만든다 */
const createRegisterContent = (type: CalendarType) => () => (
  <div className={'flex min-h-0 w-full flex-1 flex-col overflow-auto px-5 pb-5'}>
    <ScheduleRegisterForm type={type} members={MOCK_MEMBERS} />
  </div>
)

export const MobileCalendarPage = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  const handleAddSchedule = (type: CalendarType) => {
    openSideModal(createRegisterContent(type), `${CALENDAR_TYPE[type].NAME} 등록하기`)
  }

  return (
    <section className={'flex flex-1 flex-col gap-2.5 px-5'}>
      <CalendarWrap
        isDevice
        events={MOCK_CALENDAR_EVENTS}
        headerRight={<ScheduleAddButton onSelect={handleAddSchedule} />}
      />
    </section>
  )
}
