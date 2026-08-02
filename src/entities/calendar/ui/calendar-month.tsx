import { getMonthCells, isDateInEvent, isSameDate, toDateKey, WEEK_LABEL } from '../lib/date'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/text'
import type { CalendarEvent } from '../model/types'

interface CalendarMonthProps {
  /** 그리드에 그릴 달 (해당 월의 1일) */
  currentDate: Date
  events: CalendarEvent[]
  /** 한 칸에 보여줄 최대 일정 수 */
  maxVisibleEvents?: number
  className?: string
}

export const CalendarMonth = ({ currentDate, events, maxVisibleEvents = 2, className }: CalendarMonthProps) => {
  const cells = getMonthCells(currentDate.getFullYear(), currentDate.getMonth())
  const today = new Date()

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div className={'grid grid-cols-7 text-center'}>
        {WEEK_LABEL.map(day => (
          <Text key={day} className={'text-[14px] font-medium text-[#6B7280]!'}>
            {day}
          </Text>
        ))}
      </div>

      <div className={'grid grid-cols-7'}>
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className={'min-h-[64px] lg:min-h-[84px]'} />

          const dayEvents = events.filter(event => isDateInEvent(date, event))
          const visibleEvents = dayEvents.slice(0, maxVisibleEvents)
          const restCount = dayEvents.length - visibleEvents.length

          return (
            <div key={toDateKey(date)} className={'flex min-h-[64px] flex-col items-center gap-1 px-1 lg:min-h-[84px]'}>
              <Text
                className={cn(
                  'flex h-7.5 w-7.5 items-center justify-center rounded-full text-[18px] font-medium',
                  isSameDate(date, today) ? 'bg-dark text-white!' : 'text-gray-900',
                )}
              >
                {date.getDate()}
              </Text>
              <ul className={'flex w-full flex-col items-center gap-0.5'}>
                {visibleEvents.map(event => (
                  <li key={event.id} className={'w-full'}>
                    <span
                      className={cn(
                        'block truncate rounded-[4px] px-1 text-center text-[10px] font-medium',
                        CALENDAR_TYPE[event.type].BG,
                        CALENDAR_TYPE[event.type].TC,
                      )}
                    >
                      {event.title}
                    </span>
                  </li>
                ))}
                {restCount > 0 && <li className={'text-[10px] font-medium text-gray-400'}>+{restCount}</li>}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
