'use client'

import { isDateInEvent, isSameDate, WEEK_LABEL } from '../lib/date'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { CalendarEvent } from '../model/types'

interface CalendarWeekProps {
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
    <div className={'grid grid-cols-7 gap-1'}>
      {weekDates.map(date => {
        const isToday = isSameDate(date, today)
        const isSelected = !!selectedDate && isSameDate(date, selectedDate)
        const hasEvent = events.some(event => isDateInEvent(date, event))

        return (
          <button
            key={date.toISOString()}
            type={'button'}
            aria-pressed={isSelected}
            aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 일정 보기`}
            disabled={!onSelectDate}
            className={cn(
              'flex flex-col items-center gap-1 rounded-[12px] py-2 transition-colors',
              onSelectDate && 'hover:bg-muted cursor-pointer',
              isSelected && 'bg-muted',
            )}
            onClick={() => onSelectDate?.(date)}
          >
            <Text className={cn('text-[14px] font-medium', isSelected ? 'text-foreground!' : 'text-muted-foreground!')}>
              {WEEK_LABEL[date.getDay()]}
            </Text>
            <span
              className={cn(
                'flex h-7.5 w-7.5 items-center justify-center rounded-full text-[18px] font-medium transition-colors',
                isSelected
                  ? 'bg-brand text-brand-foreground'
                  : isToday
                    ? 'bg-foreground text-background'
                    : 'text-foreground',
              )}
            >
              {date.getDate()}
            </span>
            <span
              className={cn(
                'h-1 w-1 rounded-full',
                hasEvent ? (isSelected ? 'bg-brand' : 'bg-subtle-foreground') : 'bg-transparent',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
