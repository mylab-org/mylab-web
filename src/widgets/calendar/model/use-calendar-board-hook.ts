'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCalendarScheduleHook } from './use-calendar-schedule-hook'
import { isDateInEvent, isSameDate } from '@/entities/calendar'
import type { CalendarFilter } from '@/entities/calendar'

/**
 * 캘린더 화면 전체 상태.
 * 월 그리드와 일정 목록이 서로 다른 카드에 있어 상태를 위로 올려 공유한다.
 */
export const useCalendarBoardHook = () => {
  const { currentDate, setCurrentDate, events, members, isPending } = useCalendarScheduleHook()

  const [filter, setFilter] = useState<CalendarFilter>('ALL')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const filteredEvents = useMemo(
    () => (filter === 'ALL' ? events : events.filter(event => event.type === filter)),
    [events, filter],
  )

  /** 특정 날짜를 선택 중이면 그 날짜의 일정만, 아니면 이번 달 전체 일정 */
  const listEvents = useMemo(
    () => (selectedDate ? filteredEvents.filter(event => isDateInEvent(selectedDate, event)) : filteredEvents),
    [filteredEvents, selectedDate],
  )

  const moveMonth = (diff: number) => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + diff, 1))

  const today = new Date()
  const isThisMonth = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth()

  const goToday = () => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))

  /** 같은 날짜를 다시 누르면 선택 해제한다 */
  const handleSelectDate = (date: Date) => {
    setSelectedDate(prev => (prev && isSameDate(prev, date) ? null : date))
  }

  /** 달이 바뀌면 선택된 날짜는 더 이상 화면에 없으므로 초기화한다 */
  useEffect(() => {
    setSelectedDate(null)
  }, [currentDate.getFullYear(), currentDate.getMonth()])

  return {
    currentDate,
    setCurrentDate,
    filter,
    setFilter,
    selectedDate,
    setSelectedDate,
    handleSelectDate,
    filteredEvents,
    listEvents,
    members,
    isPending,
    moveMonth,
    isThisMonth,
    goToday,
  }
}
