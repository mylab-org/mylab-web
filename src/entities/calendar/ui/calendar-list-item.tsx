import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { formatEventPeriod } from '../lib/date'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { CalendarEvent } from '../model/types'

interface CalendarListItemProps {
  event: CalendarEvent
  className?: string
  /** 전달하면 카드 전체가 버튼이 됩니다. */
  onClick?: () => void
}

export const CalendarListItem = ({ event, className, onClick }: CalendarListItemProps) => {
  const { type, title, place, members } = event
  const { NAME, BG, TC } = CALENDAR_TYPE[type]

  // 참가인원 목록(ul)을 품고 있어 button 으로 감싸지 않고 role 로 처리한다
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={event => {
        if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return
        event.preventDefault()
        onClick()
      }}
      className={cn(
        'border-border hover:border-brand flex flex-col gap-2.5 rounded-[14px] border p-4 transition-colors',
        onClick && 'focus-visible:border-brand cursor-pointer outline-none',
        className,
      )}
    >
      <div className={'flex flex-col gap-1.5'}>
        <span className={cn('w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold', BG, TC)}>{NAME}</span>
        <Text className={'line-clamp-1 text-[15px] font-bold'}>{title}</Text>
      </div>

      <div className={'flex flex-col gap-1'}>
        <div className={'text-muted-foreground flex items-center gap-1.5'}>
          <CalendarIcon size={13} className={'shrink-0'} />
          <Text className={'text-muted-foreground! text-[13px] font-medium'}>{formatEventPeriod(event)}</Text>
        </div>
        {place && (
          <div className={'text-muted-foreground flex items-center gap-1.5'}>
            <MapPinIcon size={13} className={'shrink-0'} />
            <Text className={'text-muted-foreground! line-clamp-1 text-[13px] font-medium'}>{place}</Text>
          </div>
        )}
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
