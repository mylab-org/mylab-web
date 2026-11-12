'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCalendarScheduleHook } from './use-calendar-schedule-hook'
import { isDateInEvent, isSameDate } from '@/entities/calendar'
import type { CalendarFilter } from '@/entities/calendar'

export const useCalendarBoardHook = () => {
  const { currentDate, setCurrentDate, events, members, isPending } = useCalendarScheduleHook()

  const [filter, setFilter] = useState<CalendarFilter>('ALL')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const filteredEvents = useMemo(
    () => (filter === 'ALL' ? events : events.filter(event => event.type === filter)),
    [events, filter],
  )

  const listEvents = useMemo(
    () => (selectedDate ? filteredEvents.filter(event => isDateInEvent(selectedDate, event)) : filteredEvents),
    [filteredEvents, selectedDate],
  )

  const moveMonth = (diff: number) => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + diff, 1))

  const today = new Date()
  const isThisMonth = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth()

  const goToday = () => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))

  const handleSelectDate = (date: Date) => {
    setSelectedDate(prev => (prev && isSameDate(prev, date) ? null : date))
  }

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
