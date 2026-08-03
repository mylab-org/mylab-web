'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  CalendarListItem,
  CalendarMonth,
  formatDateLabel,
  formatMonthTitle,
  isDateInEvent,
  isSameDate,
  toDateKey,
} from '@/entities/calendar'
import type { CalendarEvent, CalendarFilter } from '@/entities/calendar'
import { CalendarTypeFilter, MonthPicker } from '@/features/calendar'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/text'
import type { ReactNode } from 'react'

interface CalendarWrapProps {
  events: CalendarEvent[]
  /** 모바일은 타이틀을 좌측 정렬하고 일정 목록을 1열로 쌓는다 */
  isDevice?: boolean
  /** 헤더 우측 영역 (모바일 일정 등록 버튼 등) */
  headerRight?: ReactNode
  className?: string
}

export const CalendarWrap = ({ events, isDevice = false, headerRight, className }: CalendarWrapProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [filter, setFilter] = useState<CalendarFilter>('ALL')
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const filteredEvents = useMemo(
    () => (filter === 'ALL' ? events : events.filter(event => event.type === filter)),
    [events, filter],
  )

  /** 특정 날짜를 선택 중이면 그 날짜의 일정만, 아니면 이번 달 전체 일정을 보여준다 */
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

  return (
    <div className={cn('flex flex-col gap-3.75', className)}>
      <div className={cn('flex items-center gap-2.5', isDevice ? 'justify-between' : 'justify-center')}>
        {/* '오늘' 버튼이 생겨도 타이틀·피커 위치가 밀리지 않도록 relative + absolute 로 띄운다 */}
        <div className={'relative flex items-center gap-2.5'}>
          <button
            type={'button'}
            aria-label={'이전 달'}
            className={'cursor-pointer text-gray-400 hover:text-gray-900'}
            onClick={() => moveMonth(-1)}
          >
            <ChevronLeftIcon size={20} />
          </button>
          <div className={'relative'}>
            <button
              type={'button'}
              aria-expanded={isPickerOpen}
              className={'cursor-pointer text-[20px] leading-8 font-bold lg:text-[24px]'}
              onClick={() => setIsPickerOpen(prev => !prev)}
            >
              {formatMonthTitle(currentDate)}
            </button>
            {isPickerOpen && (
              <MonthPicker
                currentDate={currentDate}
                onConfirm={setCurrentDate}
                onClose={() => setIsPickerOpen(false)}
              />
            )}
          </div>
          <button
            type={'button'}
            aria-label={'다음 달'}
            className={'cursor-pointer text-gray-400 hover:text-gray-900'}
            onClick={() => moveMonth(1)}
          >
            <ChevronRightIcon size={20} />
          </button>
          {!isThisMonth && (
            <button
              type={'button'}
              className={
                'absolute top-1/2 left-full ml-2.5 -translate-y-1/2 cursor-pointer rounded-[20px] bg-gray-100 px-2.5 py-0.75 text-[12px] font-semibold whitespace-nowrap text-gray-600 hover:bg-gray-200'
              }
              onClick={goToday}
            >
              오늘
            </button>
          )}
        </div>
        {headerRight}
      </div>

      <CalendarTypeFilter selected={filter} onSelect={setFilter} className={isDevice ? '' : 'justify-end'} />

      <CalendarMonth
        currentDate={currentDate}
        events={filteredEvents}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      {selectedDate && (
        <div className={'flex items-center justify-between'}>
          <Text className={'text-[14px] font-bold'}>{formatDateLabel(toDateKey(selectedDate))} 일정</Text>
          <button
            type={'button'}
            className={'cursor-pointer text-[12px] font-medium text-gray-400 underline hover:text-gray-600'}
            onClick={() => setSelectedDate(null)}
          >
            전체보기
          </button>
        </div>
      )}

      {selectedDate && listEvents.length === 0 ? (
        <Text className={'py-5 text-center text-[14px] text-gray-400'}>등록된 일정이 없습니다</Text>
      ) : (
        <ul className={cn('grid gap-2.5', isDevice ? 'grid-cols-1' : 'grid-cols-2')}>
          {listEvents.map(event => (
            <li key={event.id}>
              <CalendarListItem event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
