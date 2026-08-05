'use client'

import type { CalendarFilter } from '@/entities/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'

interface CalendarTypeFilterProps {
  selected: CalendarFilter
  onSelect: (filter: CalendarFilter) => void
  className?: string
}

const FILTERS: { value: CalendarFilter; name: string; bg: string; tc: string }[] = [
  { value: 'ALL', name: '전체', bg: 'bg-gray-100', tc: 'text-gray-600' },
  ...(Object.keys(CALENDAR_TYPE) as (keyof typeof CALENDAR_TYPE)[]).map(type => ({
    value: type as CalendarFilter,
    name: CALENDAR_TYPE[type].NAME,
    bg: CALENDAR_TYPE[type].BG,
    tc: CALENDAR_TYPE[type].TC,
  })),
]

export const CalendarTypeFilter = ({ selected, onSelect, className }: CalendarTypeFilterProps) => {
  return (
    <div className={cn('flex items-center gap-1.25', className)}>
      {FILTERS.map(({ value, name, bg, tc }) => (
        <button
          key={value}
          type={'button'}
          aria-pressed={selected === value}
          className={cn(
            'cursor-pointer rounded-[20px] px-2.5 py-0.75 text-[12px] font-semibold transition-all',
            bg,
            tc,
            selected === value ? 'ring-1 ring-gray-900' : 'opacity-60 hover:opacity-100',
          )}
          onClick={() => onSelect(value)}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
