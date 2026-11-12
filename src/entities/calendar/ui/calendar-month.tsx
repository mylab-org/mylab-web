import { getMonthCells, isDateInEvent, isSameDate, toDateKey, WEEK_LABEL } from '../lib/date'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { CalendarEvent } from '../model/types'

interface CalendarMonthProps {
  /** 그리드에 그릴 달 (해당 월의 1일) */
  currentDate: Date
  events: CalendarEvent[]
  /** 클릭해서 선택된 날짜. 없으면 아무 날짜도 선택되지 않은 상태 */
  selectedDate?: Date | null
  onSelectDate?: (date: Date) => void
  /** 한 칸에 보여줄 최대 일정 수 */
  maxVisibleEvents?: number
  className?: string
}

export const CalendarMonth = ({
  currentDate,
  events,
  selectedDate,
  onSelectDate,
  maxVisibleEvents = 2,
  className,
}: CalendarMonthProps) => {
  const cells = getMonthCells(currentDate.getFullYear(), currentDate.getMonth())
  const today = new Date()

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div className={'grid grid-cols-7 text-center'}>
        {WEEK_LABEL.map(day => (
          <Text key={day} className={'text-subtle-foreground! py-1 text-[12px] font-semibold'}>
            {day}
          </Text>
        ))}
      </div>

      <div className={'grid grid-cols-7 gap-0.5'}>
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className={'min-h-[76px] lg:min-h-[104px]'} />

          const dayEvents = events.filter(event => isDateInEvent(date, event))
          const visibleEvents = dayEvents.slice(0, maxVisibleEvents)
          const restCount = dayEvents.length - visibleEvents.length
          const isToday = isSameDate(date, today)
          const isSelected = !!selectedDate && isSameDate(date, selectedDate)

          return (
            <button
              key={toDateKey(date)}
              type={'button'}
              aria-pressed={isSelected}
              className={cn(
                'flex min-h-[76px] cursor-pointer flex-col items-center gap-1 rounded-[10px] p-1 transition-colors lg:min-h-[104px]',
                isSelected ? 'bg-muted' : 'hover:bg-muted',
              )}
              onClick={() => onSelectDate?.(date)}
            >
              <Text
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold',
                  isSelected && 'bg-foreground text-background!',
                  isToday && !isSelected && 'bg-brand text-brand-foreground!',
                  !isSelected && !isToday && 'text-foreground',
                )}
              >
                {date.getDate()}
              </Text>
              <ul className={'flex w-full min-w-0 flex-col gap-0.5'}>
                {visibleEvents.map(event => (
                  <li key={event.key} className={'w-full min-w-0'}>
                    <span
                      className={cn(
                        'flex min-w-0 items-center gap-1 rounded-[5px] py-0.5 pr-1 pl-0.5 text-left',
                        CALENDAR_TYPE[event.type].BG,
                      )}
                    >
                      <span className={cn('h-3 w-[3px] shrink-0 rounded-full', CALENDAR_TYPE[event.type].DOT)} />
                      <span className={cn('min-w-0 truncate text-[11px] font-semibold', CALENDAR_TYPE[event.type].TC)}>
                        {event.title}
                      </span>
                    </span>
                  </li>
                ))}
                {restCount > 0 && (
                  <li className={'text-subtle-foreground pl-1 text-left text-[11px] font-medium'}>+{restCount}건</li>
                )}
              </ul>
            </button>
          )
        })}
      </div>
    </div>
  )
}
