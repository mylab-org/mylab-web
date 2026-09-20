'use client'

import { CalendarAddMenu } from '../../menu/calendar-add-menu'
import { CalendarMonthWrapper } from '../../month/calendar-month-wrapper'
import type { CalendarEvent, CalendarType } from '@/entities/calendar'

interface CalendarMobileMonthSectionProps {
  events: CalendarEvent[]
  /** 헤더의 + 메뉴에서 일정 종류를 고르면 호출된다 */
  onAddSchedule: (type: CalendarType) => void
}

export const CalendarMobileMonthSection = ({ events, onAddSchedule }: CalendarMobileMonthSectionProps) => {
  return (
    <CalendarMonthWrapper
      variant={'mobile'}
      events={events}
      headerRight={<CalendarAddMenu onSelect={onAddSchedule} />}
    />
  )
}
