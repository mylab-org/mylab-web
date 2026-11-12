'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { CalendarMonth, formatMonthTitle } from '@/entities/calendar'
import type { CalendarEvent, CalendarFilter } from '@/entities/calendar'
import { CalendarTypeFilter, MonthPicker } from '@/features/calendar'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import type { ReactNode } from 'react'

interface CalendarMonthWrapperProps {
  currentDate: Date
  onChangeDate: (date: Date) => void
  onMoveMonth: (diff: number) => void
  isThisMonth: boolean
  onGoToday: () => void
  filter: CalendarFilter
  onChangeFilter: (filter: CalendarFilter) => void
  events: CalendarEvent[]
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  variant?: 'pc' | 'mobile'
  headerRight?: ReactNode
  className?: string
}

export const CalendarMonthWrapper = ({
  currentDate,
  onChangeDate,
  onMoveMonth,
  isThisMonth,
  onGoToday,
  filter,
  onChangeFilter,
  events,
  selectedDate,
  onSelectDate,
  variant = 'pc',
  headerRight,
  className,
}: CalendarMonthWrapperProps) => {
  const isMobile = variant === 'mobile'
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)

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
            onClick={() => onMoveMonth(-1)}
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
              <MonthPicker currentDate={currentDate} onConfirm={onChangeDate} onClose={() => setIsPickerOpen(false)} />
            )}
          </div>
          <button
            type={'button'}
            aria-label={'다음 달'}
            className={'text-subtle-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-full p-1.5'}
            onClick={() => onMoveMonth(1)}
          >
            <ChevronRightIcon size={18} />
          </button>
          {!isThisMonth && (
            <button
              type={'button'}
              className={
                'bg-muted text-muted-foreground hover:bg-secondary ml-1.5 cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap'
              }
              onClick={onGoToday}
            >
              오늘
            </button>
          )}
        </div>
        {headerRight}
      </div>

      <CalendarTypeFilter selected={filter} onSelect={onChangeFilter} />

      <CalendarMonth
        currentDate={currentDate}
        events={events}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      />
    </section>
  )
}
