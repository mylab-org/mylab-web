'use client'

import { isDateInEvent, isSameDate, WEEK_LABEL } from '../lib/date'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { CalendarEvent } from '../model/types'

interface CalendarWeekProps {
  /** 요일 아래 점으로 일정 유무를 표시합니다. */
  events?: CalendarEvent[]
  selectedDate?: Date | null
  onSelectDate?: (date: Date) => void
}

const getWeekDates = (baseDate: Date) => {
  const day = baseDate.getDay() // 0(일) ~ 6(토)
  const sunday = new Date(baseDate)
  sunday.setDate(baseDate.getDate() - day)

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(sunday)
    date.setDate(sunday.getDate() + i)
    return date
  })
}

export const CalendarWeek = ({ events = [], selectedDate, onSelectDate }: CalendarWeekProps) => {
  const today = new Date()
  const weekDates = getWeekDates(today)

  return (
    <div>
      <div className={'grid grid-cols-7 text-center'}>
        {WEEK_LABEL.map(day => (
          <Text key={day} className="text-muted-foreground! text-[14px] font-medium">
            {day}
          </Text>
        ))}
      </div>
      {/* 날짜 */}
      <div className="grid grid-cols-7 text-center">
        {weekDates.map(date => {
          const isToday = isSameDate(date, today)
          const isSelected = !!selectedDate && isSameDate(date, selectedDate)
          const hasEvent = events.some(event => isDateInEvent(date, event))

          return (
            <div key={date.toISOString()} className="flex flex-col items-center gap-1">
              <button
                type={'button'}
                aria-pressed={isSelected}
                aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 일정 보기`}
                disabled={!onSelectDate}
                className={cn(
                  'flex h-7.5 w-7.5 items-center justify-center rounded-full text-[18px] font-medium transition-colors',
                  onSelectDate && 'cursor-pointer',
                  isSelected
                    ? 'bg-brand text-brand-foreground'
                    : isToday
                      ? 'bg-foreground text-background'
                      : cn('text-foreground', onSelectDate && 'hover:bg-muted'),
                )}
                onClick={() => onSelectDate?.(date)}
              >
                {date.getDate()}
              </button>
              <span
                className={cn(
                  'h-1 w-1 rounded-full',
                  hasEvent ? (isSelected ? 'bg-brand' : 'bg-subtle-foreground') : 'bg-transparent',
                )}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
