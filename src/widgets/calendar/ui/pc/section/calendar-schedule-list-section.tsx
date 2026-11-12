'use client'

import { PlusIcon } from 'lucide-react'
import { CalendarListItem, formatDateLabel, toDateKey } from '@/entities/calendar'
import type { CalendarEvent } from '@/entities/calendar'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

interface CalendarScheduleListSectionProps {
  events: CalendarEvent[]
  selectedDate: Date | null
  onClearSelectedDate: () => void
  onAddSchedule: () => void
  isPending: boolean
  className?: string
}

export const CalendarScheduleListSection = ({
  events,
  selectedDate,
  onClearSelectedDate,
  onAddSchedule,
  isPending,
  className,
}: CalendarScheduleListSectionProps) => {
  return (
    <section className={cn(`bg-card flex flex-col gap-4 rounded-[20px] p-5 ${CARD_SHADOW}`, className)}>
      <div className={'flex items-center justify-between gap-2'}>
        <Text className={'text-[18px] leading-7 font-bold md:text-[20px]'}>
          {selectedDate ? formatDateLabel(toDateKey(selectedDate)) : '이번 달 일정'}
          <span className={'text-subtle-foreground ml-1.5 text-[14px] font-semibold'}>{events.length}</span>
        </Text>
        <button
          type={'button'}
          aria-label={'일정 등록하기'}
          className={'bg-brand text-brand-foreground hover:bg-brand/90 cursor-pointer rounded-full p-1.5'}
          onClick={onAddSchedule}
        >
          <PlusIcon size={18} />
        </button>
      </div>

      {selectedDate && (
        <button
          type={'button'}
          className={
            'text-brand hover:bg-muted w-fit cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-semibold'
          }
          onClick={onClearSelectedDate}
        >
          이번 달 전체 보기
        </button>
      )}

      <div className={'scrollbar-hidden flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto'}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>일정을 불러오는 중입니다</Text>
        ) : events.length === 0 ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>등록된 일정이 없습니다</Text>
        ) : (
          events.map(event => <CalendarListItem key={event.key} event={event} />)
        )}
      </div>
    </section>
  )
}
