'use client'

import type { CalendarFilter } from '@/entities/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'

interface CalendarTypeFilterProps {
  selected: CalendarFilter
  onSelect: (filter: CalendarFilter) => void
  className?: string
}

const FILTERS: { value: CalendarFilter; name: string; dot?: string }[] = [
  { value: 'ALL', name: '전체' },
  ...(Object.keys(CALENDAR_TYPE) as (keyof typeof CALENDAR_TYPE)[]).map(type => ({
    value: type as CalendarFilter,
    name: CALENDAR_TYPE[type].NAME,
    dot: CALENDAR_TYPE[type].DOT,
  })),
]

export const CalendarTypeFilter = ({ selected, onSelect, className }: CalendarTypeFilterProps) => {
  return (
    <div className={cn('scrollbar-hidden flex gap-2 overflow-x-auto', className)}>
      {FILTERS.map(({ value, name, dot }) => {
        const isActive = selected === value

        return (
          <button
            key={value}
            type={'button'}
            aria-pressed={isActive}
            className={cn(
              'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors md:text-[15px]',
              isActive ? 'bg-brand text-brand-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary',
            )}
            onClick={() => onSelect(value)}
          >
            {dot && <span className={cn('h-2 w-2 shrink-0 rounded-full', isActive ? 'bg-brand-foreground' : dot)} />}
            {name}
          </button>
        )
      })}
    </div>
  )
}
