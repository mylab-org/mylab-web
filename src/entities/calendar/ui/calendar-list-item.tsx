import { formatEventPeriod } from '../lib/date'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { CalendarEvent } from '../model/types'

interface CalendarListItemProps {
  event: CalendarEvent
  className?: string
}

export const CalendarListItem = ({ event, className }: CalendarListItemProps) => {
  const { type, title, place, members } = event

  return (
    <div className={cn('border-border flex flex-col gap-1.25 rounded-[12px] border px-3 py-4', className)}>
      <div className={'flex items-center gap-1.25'}>
        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', CALENDAR_TYPE[type].DOT)} />
        <Text className={'text-[14px] font-bold'}>{title}</Text>
      </div>
      <div>
        <Text className={'text-[14px] font-light'}>{formatEventPeriod(event)}</Text>
        <Text className={'text-[14px] font-light'}>{place}</Text>
      </div>
      {members.length > 0 && (
        <ul className={'flex flex-wrap items-center gap-1.25'}>
          {members.map(member => (
            <li key={member}>
              <Tag.CalendarMember name={member} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
