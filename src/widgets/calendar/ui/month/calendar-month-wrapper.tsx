'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useCalendarScheduleHook } from '../../model/use-calendar-schedule-hook'
import {
  CalendarListItem,
  CalendarMonth,
  formatDateLabel,
  formatMonthTitle,
  isDateInEvent,
  isSameDate,
  toDateKey,
} from '@/entities/calendar'
import type { CalendarFilter } from '@/entities/calendar'
import { CalendarTypeFilter, MonthPicker } from '@/features/calendar'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { ReactNode } from 'react'

interface CalendarMonthWrapperProps {
  /** 모바일은 타이틀을 좌측 정렬하고 일정 목록을 1열로 쌓는다 */
  variant?: 'pc' | 'mobile'
  /** 헤더 우측 영역 (모바일 일정 등록 메뉴 등) */
  headerRight?: ReactNode
  className?: string
}

export const CalendarMonthWrapper = ({ variant = 'pc', headerRight, className }: CalendarMonthWrapperProps) => {
  const isMobile = variant === 'mobile'

  const { currentDate, setCurrentDate, events, isPending } = useCalendarScheduleHook()
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
    <section
      className={cn(
        'flex flex-col gap-4',
        isMobile ? 'flex-1 px-4' : `bg-card min-w-0 flex-1 rounded-[20px] p-5 ${CARD_SHADOW}`,
        className,
      )}
    >
      <div className={'flex items-center justify-between gap-2.5'}>
        <div className={'flex items-center gap-1'}>
          <button
            type={'button'}
            aria-label={'이전 달'}
            className={'text-subtle-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-full p-1.5'}
            onClick={() => moveMonth(-1)}
          >
            <ChevronLeftIcon size={18} />
          </button>
          <div className={'relative'}>
            <button
              type={'button'}
              aria-expanded={isPickerOpen}
              className={
                'hover:bg-muted cursor-pointer rounded-[10px] px-2 py-1 text-[18px] leading-7 font-bold md:text-[22px] md:leading-8'
              }
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
            className={'text-subtle-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-full p-1.5'}
            onClick={() => moveMonth(1)}
          >
            <ChevronRightIcon size={18} />
          </button>
          {!isThisMonth && (
            <button
              type={'button'}
              className={
                'bg-muted text-muted-foreground hover:bg-secondary ml-1.5 cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap'
              }
              onClick={goToday}
            >
              오늘
            </button>
          )}
        </div>
        {headerRight}
      </div>

      <CalendarTypeFilter selected={filter} onSelect={setFilter} />

      <CalendarMonth
        currentDate={currentDate}
        events={filteredEvents}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <div className={'border-border flex items-center justify-between gap-2 border-t pt-4'}>
        <Text className={'text-[15px] font-bold md:text-[17px]'}>
          {selectedDate ? `${formatDateLabel(toDateKey(selectedDate))} 일정` : '이번 달 일정'}
          <span className={'text-subtle-foreground ml-1.5 text-[13px] font-semibold'}>{listEvents.length}</span>
        </Text>
        {selectedDate && (
          <button
            type={'button'}
            className={'text-brand hover:bg-muted cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-semibold'}
            onClick={() => setSelectedDate(null)}
          >
            전체보기
          </button>
        )}
      </div>

      {isPending ? (
        <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>일정을 불러오는 중입니다</Text>
      ) : listEvents.length === 0 ? (
        <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>등록된 일정이 없습니다</Text>
      ) : (
        <ul className={cn('grid gap-3', isMobile ? 'grid-cols-1' : 'grid-cols-2')}>
          {listEvents.map(event => (
            <li key={event.key}>
              <CalendarListItem event={event} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
